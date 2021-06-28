import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  SendRounded,
} from '@material-ui/icons';
import firebase from 'firebase';
import '../styles/Chat.css';

import ChatHeader from './ChatHeader';
import Message from './Message';

import db from '../app/firebase';
import { selectUser } from '../slice/userSlice';
import { selectChannelId, selectChannelName } from '../slice/appSlice';
import { useParams } from 'react-router-dom';

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const roomName = useParams().name;

  useEffect(() => {
    if (channelId) {
      db.collection("rooms").doc(roomName).collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomName).collection('channels').doc(channelId).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: messageInput,
      user,
    });
    setMessageInput('');
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}
      </div>
      <div className="chat__input">
        <form>
          <input
            disabled={!channelId}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={
              channelName
                ? `Message #${channelName}`
                : 'Please select a channel first!'
            }
            type="text"
            value={messageInput}/>    
            <button
            className="chat__inputButton_hidden"
            onClick={sendMessage}
            type="submit"
          >
            Send Message
          </button>  
        </form>
        <SendRounded className="chat__inputButton" onClick={sendMessage} type="submit"/>    
      </div>
    </div>
  );
}

export default Chat;
