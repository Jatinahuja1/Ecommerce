// import React, { Component } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from "./pages/Home";
// import Signin from "./pages/Auth/Signin";

// const App = () => {
//   return <Home/>
// };

// export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route , Link} from 'react-router-dom';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import './App.css';
// import Login from './components/Login.component'
// import SignUp from './components/Signup.component'

 
// class App extends Component {
//   render() {
//     return (
//        <Router>
//            <div className="App">
//            <Routes>
//                  <Route exact path='/' element={< Home />}></Route>
//                  <Route exact path='/Signin' element={< Signin />}></Route>
//           </Routes>
//           </div>
//        </Router>
//    );
//   }
// }
 
// export default App;



function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Signin/>} />
              <Route path="/signin" element={<Signin/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/home" element={<Home/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App



