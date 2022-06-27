import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "./Signin.css";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import Home from "../Home";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

export default function Signin(props) {
  let setOpen = props.setOpen;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const magic = new Magic("pk_live_E9CF1DD886ADAB22", {
    extensions: [new OAuthExtension()],
  });

  const handleClick = async (email) => {
    const didToken = await magic.oauth.loginWithRedirect({
      provider: "google",
      email,
      redirectURI: new URL("/home", window.location.origin).href,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_id: email,
          password: password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setEmail("");
        setPassword("");
        if (resJson.success === true) {
          handleToClose();
          var Data = resJson.data;
          const localData = {
            email_id: Data.email_id,
            firstName: Data.firstName,
            id: Data.id,
            lastName: Data.lastName,
            password: Data.password,
            token: Data.token,
            username: Data.username,
            loginTime: new Date().toLocaleString(),
            timeOut: new Date(
              new Date().setHours(new Date().getHours() + 2)
            ).toLocaleString(),
          };
          localStorage.setItem("user", JSON.stringify(localData));
        } else {
          alert(resJson.message);
        }
      } else {
        console.log("error in login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit">
          Login
        </Button>
        <div>
          <GoogleButton
            onClick={(e) => {
              handleClick(e);
            }}
          />
        </div>
      </Form>
    </div>
  );
}
