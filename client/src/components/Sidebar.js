import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/Sidebar.css';
import { Avatar } from '@material-ui/core';
import {
  Add,
} from '@material-ui/icons';

import SidebarChannel from './SidebarChannel';

import db, { auth } from '../app/firebase';
import { selectUser } from '../slice/userSlice';
import { useParams } from 'react-router-dom';

function Sidebar() {
  const user = useSelector(selectUser);
  console.log(user);
  const [channels, setChannels] = useState([]);
  const roomName = useParams().name;
  
  useEffect(() => {
    console.log(roomName);
    db.collection("rooms").doc(roomName).collection('channels').onSnapshot((snapshot) =>
    {
    if(snapshot){
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )}}, (error) => {
        console.log(error);
    }
        );
      
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt('Enter a new channel name');

    if (channelName) {
      db.collection("rooms").doc(roomName).collection('channels').add({
        channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>{roomName}</h3>
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <h4 id="channel">Text Channels</h4>
          </div>

          <Add onClick={handleAddChannel} className="sidebar__addChannelIcon" />
        </div>

        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={user.photo}/>
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
