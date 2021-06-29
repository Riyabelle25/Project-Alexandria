import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import '../styles/Sidebar.css';
import { Avatar } from '@material-ui/core';
import {Add, SettingsApplicationsRounded} from '@material-ui/icons';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import SidebarChannel from './SidebarChannel';
import IconButton from '@material-ui/core/IconButton';
import db, { auth } from '../app/firebase';
import { selectUser } from '../slice/userSlice';
import { useParams } from 'react-router-dom';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';

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
  const useStyles = makeStyles(() => ({
    action: {
      backgroundColor: '#fff',
      boxShadow: '0 1px 4px 0 rgba(0,0,0,0.12)',
      '&:hover': {
        backgroundColor: '#fff',
        color: '#000',
      },
    },
  }));

  const handleAddChannel = () => {
    const channelName = prompt('Enter a new channel name');
    

    if (channelName) {
      db.collection("rooms").doc(roomName).collection('channels').add({
        channelName,
      });
    }
  };
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 2 });
  const styles = useStyles();
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3 id="roomname">{roomName}</h3>
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <h4 id="channel">Channels</h4>
          </div>
          <IconButton className={styles.action} classes={iconBtnStyles}>
          <Add onClick={handleAddChannel} className="sidebar__addChannelIcon" />
          </IconButton>
         
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
        
        <div className="sidebar__profileInfo">
          <Row>
          <Item paddingLeft={2}> 
          <h5 id="username">{user.displayName}</h5>
          <text>#{user.uid.substring(0, 5)}</text>          
          </Item>

          <Item id="signout" onClick={() => auth.signOut()}>
          <Column>
          <Row>
            <Item paddingRight={2}>
            <Avatar  src={user.photo} style={{marginLeft:"24px"}}>
              
            </Avatar>
            </Item>
            <Item paddingTop={1}>
            <text >Sign out</text>
            </Item>
          </Row>
          </Column>
          </Item>   

          </Row>          
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
