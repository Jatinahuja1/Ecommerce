import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route , Link} from 'react-router-dom';
import Signin from './pages/Auth/Signin';
import Cart from './pages/Auth/Cart';
import Signup from './pages/Auth/Signup';
import { useNavigate } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
// import './App.css';
// import { login } from '../Backend/controller/user';

function App() {

  // const navigate = useNavigate();
  // const checkUserLogin = () => {
  //   console.log("move page")
  //   navigate('/Home');
// }

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/signin" element={<Signin/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/home" element= {<Home/>} />
              <Route path="/callback" element= {<Home/>} />
              <Route path="/cart" element= {<Cart/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App;



