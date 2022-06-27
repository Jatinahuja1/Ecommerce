var MongoClient = require('mongodb').MongoClient;
var mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
var url = process.env.DB_HOST;

mongoose 
 .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));
