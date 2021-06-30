import React from 'react';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import wall from '../texture-wall.jpeg';
import { auth, provider } from '../app/firebase';
import '../styles/Login.css';
import logo from '../alexandria.svg'
import { urlAlphabet } from 'nanoid';

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
     <header className="App-header">
       <Paper id="paper" elevation={7} style={{ border:"6px solid #c49c48", padding:"6%", alignContent:"center",backgroundImage:`url(${wall})`, borderRadius:"0.5rem"}}>
       <h1 id="welcome-msg">Welcome to Alexandria!</h1>
      <img src={logo} className="App-logo" alt="logo" style={{marginLeft:"12%"}} />
      <Row justifyContent={"center"} marginTop={"6%"} >
      <Item >
      <button onClick={signIn} id="login-btn" style={{border: "1 px solid #c49c48", fontFamily:'Lucida Grande',
        fontSize:"80%", color:"rgb(37, 5, 63)",backgroundColor:"#bcaaa4", borderRadius:"1rem", width: "7vw", height: "6vh"}}>Sign In</button>
      </Item>
      <Item paddingLeft={4} paddingTop={1} fontFamily="Lucida Grande"><h3>or </h3></Item>
      <Item>
        <button id="video-call" onClick={()=> window.location.href=`/meeting/${Math.floor(Math.random()* 33)*1000}`} 
        style={{border: "1 px solid #c49c48", fontFamily:'Lucida Grande',
        fontSize:"80%", color:"rgb(37, 5, 63)",backgroundColor:"#bcaaa4", borderRadius:"1rem", width: "14vw", height: "6vh"}}>
          Start a Video Call
        </button>
      </Item>
      </Row>
      
      </Paper>
      </header>
    </div>
  );
}

export default Login;
