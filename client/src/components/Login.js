import React from 'react';
import { Button } from '@material-ui/core';
import { auth, provider } from '../app/firebase';
import '../styles/Login.css';
import logo from '../alexandria.svg'

function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
     <header className="App-header">
       <h1 id="welcome-msg">Welcome to Alexandria!</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <Button onClick={signIn} className="login-btn">Sign In!</Button>
      </header>
    </div>
  );
}

export default Login;
