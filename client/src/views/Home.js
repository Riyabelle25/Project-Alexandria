import React, { useState, useEffect } from 'react';
import db, { auth, firebase } from '../app/firebase';
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
    db.collection("rooms").where("users", "array-contains-any", [`${auth.currentUser.email}`,"public"])
    .get()
    .then((querySnapshot) => {
      setRooms(
        querySnapshot.docs.map((doc) => 
        ({
          roomName: doc.id,
              })        
        ))
            } 
          ).catch((error) => {
        console.log("Error getting documents: ", error);
    });
    }, []);
    console.log(rooms);

    const handleAddRoom = () => {
        const roomName = prompt('Enter a new room name');    
        if (roomName) {
        db.collection('rooms').doc(roomName).set(
          {roomName:roomName});     
      db.collection('rooms').doc(roomName).update(
        {roomName:roomName,
        users: firebase.firestore.FieldValue.arrayUnion(`${auth.currentUser.email}`)
    });  
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
              subtitle={'28 June 2021 9:01 PM'}
              description={
              <>
                <b>Aishwariya:</b> Hi guys, when is the next meeting?
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
            newRoom={()=> window.location.href=`/meeting/home/${Math.floor(Math.random()* 33)*1000}`} 
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
