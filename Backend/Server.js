const express = require("express");
const app = express();
const routes = require("./routes/route");
const db = require("./config/db");
const { model } = require("./model/userModel");
const cors = require("cors");
const bodyParser = require("body-parser");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var passport = require("passport");
const findOrCreate = require("mongoose-findorcreate");
const userModel = require("./model/userModel");
var session = require("express-session");
app.use(bodyParser.json());
app.use(cors());
app.use("/", routes);
const port = 3000;
require('dotenv').config()

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
