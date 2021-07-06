import React, { useState, useEffect } from "react";
import {Button} from '@material-ui/core'
import { auth } from '../app/firebase';
import Modal from 'react-bootstrap/Modal'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080";

const socket = socketIOClient(ENDPOINT);
function ToConnect() {
  const [response, setResponse] = useState('');
  const [showModal, setShowModal] =  useState(false);
  
  useEffect(() => {   
       
    socket.on("want-to-meet", (data) => {
		console.log('want-to-meet says server', data)
    if(response.receiver.userID===auth.currentUser.uid){
    setResponse(data);
    setShowModal(true);
    }   
    
    });
  }, []);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
//    console.log(`${response.sender}, ${response.receiver}`) {sender:data.sender,receiver:data.receiver}  
console.log(response);
console.log(showModal);
  return ( 
      showModal ? (     
    <Modal show={showModal} onHide={handleClose} style={{ zIndex: "999999" }}>
        <script>console.log("yooo")</script>
        <Modal.Header closeButton>
            <Modal.Title>You have a notification!</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height: "200px", textAlign: "center" }} >
            <p>Hi there, {response.sender.displayName} wants to meet with you!</p>
        </Modal.Body>
        <Modal.Footer className="div-send-msg">
            <Button variant="contained" color="primary" onClick={()=> window.location.href=response.meet}>Join!</Button>
            <Button variant="contained" color="primary" onClick={handleClose}>Dismiss call</Button>
        </Modal.Footer>
	</Modal>) : (
        null
    )
  );
}

export {ToConnect, socket} ;