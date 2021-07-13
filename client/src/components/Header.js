/* eslint-disable react/prop-types */

import React from "react";
import { auth } from "../app/firebase";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import "../styles/Header.css";
import { useParams } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { VideoCall } from "@material-ui/icons";
function ChatHeader({
  channelName = "",
  home = true,
  user = "",
  messages = [""],
  dm = false,
}) {
  const roomName = useParams().name;

  let meet = null;

  if (dm) {
    meet = `/meeting/chat/${roomName}`;
  } else {
    meet = `/meeting/room/${roomName}`;
  }

  return (
    <div className="chatHeader">
      {home ? (
        <div
          className="chatHeader__left"
          style={{ justifyContent: "flex-start", marginLeft: "6%" }}
        >
          <h3> Hello, {user.displayName} </h3>
        </div>
      ) : dm ? (
        <div
          className="chatHeader__left"
          style={{ justifyContent: "flex-start", marginLeft: "6%" }}
        >
          <h3> Hello, {user.displayName} </h3>
        </div>
      ) : (
        <div
          className="chatHeader__left"
          style={{ justifyContent: "flex-start", marginLeft: "2%" }}
        >
          <h3>
            <span className="chatHeader__hash">#</span>
            {channelName}
          </h3>
        </div>
      )}
      {home ? (
        <div
          className="chatHeader__right"
          style={{ justifyContent: "flex-end" }}
        >
          <Row style={{ width: "12vw", height: "6vh" }}>
            <Item
              style={{
                paddingBottom: "2%",
                paddingRight: "10%",
                backgroundColor: "linear-gradient(to top, #81c784, #4b8a4e)",
              }}
              id="signout"
              onClick={() => auth.signOut()}
            >
              <Column>
                <Row>
                  <Item paddingRight={2}>
                    <Avatar
                      src={user.photoURL}
                      style={{ marginLeft: "24px", paddingTop: "4" }}
                    ></Avatar>
                  </Item>
                  <Item paddingTop={1}>
                    <text>Sign out</text>
                  </Item>
                </Row>
              </Column>
            </Item>
          </Row>
        </div>
      ) : (
        <div
          className="chatHeader__right"
          style={{ justifyContent: "flex-end", marginRight: "6%" }}
        >
          <VideoCall style={{ width: 80, height: 60 }} />
          <button style={{ backgroundColor: "rgb(196, 181, 211)" }}>
            <a
              href={`${meet}`}
              style={{
                color: "black",
                fontSize: 28,
                paddingLeft: "3px",
                paddingBottom: "8px",
              }}
            >
              Start a Meeting
            </a>
          </button>
        </div>
      )}
    </div>
  );
}

export default ChatHeader;

// alerting members in rooms

// onClick = {
//               dm
//                 ? () =>
//                     db
//                       .collection("dms")
//                       .doc(roomName)
//                       .collection("messages")
//                       .add({
//                         timestamp:
//                           firebase.firestore.FieldValue.serverTimestamp(),
//                         message: `Hello, a meeting's started at ${meet}. Join in!`,
//                         user,
//                       })
//                 : () =>
//                     db
//                       .collection("rooms")
//                       .doc(roomName)
//                       .collection("channels")
//                       .doc("general")
//                       .collection("messages")
//                       .add({
//                         timestamp:
//                           firebase.firestore.FieldValue.serverTimestamp(),
//                         message: `Hello, a meeting's started at ${meet}. Join in!`,
//                         user,
//                       })
//             }
