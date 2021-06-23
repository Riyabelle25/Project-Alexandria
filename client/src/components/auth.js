import React, { useEffect, useState } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import logo from '../scroll.png'
import '../styles/App.css';
import { Home } from './home'
var id=null;

 export const Auth = function() {

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 } else {
    firebase.app(); // if already initialized, use that one
 }
  
  const [data, setData] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    fetch("/home")
      .then((res => res.json()))
      .then((data) => setData(data));
  }, []);
  console.log("data from auth",data)
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      var db = firebase.firestore();  
      id=user.uid;
      if(user){
      var docRef = db.collection("users").doc(id);
      docRef.get().then((doc) => {
        if (doc.exists) {
            console.log("user exists:", doc.data());
        } else {
            console.log("Adding new user!");
            db.collection("users").doc(id).set({userID: id, userName: user.displayName, rooms: [{roomName:"Pen 204",roomID:"1234"}, {roomName:"Pen 201",roomID:"1235"}]});
            console.log("id",id);
        }
      })
    }
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);


  if(!isSignedIn){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>{!data ? "Loading.." : data.message}</p> */}
        <div id="firebaseui-auth-container"></div>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/> 
        <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth.css" />
        <div id="loader">Loading...</div>
      </header>
    </div>
  );
} else {
  return <Home userName= {firebase.auth().currentUser.displayName} userID={firebase.auth().currentUser.uid} />;
}
}

var firebaseConfig = {
  apiKey: "AIzaSyAAmN2cT6-gUAS-5UJ5CU7H_lvVtnfLsMY",
  authDomain: "alexandria-4da0a.firebaseapp.com",
  projectId: "alexandria-4da0a",
  storageBucket: "alexandria-4da0a.appspot.com",
  messagingSenderId: "198926932690",
  appId: "1:198926932690:web:154a70aabd0f8535452b0b",
  measurementId: "G-39C3E1ZY76"
};

function route(){return window.location.origin + "/" + id + "/home";}
var uiConfig = {
    
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      redirectUrl=route()
      console.log("authResult",authResult)
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  // Sign in user to Home!
  signInSuccessUrl: route(),

  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  // Terms of service url.
  tosUrl: 'https://google.com',
  // Privacy policy url.
  privacyPolicyUrl: 'https://kfc.com'
};
