import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chat.css";
import InfoBar from "../infoBar/InfoBar";
import Input from "../input/Input";
let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    const ENDPOINT = "localhost:5000";
    //console.log(data.name);
    setName(name);
    setRoom(room);
    socket = io(ENDPOINT, { path: "/chatting" });
    socket.emit("join", { name, room }, (err) => {
      if (err) console.log(err);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search]);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", message, () => {
      setMessage("");
    });
  };
  // console.log(message);
  // console.log(messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Input
          sendMessage={sendMessage}
          setMessage={setMessage}
          message={message}
        />
      </div>
    </div>
  );
};

export default Chat;
