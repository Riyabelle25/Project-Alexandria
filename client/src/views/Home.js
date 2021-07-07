import React, { useState, useEffect } from 'react';
import db, { auth, firebase } from '../app/firebase';
import RoomCard from '../components/RoomCard';
import FeatureCard from '../components/FeatureCard';
import { Row, Item } from '@mui-treasury/components/flex';

import { Button } from '@material-ui/core';
import '../styles/Home.css'
import Header from '../components/Header';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:8080";

 export const Home = function(){
   const [rooms, setRooms] = useState([]);
   const [users, setUsers] = useState([]);
   const socket = socketIOClient(ENDPOINT);

    useEffect(() => {
      db.collection("users").orderBy("userName", 'desc').get()
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
    }, [setUsers]);
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
    }, [setRooms]);
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
        db.collection("rooms").doc(roomName).collection('channels').doc("general").set(
          {channelName: "general"}
          );}; 
    }
    const meet = `/meeting/home/${Math.floor(Math.random()* 33)*1000}`;

    return(
      <div className="home">
        <Header user={auth.currentUser} home={true} />
      <div className="home__container">
          <div className="left__container" > 
          <h3 style={{color:"azure", paddingTop:"5%", fontWeight:"100"}}>Active Users</h3>
            {users!=null ? (
              users.map((user) => (   
               
                <Row paddingTop={1} textAlign={"flex-start"} justifyContent={"flex-start"} style={{textAlign:"flex-start", justifyContent:"left"}}>
                  <Item ><h5 style={{color:"rgb(196, 181, 211)", fontSize:"1.25vw"}}>{user.userName} </h5></Item>
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
                    window.location.href=meet;
                  } 
                  } > Connect </Button></Item>                      
                </Row>                                                      
              ))) : (
                // console.log("user", user) 
                null)
              }
          </div>
          <div  className="rooms-container">
            <h3 style={{color:"azure", paddingTop:"5%", fontWeight:"100"}}>Your Rooms (that you have joined)</h3>
            <h5 style={{color:"rgb(196, 181, 211)"}}> To add another room to your list, <b onClick={handleAddRoom} id="join-room">Join Room </b></h5>
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
                    description={
                      <>
                        <b>Join a Room</b> by entering its name. If it doesn't exist yet, a new room will be created for you!
                      </>
                    } 
                    newRoom={handleAddRoom}
                    toJoin= {"Join a Room"}
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
