import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import MessageDisplay from '../MessageDisplay';
import styles from './GlobalChat.module.css';

// need user instance (info: url, name)

const endPoint = "https://sn4ck.herokuapp.com/";

export const socket = io(endPoint);

const GlobalChat = ({ pastMessages }) => {
  const user = useSelector(state => state.session.user);
  const currentChannel = useSelector(state => state.channels.current)
  const channel_id = currentChannel.id
  const [ messages, setMessages ] = useState([]);
  const [ newMessage, setNewMessage ] = useState('');

  socket.on("message", data => {
    setMessages([data, ...messages]);
  });

  const sendMessage = () => {
    if (newMessage) {
      socket.emit("message", {
        body: newMessage,
        room: channel_id,
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
    socket.emit("join_room", {user_id: user.id, room:channel_id})
    setMessages([...pastMessages])
  }, [pastMessages])


  return (
    <div>
      <div className={styles.messageWrapper}>
      {messages.length > 0 &&
        messages.map((data, i) => (
          <MessageDisplay message={data} key={i} />
          ))}
      </div>
      <div contenteditable="true"  className={styles.sendMessageBar}>
        <textarea placeholder={`Message ${currentChannel.title}`} value={newMessage} className={styles.writeTextBox} name="message" onChange={e => setNewMessage(e.target.value)}/>
      <button className={styles.sendMessageButton} onClick={sendMessage}>=></button>
      </div>
    </div>
  )
}

export default GlobalChat;
