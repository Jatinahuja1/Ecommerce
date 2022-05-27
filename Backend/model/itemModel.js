const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    email_id: { type: String, required: true},
    productId : { type: String},
    price : { type: String , required: true},
    createdDate: { type: Date, default: Date.now },
    is_deleted :{ }
});

module.exports = mongoose.model('item', itemSchema);
