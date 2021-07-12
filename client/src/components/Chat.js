import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SendRounded } from "@material-ui/icons";
import firebase from "firebase";
import "../styles/Chat.css";
import Box from "@material-ui/core/Box";
import Header from "./Header";
import Message from "./Message";

import db from "../app/firebase";
import { selectUser } from "../slice/userSlice";
import { selectChannelId, selectChannelName } from "../slice/appSlice";
import { useParams } from "react-router-dom";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  // const [meetingMsgs, setMeetingMsgs] = useState([]);
  const roomName = useParams().name;

  useEffect(() => {
    if (channelId) {
      db.collection("rooms")
        .doc(roomName)
        .collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms")
      .doc(roomName)
      .collection("channels")
      .doc(channelId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: messageInput,
        user,
      });
    setMessageInput("");
  };

  return (
    <div className="chat">
      <Header channelName={channelName} home={false} />
      <div className="chat__messages">
        {messages.map((message, index) =>
          message ? (
            message.message ? (
              <Message
                key={index}
                message={message.message}
                timestamp={message.timestamp}
                user={message.user}
              >
                {console.log(message.message)}
              </Message>
            ) : (
              <div className="meeting__messages">
                <h5 style={{ color: "rgb(196, 181, 211)", fontSize: "1.5vw" }}>
                  Meeting logs from{" "}
                  {new Date(message.timestamp.toDate()).toLocaleString()}:
                </h5>
                <Box className={"meeting__box"}>
                  {/* <h3> Meeting at {message.timestamp} </h3>  */}
                  {message.messages.length > 0 ? (
                    message.messages.map((item, index) =>
                      item ? (
                        <div key={index} style={{ textAlign: "left" }}>
                          {console.log("msg:", item.data)}
                          <p style={{ wordBreak: "break-all" }}>
                            <b>{item.sender}</b>: {item.data}
                          </p>
                        </div>
                      ) : null
                    )
                  ) : (
                    <h6>No messages exchanged yet</h6>
                  )}
                </Box>{" "}
              </div>
            )
          ) : null
        )}
      </div>
      <div className="chat__input">
        <form>
          <input
            disabled={!channelId}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={
              channelName
                ? `Message #${channelName}`
                : "Please select a channel first!"
            }
            type="text"
            value={messageInput}
            style={{ color: "white" }}
          />
          <button
            className="chat__inputButton_hidden"
            onClick={sendMessage}
            type="submit"
          >
            Send Message
          </button>
        </form>
        <SendRounded
          className="chat__inputButton"
          onClick={sendMessage}
          type="submit"
        />
      </div>
    </div>
  );
}

export default Chat;
