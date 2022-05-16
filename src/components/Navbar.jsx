import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";

import { Badge } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import App from "../pages/Auth/Signup";
import Signin from "../pages/Auth/Signin";



// import React from "react";
// import { useNavigate } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = () => {







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


//   const navigate = useNavigate();

//   const pages = () => {
//     console.log("move page")
//     navigate('/Home');
// }

  const handleSubmit = async (e) => {
    console.log("e", e);
    console.log("handle submit");

    e.preventDefault();
    console.log("submit");
    try {
      console.log("API fetch");
      let res = await fetch("http://localhost:3002/register", {
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
      console.log("res", res);
      let resJson = await res.json();
      if (res.status === 201) {
        setFirstName("");
        setLastName("");
        setUserName("");
        setEmail("");
        setPassword("");
        console.log("data saved succesfully");
        // pages();
      } else {
        alert(resJson.message)
        console.log("error in inserting user");
      }
    } catch (err) {
      console.log(err);
    }
  };




  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };


  // const handleToCloseSignInBox = () => {
  //   setOpen(false);
  // };

  // const [openSignin, setSignInOpen] = React.useState(false);

  // const handleClickToOpenSignIn = () => {
  //   setSignInOpen(true);
  // };

  // const handleToCloseSignIn = () => {
  //   setSignInOpen(false);
  // };

  const navigate = useNavigate();

  const registerPage = () => {
    console.log("move page");
    navigate("/Signin");
  };

  const registerUser = () => {
    registerPage();
  };

  const [openregister, setOpenRegister] = React.useState(false);

  const handleClickToOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleToCloseRegister = () => {
    setOpenRegister(false);
  };

  // const loginPage = () => {
  //   console.log("move page");
  //   navigate("/Signin");
  // };

  // const userLogin = () => {
  //   loginPage();
  // };


  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  function validateForm() {
    return emailLogin.length > 0 && passwordLogin.length > 0;
  }

  // const navigate = useNavigate();

  const pages = () => {
    console.log("move page");
    navigate("/Home");
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    try {
      console.log("API fetch");

      let res = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_id: emailLogin,
          password: passwordLogin,
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
    <Container>
      <Wrapper>
        {/* Navbar */}
        <Left>
          <Language>English</Language>
          <SearchContainer>
            <Input />
            <Search style={{ color: "grey", fontSize: 8 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Shop Mall</Logo>
        </Center>
        <Right>
          {/* <MenuItem onClick={registerUser}>REGISTER</MenuItem> */}
          {/* <MenuItem onClick={userLogin}>SIGN IN</MenuItem> */}


          {/* <Button
            variant="outlined"
            color="primary"
            onClick={handleClickToOpenSignIn}
          >
           SIGN IN
          </Button>  */}
          {/* <Signin onClick={registerUser} >SIGN IN</Signin> */}
          {/* <Dialog open={open} onClose={handleToCloseSignIn}>

            <Signin/>
          <DialogActions>
              <Button onClick={handleToCloseSignInBox} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog> */}



          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickToOpenRegister}
          >
            SIGN IN
          </Button>
          <Dialog open={openregister} onClose={handleToCloseRegister}>
                <form onSubmitLogin={(e) => {
            handleSubmit(e);
          }}>
          
          <label>
            Email or username
            <input
              name="emailOrUsername"
              type="text"
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
          </label>
          <button type="submit">Log in</button>
        </form>
            
          <DialogActions>
              <Button onClick={handleToCloseRegister} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>







          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickToOpen}
          >
            SIGN UP
          </Button>
          <Dialog open={open} onClose={handleToClose}>
            {/* <DialogTitle>{"How are you?"}</DialogTitle>
		<DialogContent>
		<DialogContentText>
			I am Good, Hope the same for you!
		</DialogContentText>
		</DialogContent> */}
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
            <DialogActions>
              <Button onClick={handleToClose} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        

          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
