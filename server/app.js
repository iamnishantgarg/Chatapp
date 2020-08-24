const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { path: "/chatting" });
const router = require("./router");
const PORT = process.env.PORT || 5000;
const { addUser, getUser, getUsersInRoom, removeUser } = require("./users");
// io.path("/chatkro");

io.on("connection", (socket) => {
  socket.on("join", (data, callback) => {
    console.log(data);
    const { name, room } = data;
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    //console.log(user);
    //return callback("success");
    // console.log(user);
    socket.join(user.room);
    //return callback(user);
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, Welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });
    callback();
  });
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("user disconnected");
  });
});

app.use(cors);

app.use(router);

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
