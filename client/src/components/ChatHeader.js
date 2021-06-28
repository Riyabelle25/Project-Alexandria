import React from 'react';

import '../styles/ChatHeader.css';
import { useParams } from 'react-router-dom';
import {VideoCall} from '@material-ui/icons';

function ChatHeader({ channelName }) {

  const roomName = useParams().name;

  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">#</span>
          {channelName}
        </h3>
      </div>
      <div className="chatHeader__right">
        <VideoCall style={{width:80,height:60}}/>
        <a href={`/meeting/room/${roomName}`} style={{fontSize: 28, paddingLeft:"3px", paddingBottom:"8px"}}>Start a Meeting</a>
      </div>
    </div>
  );
}

export default ChatHeader;
