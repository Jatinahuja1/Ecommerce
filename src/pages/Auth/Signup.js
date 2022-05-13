// import { useState } from "react";
// export default function Form() {
//   // States for registration
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // States for checking the errors
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState(false);

//   // Handling the name change
//   const handleName = (e) => {
//     setName(e.target.value);
//     setSubmitted(false);
//   };

//   // Handling the email change
//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//     setSubmitted(false);
//   };

//   // Handling the password change
//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//     setSubmitted(false);
//   };

//   // Handling the form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name === "" || email === "" || password === "") {
//       setError(true);
//     } else {
//       setSubmitted(true);
//       setError(false);
//     }
//   };

//   // Showing success message
//   const successMessage = () => {
//     return (
//       <div
//         className="success"
//         style={{
//           display: submitted ? "" : "none",
//         }}
//       >
//         <h1>User {name} successfully registered!!</h1>
//       </div>
//     );
//   };

//   // Showing error message if error is true
//   const errorMessage = () => {
//     return (
//       <div
//         className="error"
//         style={{
//           display: error ? "" : "none",
//         }}
//       >
//         <h1>Please enter all the fields</h1>
//       </div>
//     );
//   };

//   return (
//     <div className="form">
//       <div>
//         <h1>User Registration</h1>
//       </div>

//       {/* Calling to the methods */}
//       <div className="messages">
//         {errorMessage()}
//         {successMessage()}
//       </div>

//       <form>
//         {/* Labels and inputs for form data */}
//         <label className="label">Name</label>
//         <input
//           onChange={handleName}
//           className="input"
//           value={name}
//           type="text"
//         />

//         <label className="label">Email</label>
//         <input
//           onChange={handleEmail}
//           className="input"
//           value={email}
//           type="email"
//         />

//         <label className="label">Password</label>
//         <input
//           onChange={handlePassword}
//           className="input"
//           value={password}
//           type="password"
//         />

//         <button onClick={handleSubmit} className="btn" type="submit">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from 'react';
import './Signup.css';

function App() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


//   axios.post(`http://localhost:3002/register`, { user })
//   .then(res => {
//     console.log(res);
//     console.log(res.data);
//   })
// }

  // function to update state of name with
  // value enter by user in form
  const handleFirstnameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastnameChange = (e) => {
    setLastName(e.target.value);
  }

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    // if (password != confPassword) {
    //   console.log("password Not Match");
    // } else {
    //   console.log('A form was submitted with Name :"' + firstname +
    //   '"  and Email :"' + email + '"');
    // }
    e.preventDefault();
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={(e) => { handleSubmit(e) }}>
          <h3> USER REGISTER </h3>
          <label >
            First Name:
          </label><br />
          <input type="text" value={firstname} required onChange={(e)=> { handleFirstnameChange(e) }} /><br />
          <label >
            Last Name:
          </label><br />
          <input type="text" value={lastname} required onChange={(e)=> { handleLastnameChange(e) }} /><br />
          <label>
            Email:
          </label><br />
          <input type="email" value={email} required onChange={(e) => { handleEmailChange(e) }} /><br />
          <label >
            Username:
          </label><br />
          <input type="text" value={username} required onChange={(e) => { handleUserNameChange(e) }} /><br />
          <label>
            Password:
          </label><br />
          <input type="password" value={password} required onChange={(e) => { handlePasswordChange(e) }} /><br />
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;