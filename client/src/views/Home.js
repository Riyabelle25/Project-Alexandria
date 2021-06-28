import React, { useState, useEffect } from 'react';
import db, { auth } from '../app/firebase';
import { Add } from '@material-ui/icons';
import RoomCard from '../components/RoomCard';
import FeatureCard from '../components/FeatureCard';
import { Column, Row, Item } from '@mui-treasury/components/flex';

import { Button } from '@material-ui/core';
import '../styles/Home.css'

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
      <div className="home__container">
          <div className="left__container">     
          {rooms.map(({roomName,key}) => (   
            <Row  paddingBottom={2}>            
              <RoomCard 
              thumbnail={`https://i.pravatar.cc/300?img=${Math.floor(
                Math.random() * 30
              )}`}
              title = {roomName} 
              subtitle={'Time'}
              description={
              <>
                <b>Shining Alpaca</b> and 3 others are already members of this
                group.
              </>
            } />                
            </Row>                                                      
          ))}
          </div>
          <div className="right__container">
          <Row>
          <div className="add-room">
         <FeatureCard thumbnail={`https://i.pravatar.cc/300?img=${Math.floor(
                    Math.random() * 30
                  )}`}
            title={'Add a Room'}
            subtitle={'Created by siriwatknp'}
            description={
              <>
                <b>Shining Alpaca</b> and 3 others are already members of this
                group.
              </>
            } 
            newRoom={handleAddRoom}
            toJoin= {"Start a Meeting"}
            />
          </div>
          <div className="join-room">
         <FeatureCard thumbnail={`https://i.pravatar.cc/300?img=${Math.floor(
                    Math.random() * 30
                  )}`}
            title={'Create new Meeting'}
            subtitle={'Created by siriwatknp'}
            description={
              <>
                <b>Shining Alpaca</b> and 3 others are already members of this
                group.
              </>
            } 
            newRoom={handleAddRoom}
            toJoin= {"Add a Room"}
            />
          </div>
          </Row>
        </div>

        </div>
    );
}

export default Home;
