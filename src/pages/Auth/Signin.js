import React, { useState } from "react";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import Home from "../Home";





// import { useNavigate } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";




export default function Signin() {


  const [open, setOpen] = React.useState(false);

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

  const navigate = useNavigate();

  const pages = () => {
    console.log("move page");
    navigate("/Home");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("API fetch");

      let res = await fetch("http://localhost:3002/login", {
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
        console.log("res", resJson);
        if (resJson.success === true) {
          console.log("User login");
          pages();
        } else {
          alert(resJson.message);
          console.log("Error");
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


      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"How are you?"}</DialogTitle>
		<DialogContent>
		<DialogContentText>
			I am Good, Hope the same for you!
		</DialogContentText>
		</DialogContent>
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
        <DialogActions>
          <Button onClick={handleToClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* <h1>Shopping Mall</h1> */}
     {/* <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>  */}
    </div>
  );
}
