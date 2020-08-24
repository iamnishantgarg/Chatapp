import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./chat.css";
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
  console.log(message);
  console.log(messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <input
          type="text"
          placeholder="send some message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
      </div>
    </div>
  );
};

export default Chat;
