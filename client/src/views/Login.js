import React from "react";
import { Row, Item } from "@mui-treasury/components/flex";
import Paper from "@material-ui/core/Paper";
import wall from "../assets/texture-wall.jpeg";
import { auth, provider } from "../app/firebase";
import "../styles/Login.css";
import logo from "../assets/alexandria.svg";

function Login() {
  // generates pop-up window prompting user to sign in with Google account
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <header className="App-header">
        <Paper
          id="paper"
          elevation={7}
          style={{
            border: "6px solid #c49c48",
            padding: "6%",
            alignContent: "center",
            backgroundImage: `url(${wall})`,
            borderRadius: "0.5rem",
          }}
        >
          <h1 id="welcome-msg">Welcome to Alexandria!</h1>
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            style={{ marginLeft: "18%" }}
          />
          <Row justifyContent={"center"} marginTop={"6%"}>
            <Item>
              <button
                onClick={signIn}
                id="login-btn"
                style={{
                  border: "1 px solid #c49c48",
                  fontFamily: "Lucida Grande",
                  fontSize: "1vw",
                  color: "rgb(37, 5, 63)",
                  backgroundColor: "#bcaaa4",
                  borderRadius: "1rem",
                  width: "7vw",
                  height: "6vh",
                }}
              >
                Sign In
              </button>
            </Item>
          </Row>
        </Paper>
      </header>
    </div>
  );
}

export default Login;
