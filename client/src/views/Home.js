import React, { useState, useEffect } from 'react';
import db, { auth } from '../app/firebase';
import { makeStyles } from '@material-ui/core/styles';

import RoomCard from '../components/RoomCard';
import FeatureCard from '../components/FeatureCard';
import { Column, Row, Item } from '@mui-treasury/components/flex';

import { Button } from '@material-ui/core';
import '../styles/Home.css'
import Header from '../components/Header';

 export const Home = function(){
   const [rooms, setRooms] = useState([]);
   const [messages, setMessages] = useState([]);
   

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
    // db.collection("cities").get()
    // useEffect(() => {
    //   db.collection("rooms").doc(roomName).collection('channels').where("channelName", "==", "general")
    //   .get()
    //   .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //           // doc.data() is never undefined for query doc snapshots
    //           console.log(doc.id, " => ", doc.data());

    //       });
    //   })
    //   .catch((error) => {
    //       console.log("Error getting documents: ", error);
    //   });
    //     db.collection("rooms").doc(roomName).collection('channels')
    //       .doc(channelId)
    //       .collection('messages')
    //       .orderBy('timestamp', 'asc')
    //       .onSnapshot((snapshot) => {
    //         setMessages(snapshot.docs.map((doc) => doc.data()));
    //       });
      
    // }, [channelId]);
    return(
      <div className="home">
        <Header user={auth.currentUser} home={true} />
      <div className="home__container">
          <div className="left__container">     
          {rooms.map(({roomName,key}) => (   
            <Row paddingTop={2}>            
              <RoomCard 
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
          <div className="new-meeting">
         <FeatureCard 
         color={'#1976d2'}
         thumbnail={`https://i.pravatar.cc/300?img=${Math.floor(
                    Math.random() * 30
                  )}`}
            title={'Create new Meeting'}
            subtitle={'Created by siriwatknp'}
            description={
              <>
                <b>Start a group Meeting</b> and invite others to join in
              </>
            } 
            newRoom={handleAddRoom}
            toJoin= {"Start a Meeting"}
            icon={true}
            />
          </div>
          <div className="add-room">
         <FeatureCard 
         color={'#ff9800'}
         thumbnail={`https://i.pravatar.cc/300?img=${Math.floor(
                    Math.random() * 30
                  )}`}
            title={'Add a Room '}
            subtitle={'Created by siriwatknp'}
            description={
              <>
                <b>Create a Room</b> and open a workspace in Alexandria
              </>
            } 
            newRoom={handleAddRoom}
            toJoin= {"Add a Room"}
            icon={false}
            />
          </div>
          </Row>
        </div>
        </div>
        </div>
    );
}

export default Home;
