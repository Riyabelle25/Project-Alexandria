import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import db, { auth } from '../app/firebase';
import {
    Add
  } from '@material-ui/icons';
import Chat from './Chat';

 export const Home = function(){

    const [rooms, setRooms] = useState([]);
    useEffect(() => {
      db.collection('rooms').onSnapshot((snapshot) =>
        setRooms(
          snapshot.docs.map((doc) => ({
            roomName: doc.id,
          }))
        )
      );
    }, []);

    const handleAddRoom = () => {
        const roomName = prompt('Enter a new room name');    
        if (roomName) {
        db.collection('rooms').doc(roomName).set({roomName:roomName});
        db.collection("users").doc(auth.currentUser.uid).update({roomName:roomName});
      };
  
    }

    return(
        <div className= "app">
            <Add onClick={handleAddRoom} className="sidebar__addChannelIcon" />

        <div className="roomContainer">
          {rooms.map(({roomName,key}) => (           
            <li  key={`${roomName}`}>
                <a href={`/room/${roomName}`} onclick={Chat}> Room: {roomName}</a>
            </li>                      
          ))}
        </div>


        </div>
    );
}

export default Home;
