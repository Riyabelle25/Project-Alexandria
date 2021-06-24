import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAAmN2cT6-gUAS-5UJ5CU7H_lvVtnfLsMY",
  authDomain: "alexandria-4da0a.firebaseapp.com",
  projectId: "alexandria-4da0a",
  storageBucket: "alexandria-4da0a.appspot.com",
  messagingSenderId: "198926932690",
  appId: "1:198926932690:web:154a70aabd0f8535452b0b",
  measurementId: "G-39C3E1ZY76"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
