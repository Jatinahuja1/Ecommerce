var MongoClient = require('mongodb').MongoClient;
var mongoose = require("mongoose");

var url = "mongodb://localhost:27017/mydb";

mongoose 
 .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));
