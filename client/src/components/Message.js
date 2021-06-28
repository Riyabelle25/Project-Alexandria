import React from 'react';
import { Avatar } from '@material-ui/core';
import ChatMsg from './chatMsg';
import '../styles/Message.css';
import db, { auth } from '../app/firebase'; 
import { Column, Row, Item } from '@mui-treasury/components/flex';

function Message({ message, timestamp, user }) {
  var side="left";
  var marginR="0";
  var marginL="60px";
  var justify="start";
  var name= user.displayName;
  console.log(user, auth.currentUser);
  if(user.email===auth.currentUser.email){
    name="";
    side="right";
    justify="flex-end";
    marginR="60px";
    marginL="0px";
  }
  return (
    <Row className="message" justifyContent={justify} marginRight={marginR} gap={3} marginLeft={marginL}>      
      <div className="message__info">
        <Row id="user" justifyContent={justify} marginRight={marginR} gap={1}>
          <text>{name}</text>
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </Row>
        <ChatMsg style={{minWidth:25}}
        avatar={user.photo}
        messages={[message]}
        side={side}
      /> 
      </div>
    </Row>
  );
}

export default Message;
