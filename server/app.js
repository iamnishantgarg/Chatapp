const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { path: "/chatting" });
const router = require("./router");
const PORT = process.env.PORT || 5000;

// io.path("/chatkro");

io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on("join", (data) => {
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(cors);

app.use(router);

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
