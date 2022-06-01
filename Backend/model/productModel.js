
  
const mongoose = require('mongoose');

var Product = mongoose.model("product", {
    name: {type : String},
    price: {type : String},
    fileName:{type : String},
    vendorId : {type : String},
    color : {type : String},
    size : {type : String}
});

module.exports = Product ;