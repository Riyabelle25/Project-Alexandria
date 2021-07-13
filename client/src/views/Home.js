/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import db, { auth, firebase } from "../app/firebase";
import ENDPOINT from "../app/env";

import RoomCard from "../components/RoomCard";
import { Message } from "@material-ui/icons";
import FeatureCard from "../components/FeatureCard";
import { Row, Item } from "@mui-treasury/components/flex";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";
import "../styles/Home.css";
import Header from "../components/Header";
import socketIOClient from "socket.io-client";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";

// const ENDPOINT = "https://alexandria-server.azurewebsites.net";

export const Home = function () {
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    db.collection("users")
      .orderBy("userName", "desc")
      .get()
      .then((querySnapshot) => {
        setUsers(
          querySnapshot.docs.map((doc) => ({
            userName: doc.data()["userName"],
            userID: doc.id,
          }))
        );
      })
      .catch((error) => {
        console.log("Error getting users", error);
      });
  }, [setUsers]);
  console.log(users);

  useEffect(() => {
    db.collection("rooms")
      .where("users", "array-contains-any", [
        `${auth.currentUser.email}`,
        "public",
      ])
      .get()
      .then((querySnapshot) => {
        setRooms(
          querySnapshot.docs.map((doc) => ({
            roomName: doc.id,
          }))
        );
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, [setRooms]);
  console.log(rooms);

  // Add a Room to Firestore and automatically create General channel in it
  const handleAddRoom = () => {
    const roomName = prompt("Enter a new room name");
    if (roomName) {
      db.collection("rooms").doc(roomName).set({ roomName: roomName });
      db.collection("rooms")
        .doc(roomName)
        .update({
          roomName: roomName,
          users: firebase.firestore.FieldValue.arrayUnion(
            `${auth.currentUser.email}`
          ),
        });
      db.collection("rooms")
        .doc(roomName)
        .collection("channels")
        .doc("general")
        .set({ channelName: "general" });
    }
    window.location.reload(false);
  };

  const iconBtnStyles = useSizedIconButtonStyles({ padding: 2 });
  const useStyles = makeStyles(() => ({
    action: {
      backgroundColor: "rgb(13, 1, 27)",
      color: "white",
      boxShadow: "0 1px 6px 0 rgba(0,0,0,0.12)",
      "&:hover": {
        backgroundColor: "green",
        color: "#000",
      },
    },
  }));
  const styles = useStyles();

  function ascii_to_hexa(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return parseInt(arr1.join(""), 16);
  }
  return (
    <div className="home">
      <Header user={auth.currentUser} home={true} />
      <div className="home__container">
        <div className="left__container">
          <h3 style={{ color: "azure", paddingTop: "5%", fontWeight: "100" }}>
            Active Users
          </h3>
          {users != null
            ? users.map((user) => (
                // eslint-disable-next-line react/jsx-key
                <Row
                  paddingTop={1}
                  textAlign={"flex-start"}
                  justifyContent={"flex-start"}
                  style={{ textAlign: "flex-start", justifyContent: "left" }}
                >
                  <Item>
                    <h5
                      style={{
                        color: "rgb(196, 181, 211)",
                        fontSize: "1.25vw",
                      }}
                    >
                      {user.userName}
                    </h5>
                  </Item>
                  <Item marginLeft={4} style={{ justifyContent: "flex-end" }}>
                    <Button
                      style={{ color: "white", backgroundColor: "green" }}
                      onClick={() => {
                        socket.emit(
                          "want-to-meet",
                          {
                            sender: auth.currentUser,
                            receiver: user,
                            meet: `/meeting/chat/${
                              ascii_to_hexa(auth.currentUser.uid.slice(0, 6)) +
                              ascii_to_hexa(user.userID.slice(0, 6))
                            }`,
                          },
                          (response) => {
                            console.log(response);
                            console.log("ack");
                          }
                        );
                        console.log("user", user);
                        window.location.href = `/meeting/chat/${
                          ascii_to_hexa(auth.currentUser.uid.slice(0, 6)) +
                          ascii_to_hexa(user.userID.slice(0, 6))
                        }`;
                      }}
                    >
                      Call
                    </Button>
                  </Item>
                  <Item marginLeft={2} style={{ justifyContent: "flex-end" }}>
                    <IconButton
                      className={styles.action}
                      classes={iconBtnStyles}
                    >
                      <Message
                        onClick={() => {
                          window.location.href = `/chat/${
                            ascii_to_hexa(auth.currentUser.uid.slice(0, 6)) +
                            ascii_to_hexa(user.userID.slice(0, 6))
                          }`;
                        }}
                      />
                    </IconButton>
                  </Item>
                </Row>
              ))
            : // console.log("user", user)
              null}
        </div>
        <div className="rooms-container">
          <h3 style={{ color: "azure", paddingTop: "5%", fontWeight: "100" }}>
            Your Rooms (that you have joined)
          </h3>
          <h5 style={{ color: "rgb(196, 181, 211)" }}>
            {" "}
            To add another room to your list,{" "}
            <b onClick={handleAddRoom} id="join-room">
              Join Room{" "}
            </b>
          </h5>
          {rooms.map(({ roomName, key }) => (
            <Row paddingTop={1}>
              <RoomCard title={roomName} subtitle={""} description={""} />
            </Row>
          ))}
        </div>
        <div className="right__container">
          <div className="feature-container">
            <Row></Row>
            <Row>
              <div className="add-room">
                <FeatureCard
                  color={"#ff9800"}
                  title={"Add a Room "}
                  description={
                    <>
                      <b>Join a Room</b> by entering its name. If it doesn't
                      exist yet, a new room will be created for you!
                    </>
                  }
                  newRoom={handleAddRoom}
                  toJoin={"Join a Room"}
                  icon={false}
                />
              </div>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
