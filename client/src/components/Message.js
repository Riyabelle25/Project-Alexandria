/* eslint-disable react/prop-types */
import React from "react";
import ChatMsg from "./chatMsg";
import "../styles/Message.css";
import { auth } from "../app/firebase";
import { Row } from "@mui-treasury/components/flex";

function Message({ message, timestamp, user }) {
  var side = "left";
  var marginR = "0";
  var marginL = "1vw";
  var justify = "start";
  var name = user.displayName;
  console.log(user, auth.currentUser);
  // eslint-disable-next-line react/prop-types
  if (user.email === auth.currentUser.email) {
    name = "";
    side = "right";
    justify = "flex-end";
    marginR = "0.3vw";
    marginL = "0px";
  }
  return (
    <Row
      className="message"
      alignItems={"center"}
      justifyContent={justify}
      marginRight={marginR}
      gap={3}
      marginLeft={marginL}
    >
      <div className="message__info">
        <Row id="user" justifyContent={justify} marginRight={marginR} gap={1}>
          <text>{name}</text>
          <span className="message__timestamp" style={{ paddingTop: "0.3vw" }}>
            {new Date(timestamp?.toDate()).toLocaleString()}
          </span>
        </Row>
        <ChatMsg
          style={{ minWidth: 25 }}
          avatar={user.photo}
          messages={[message]}
          side={side}
        />
      </div>
    </Row>
  );
}

export default Message;
