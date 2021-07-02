import React, { useState, useEffect } from 'react';
import db, { auth, firebase } from '../app/firebase';
// import {socket } from '../components/ToConnect';
import { makeStyles } from '@material-ui/core/styles';
import RoundCard from '../components/RoundCard';
import RoomCard from '../components/RoomCard';
import FeatureCard from '../components/FeatureCard';
import { Column, Row, Item } from '@mui-treasury/components/flex';

import { Button } from '@material-ui/core';
import '../styles/Home.css'
import Header from '../components/Header';
import { MeetingRoomSharp } from '@material-ui/icons';
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://alexandria-server.azurewebsites.net";

 export const Home = function(){
   const [rooms, setRooms] = useState([]);
   const [users, setUsers] = useState([]);
   const socket = socketIOClient(ENDPOINT);

    useEffect(() => {
      db.collection("users").get()
      .then((querySnapshot) => {
        setUsers(
          querySnapshot.docs.map((doc) => ({
            userName: doc.data()["userName"],
            userID: doc.id,
          })
          ))
      }).catch((error) => {
        console.log("Error getting users", error);
      });
    }, []);
    console.log(users);
   
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
    const meet = `/meeting/home/${Math.floor(Math.random()* 33)*1000}`;

    return(
      <div className="home">
        <Header user={auth.currentUser} home={true} />
      <div className="home__container">
          <div className="left__container"> 
          <h3 style={{color:"gray", paddingTop:"5%"}}>Active Users</h3>
            {users!=null ? (
              users.map((user) => (   
               
                <Row paddingTop={1}>
                  <Item><h5 style={{color:"white"}}>{user.userName} </h5></Item>
                  <Item marginLeft={4}>
                  <Button 
                    style={{color:"white", backgroundColor:"green"}}
                    onClick={() => {
                      socket.emit('want-to-meet',{
                      sender:auth.currentUser,
                      receiver:user, 
                      meet: meet
                    }, (response) => {
                      console.log(response)
                      console.log('ack')
                    });
                    console.log("user", user);
                    // window.location.href=meet;
                  } 
                  } > Connect </Button></Item>                      
                </Row>                                                      
              ))) : (
                // console.log("user", user) 
                null)
              }
          </div>
          <div  className="rooms-container">
            <h3 style={{color:"gray", paddingTop:"5%"}}>Your Rooms</h3>
              {rooms.map(({roomName,key}) => (   
              <Row paddingTop={1}>            
                <RoomCard 
                title = {roomName} 
                subtitle={''}
                description={''} />                
              </Row>                                                      
            ))}
            </div>
          <div className="right__container">
            <div className="feature-container">
              <Row>
                <div className="new-meeting">
                  <FeatureCard 
                      color={'#1976d2'}
                      title={'Create new Meeting'}
                      subtitle={'Created by siriwatknp'}
                      description={
                        <Item flexShrink={0.1}>
                          <b>Start a group Meeting</b> and invite others to join in
                        </Item>
                      } 
                      newRoom={()=> window.location.href=`/meeting/home/${Math.floor(Math.random()* 33)*1000}`} 
                      toJoin= {"Start a Meeting"}
                      icon={true}
                      />
                </div>
                </Row>
                <Row>
                <div className="add-room">
                    <FeatureCard 
                    color={'#ff9800'}
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
        </div>
    );
}

export default Home;
