import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import Home from "../Home";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

export default function Signin(props) {
  // const [open, setOpen] = React.useState(false);

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
          handleToClose();
          console.log("User login");
          console.log(resJson.data);
          var Data = resJson.data;
          console.log("Data.token", Data.token);
          // console.log(
          //   "localStorage.getItem.token",
          //   JSON.parse(localStorage.getItem("user")).token
          // );

          var token = localStorage.getItem(Data.token);

          console.log("token", token);
          if(!token){
          localStorage.setItem("user", JSON.stringify(Data));
            // localStorage.setItem(`${Data.username}`, JSON.stringify(Data));
          }else{
            var getData = JSON.parse(localStorage.getItem("user")).token;
            console.log("getData",getData);
          }
          // var token = localStorage.getItem("Data");
          // console.log("token get", token)
          // console.log(JSON.parse(localStorage.getItem("Data")).token);

          // var tokenCompare = ((Data.token) === (localStorage.getItem("user").token));
          // console.log("tokenCompare",tokenCompare);

          // if(tokenCompare){

          // }
          // localStorage.setItem("user", JSON.stringify(Data));
          // console.log(
          //   "localStorage.getItem.token",
          //   JSON.parse(localStorage.getItem("user")).token
          // );
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
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
