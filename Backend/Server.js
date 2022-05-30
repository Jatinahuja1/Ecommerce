const express = require('express')
const app = express()
const routes = require('./routes/route');
const db = require('./config/db');
const {model}= require('./model/userModel');
const cors = require('cors');
const bodyParser = require('body-parser')
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require("passport");
const findOrCreate = require('mongoose-findorcreate');
const userModel = require("./model/userModel");
var session = require('express-session');
app.use(bodyParser.json())
app.use(cors());
app.use('/', routes );
const port = 3000

var jwt = require('jsonwebtoken');
//  const JWT_SECRET_KEY
 const JWT_SECRET_KEY = "gfg_jwt_secret_key";
const dotenv = require('dotenv');
// require.dotenv.config();

// app.use(session({
//   secret: "Our little secret.",
//   resave: false,
//   saveUninitialized: false
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(userModel.createStrategy());

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   userModel.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// passport.use(new GoogleStrategy({
//   clientID: "596391413342-k40jikpf6dc061dvuplv6jdfbeassblo.apps.googleusercontent.com",
//   clientSecret: "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",
//   callbackURL: "http://localhost:3001/home",
//   userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
// },
// function(accessToken, refreshToken, profile, cb) {
//   console.log(profile);

//   userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));

// app.get("/auth/google",
//   passport.authenticate('google', { scope: ["profile"] })
// );

// app.get("/auth/google/home",
//   passport.authenticate('google', { failureRedirect: "/login" }),
//   function(req, res) {
//     res.send('Hello World!')
//   });

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


