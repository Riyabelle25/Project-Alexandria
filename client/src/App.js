
import './styles/App.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {IconButton, Badge, Input, Button} from '@material-ui/core';
import { ToConnect } from './components/ToConnect';
import { Video } from './views/roomCall'
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './views/Login';
import Home from './views/Home';

import db, { auth } from './app/firebase';
import { login, logout, selectUser } from './slice/userSlice';
import Modal from 'react-bootstrap/Modal'
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://alexandria-server.azurewebsites.net";



function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // db.collection("users").doc(authUser.uid).set({userName: authUser.displayName});
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  const [response, setResponse] = useState('');
  const [showModal, setShowModal] =  useState(false);
  const socket = socketIOClient(ENDPOINT,{secure: true});    
    socket.on("want-to-meet", (data) => {
		console.log('want-to-meet says server', data.receiver.userID)
    if(data.receiver.userID===auth.currentUser.uid){
    console.log(data);  
    setResponse(data);
    setShowModal(true);
    }   
    
    });
      
  useEffect(() => {   
    console.log(response);
    console.log(showModal);    
  }, [response, showModal]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
//   console.log(`${response.sender}, ${response.receiver}`) {sender:data.sender,receiver:data.receiver}  


  return (
    <div className="app">
     { showModal ? (     
        <Modal show={showModal} onHide={handleClose} style={{ zIndex: "999999" }}>
            <Modal.Header closeButton>
                <Modal.Title>You have a notification!</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{height: "200px", textAlign: "center" }} >
                <p>Hi there, {response.sender.displayName} wants to meet with you!</p>
            </Modal.Body>
            <Modal.Footer className="div-send-msg">
                <Button variant="contained" color="primary" style={{marginRight:"3%"}} onClick={()=> window.location.href=response.meet}>Join!</Button>
                <Button variant="contained" color="primary" onClick={handleClose}>Dismiss call</Button>
            </Modal.Footer>
      </Modal>) : (
          null
      )}
      <Router>
        <Switch>
          <Route path="/" exact component={Login} >
          { 
          user ? 
          (<>
          <Home />
          </>

            ) : (
              <Login />
            )}
          </Route>
          <Route path="/room/:name">
          {
            user ? (
              <>
                <Sidebar />  <ToConnect />
                <Chat />
              </>
            ) : (
                <Login />
            )}
          </Route>
          <Route path="/meeting/home/:name">
              <>
              <Video user={user} />
              </>
          </Route>
          <Route path="/meeting/room/:name" component={Video}>
              <>
               <Video user={user} />
              </>
          </Route>
          <Route path="/meeting/:random" component={Video} />
        </Switch>
      </Router>
    </div>
  )

}
export default App;
