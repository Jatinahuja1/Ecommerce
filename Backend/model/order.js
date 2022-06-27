const mongoose = require('mongoose');
const { Schema } = mongoose;

var Order = mongoose.model("orders", {
    email_id: {type:String},
    products:{type:String},
    totalAmount: {type:Number},
    paymentSuccess:{type:Boolean}
});

module.exports = Order ;