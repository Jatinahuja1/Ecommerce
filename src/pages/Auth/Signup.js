import React, { useState, useEffect } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import GoogleButton from "react-google-button";

import Home from "../Home";
import Button from "@material-ui/core/Button";

const magic = new Magic("pk_live_E9CF1DD886ADAB22", {
  extensions: [new OAuthExtension()],
});

function Signup(props) {
  let setOpen = props.setOpenRegister;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    console.log("Close dialogue");
    setOpen(false);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email_id, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstnameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const pages = () => {
    console.log("move page");
    navigate("/Home");
  };

  const navigate = useNavigate();

  const handleClick = async (email) => {
    const didToken = await magic.oauth.loginWithRedirect({
      provider: "google",
      email,
      redirectURI: new URL("/home", window.location.origin).href,
    });
  };

  const handleSubmit = async (e) => {
    console.log("e", e);
    console.log("handle submit");

    e.preventDefault();
    console.log("submit");
    try {
      console.log("API fetch");
      let res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          username: username,
          email_id: email_id,
          password: password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setFirstName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        console.log("data saved succesfully");
        handleToClose();
      } else {
        alert(resJson.message);
        console.log("error in inserting user");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3> USER REGISTER </h3>
          <label>First Name:</label>
          <br />
          <input
            type="text"
            value={firstName}
            required
            onChange={(e) => {
              handleFirstnameChange(e);
            }}
          />
          <br />
          <label>Last Name:</label>
          <br />
          <input
            type="text"
            value={lastName}
            required
            onChange={(e) => {
              handleLastnameChange(e);
            }}
          />
          <br />
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email_id}
            required
            onChange={(e) => {
              handleEmailChange(e);
            }}
          />
          <br />
          <label>Username:</label>
          <br />
          <input
            type="text"
            value={username}
            required
            onChange={(e) => {
              handleUserNameChange(e);
            }}
          />
          <br />
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            required
            onChange={(e) => {
              handlePasswordChange(e);
            }}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </header>
      <div>
        <GoogleButton
          onClick={(e) => {
            handleClick(e);
            console.log("Google button clicked");
          }}
        />
      </div>
    </div>
  );
}
export default Signup;
