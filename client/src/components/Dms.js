import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SendRounded } from "@material-ui/icons";
import firebase from "firebase";
import "../styles/Chat.css";
import Box from "@material-ui/core/Box";
import Header from "./Header";
import Message from "./Message";

import db, { auth } from "../app/firebase";
import { selectUser } from "../slice/userSlice";
import { useParams } from "react-router-dom";

function Dms() {
  const user = useSelector(selectUser);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const pairID = useParams().name;

  useEffect(() => {
    db.collection("dms")
      .doc(pairID)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, [setMessages]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("dms")
      .doc(pairID)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: messageInput == "" ? " " : messageInput,
        user,
      });
    setMessageInput("");
  };

  return (
    <div className="chat" style={{ flex: "1" }}>
      <Header
        channelName={"Direct Message"}
        home={false}
        dm={true}
        user={auth.currentUser}
      />
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
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={`Message`}
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

export default Dms;
