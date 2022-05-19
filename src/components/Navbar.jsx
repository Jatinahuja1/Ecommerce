import styled from "styled-components";
import {
  CheckOutlined,
  Search,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Badge } from "@material-ui/core";
import Signin from "../pages/Auth/Signin";
import Signup from "../pages/Auth/Signup";

import Dialog from "@material-ui/core/Dialog";

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

const Navbar = (props) => {
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
    // setRemoveUser(true);
    localStorage.removeItem("user");
  };

  const [userName, setUserName] = useState("");

  // useEffect(()=>{
  //   if(localStorage.getItem("user")){
  //           // var  timesession = JSON.parse(localStorage.getItem("user")).time

  //     setUserName(JSON.parse(localStorage.getItem("user")).username);
  //     console.log("useEffect",JSON.parse(localStorage.getItem("user")).username);
  //     // setUserName(JSON.parse(localStorage.getItem("Data")).username) ;
  //     // if(localStorage.getItem(`${props.Data.username}`)){
  //     //   setUserName(JSON.parse(localStorage.getItem(`${props.Data.username}`)).username) ;
  //   }
  // },[]);

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
