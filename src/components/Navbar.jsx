import styled from "styled-components";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import {
  CheckOutlined,
  Search,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Badge } from "@material-ui/core";
import { OAuthExtension } from "@magic-ext/oauth";
import { Magic } from "magic-sdk";
import Signin from "../pages/Auth/Signin";
import Addproduct from "../pages/Auth/Addproduct";
import Cart from "../pages/Auth/Cart";
import Signup from "../pages/Auth/Signup";
import { useHistory } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";

import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

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

const Navbar = (props) => {
  const [openProductPage, setOpenProductPage] = React.useState(false);

  const handleClickToOpenProductPage = () => {
    console.log("open");
    setOpenProductPage(true);
  };

  const handleToCloseProductPage = () => {
    setOpenProductPage(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
  };

  const [openregister, setOpenRegister] = React.useState(false);

  const handleClickToOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleToCloseRegister = () => {
    setOpenRegister(false);
  };

  const [removeuser, setRemoveUser] = React.useState(false);

  const handleClickToRemoveUser = () => {
    localStorage.removeItem("user");
  };

  const [userName, setUserName] = useState("");

  const magic = new Magic("pk_live_E9CF1DD886ADAB22", {
    extensions: [new OAuthExtension()],
  });

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("provider"))
      finishSocialLogin();
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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

  const finishSocialLogin = async () => {
    let result = await magic.oauth.getRedirectResult();
    const payload = {
      firstName: result.oauth.userInfo.givenName,
      lastName: result.oauth.userInfo.familyName,
      email: result.oauth.userInfo.email,
      isSocial: true,
      token: localStorage.getItem("jwt_token"),
    };
    console.log("payload====>", payload.email);
    console.log("payload====>", payload);
    setFirstName("");
    setLastName("");
    setUserName("");
    setEmail("");
    console.log("data saved succesfully");
    var Data = payload;
    console.log("Data", Data);
    console.log("Data.token", Data.token);
    const localData = {
      email_id: payload.email,
      firstName: payload.firstName,
      id: Data.id,
      lastName: payload.lastName,
      token: Data.token,
      username: payload.firstName,
      loginTime: new Date().toLocaleString(),
      timeOut: new Date(
        new Date().setHours(new Date().getHours() + 2)
      ).toLocaleString(),
    };
    console.log("localData", localData);
    localStorage.setItem("user", JSON.stringify(localData));
    handleToClose();
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      var getTimeOut = JSON.parse(localStorage.getItem("user")).timeOut;
      var refreshTime = new Date().toLocaleString();
      console.log("getTimeOut", getTimeOut);
      console.log("new Time", refreshTime);
      if (getTimeOut > refreshTime) {
        setUserName(JSON.parse(localStorage.getItem("user")).username);
      } else {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const options = ["ENGLISH", "HINDI"];

  const profile = ["Profile", "Settings"];

  const defaultOption = options[0];

  const defaultProfileSelection = profile[0];

  const getcartProducts = () => {
    console.log("move page");
    navigate("/Cart");
  };

  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        {/* Navbar */}
        <Left>
          {/* <Language>English</Language> */}
          {/* <Dropdown
            options={options}
            value={defaultOption}
            placeholder="Select an option"
          /> */}
          {/* <SearchContainer> */}
          {/* <Input />
            <Search style={{ color: "grey", fontSize: 8 }} />
          </SearchContainer> */}
        </Left>
        <Center>
          <Logo>Shop Mall</Logo>
        </Center>
        <Right>
          {userName !== "" ? (
            <div>
              <button>{userName}</button>
              <Button
                // variant="outlined"
                color="primary"
                onClick={handleClickToRemoveUser}
              >
                LOGOUT
              </Button>
              <Button color="primary" onClick={handleClickToOpenProductPage}>
                ADD PRODUCT
              </Button>
              <Dialog
                open={openProductPage}
                onClose={()=>handleToCloseProductPage}
              >
                  <Addproduct setOpenProductPage={setOpenProductPage}/>
                </Dialog>
            </div>
          ) : (
            <div>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickToOpen}
              >
                SIGN IN
              </Button>
              <Dialog open={open} onClose={handleToClose}>
                <Signin setOpen={setOpen} />
              </Dialog>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickToOpenRegister}
              >
                SIGN UP
              </Button>
              <Dialog open={openregister} onClose={handleToCloseRegister}>
                <Signup setOpenRegister={setOpenRegister} />
              </Dialog>
            </div>
          )}
          <MenuItem>
            <Badge badgeContent={2} color="primary">
              <ShoppingCartOutlined onClick={getcartProducts} />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
