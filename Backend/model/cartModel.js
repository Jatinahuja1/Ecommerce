const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    email_id: { type: String, required: true},
    productId : { type: String},
    price : { type: String , required: true},
    fileName : { type: String , required: true},
    createdDate: { type: Date, default: Date.now },
    name : { type: String , required: true},
    // color:  { type: String , required: true},
    is_deleted :{ }
});

module.exports = mongoose.model('item', itemSchema);
