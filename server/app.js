const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const router = require("./router");
const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("New Connection");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
