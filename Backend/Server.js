const express = require('express')
const app = express()
const routes = require('./routes/route');
const db = require('./config/db');
const {model}= require('./model/model');
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors());
app.use('/', routes );
const port = 3002

var jwt = require('jsonwebtoken');
//  const JWT_SECRET_KEY
 const JWT_SECRET_KEY = "gfg_jwt_secret_key";
const dotenv = require('dotenv');
// require.dotenv.config();


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/user/generateToken", (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
      time: Date(),
      userId: 12,
  }

  const token = jwt.sign(data, jwtSecretKey);

  res.send(token);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


