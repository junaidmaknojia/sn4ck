import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import MessageDisplay from '../MessageDisplay';
import styles from './GlobalChat.module.css';

// need user instance (info: url, name)

const endPoint = "http://localhost:5000";

const socket = io(endPoint);

const GlobalChat = ({ pastMessages }) => {
  const user = useSelector(state => state.session.user);
  const [ messages, setMessages ] = useState([]);
  const [ newMessage, setNewMessage ] = useState('');

  // TO-DO: add use state
  const channel = {
    id: 2,
    messages: []
  }

  socket.on("message", data => {
    console.log("inside socket.on", data)
    setMessages([data, ...messages]);
  });

  const sendMessage = () => {
    if (newMessage) {
      socket.emit("message", {
        body: newMessage,
        room: channel.id,
        user_id: user.id,
        created_at: new Date(),
        user: {
          username: user.username,
          picture_url: user.picture_url
        }
      });
      setNewMessage('')
    } else {
      alert("your dumb");
    }
  }

  useEffect(() => {
    socket.emit("join_room", {user_id: user.id, room:channel.id})
    console.log(pastMessages)
    setMessages([...pastMessages])
  }, [])


  return (
    <div>
      <div className={styles.messageWrapper}>
      {messages.length > 0 &&
        messages.map((data, i) => (
          <MessageDisplay message={data} key={i} />
          ))}
      </div>
      <input value={newMessage} name="message" onChange={e => setNewMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  )
}

export default GlobalChat;
