const express = require('express')
const app = express()
const routes = require('./routes/route');
const db = require('./config/db');
const {model}= require('./model/model');
const cors = require('cors');
const bodyParser = require('body-parser')
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
var passport = require('passport');
var LocalStrategy = require('passport-local');
const userModel = require("./model/model");

var session = require('express-session');
var SQLiteStore = require('connect-sqlite3')(session);
app.use(bodyParser.json())
app.use(cors());
app.use('/', routes );
const port = 3000

var jwt = require('jsonwebtoken');
//  const JWT_SECRET_KEY
 const JWT_SECRET_KEY = "gfg_jwt_secret_key";
const dotenv = require('dotenv');
// require.dotenv.config();

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));




// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
// }));
app.use(passport.authenticate('session'));



app.get('/', (req, res) => {
  res.send('Hello World!')
})

// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     cb(null, { id: user.id, username: user.username });
//   });
// });

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });


// app.get('/auth/google',
//   passport.authenticate('google', { scope:
//       [ 'email', 'profile' ] 
//     }
// ));

// app.get('/auth/google/callback',

//     passport.authenticate( 'google', {
      
//         successRedirect: 'http://localhost:3000/login',
//         failureRedirect: '/login'
// }));

// passport.use(new GoogleStrategy({
//   clientID: "596391413342-k40jikpf6dc061dvuplv6jdfbeassblo.apps.googleusercontent.com",
//   clientSecret: "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",
//   callbackURL: "http://localhost:3000/login",
//   passReqToCallback   : true
// },
// function(request, accessToken, refreshToken, profile, done) {
//   userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return done(err, user);
//   });
// }

// ));



var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.send(userProfile));
app.get('/', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const GOOGLE_CLIENT_ID = 'our-google-client-id';
// const GOOGLE_CLIENT_SECRET = 'our-google-client-secret';
passport.use(new GoogleStrategy({
    clientID: "596391413342-k40jikpf6dc061dvuplv6jdfbeassblo.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
 
app.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/');
  });

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


