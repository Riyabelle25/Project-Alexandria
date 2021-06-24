import { useEffect, useState } from 'react';
import axios from 'axios'
import logo from '../logo.svg';
import '../styles/App.css';

export const Home = function(props){
  const url= "/"+props.userID+"/home"
  console.log("url", url)
  const [data, setData] = useState('');
  console.log("hi",props);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRooms = () => {
    axios.get(url, {
        method: 'post',
        body: {
          userID:props.userID
        }
      })
    .then((response) => {
      const allRooms = response.data.rooms;
      console.log("allRooms", allRooms);
      setData(allRooms);
    })
    .catch(error => console.error(`Error: ${error}`));
  }

  useEffect(() => {
  getRooms();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  console.log("data from home", data);

  if (data.length> 0){
    return (
      <div className="App">
        <header className= "App-header">
        <p>Welcome {props.userName} You are now signed-in!</p>
        <div>{ data.map((room) => (
          <div>RoomName: { room.roomName }</div>
        )) }</div> 
         
        </header>
        /</div>
      
    );
  } else {
    return (<img src={logo} className="App-logo" alt="logo" />)
  }
  
}
