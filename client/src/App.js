
import './styles/App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { Auth } from './views/auth.js'
import { Video } from './views/roomCall'
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './views/Login';
import Home from './views/Home';

import { auth } from './app/firebase';
import { login, logout, selectUser } from './slice/userSlice';

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
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


  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} >
          { 
          user ? 
          (<><Home /></>
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/room/:name">
          {
            user ? (
              <>
                <Sidebar />
                <Chat />
              </>
            ) : (
                <Login />
            )}
          </Route>
          <Route path="/:url" component={Video} />
        </Switch>
      </Router>
    </div>
  )

}
export default App;
