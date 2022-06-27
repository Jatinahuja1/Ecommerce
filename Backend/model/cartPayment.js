const mongoose = require('mongoose');
const { Schema } = mongoose;

var Cart = mongoose.model("carts", {
    productId:{type :Schema.Types.ObjectId,ref:'product'},
    quantity: {type:Number},
    email_id: {type:String},
    price: {type:Number}
});

module.exports = Cart ;