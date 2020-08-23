import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chat.css";
let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    const ENDPOINT = "localhost:5000";
    //console.log(data.name);
    setName(name);
    setRoom(room);
    socket = io(ENDPOINT, { path: "/chatting" });
    socket.emit("join", { name, room });
    //console.log(socket);
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search]);
  return <div>Chat</div>;
};

export default Chat;
