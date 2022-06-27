const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String },
    email_id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    googleId:{ type: String },
    createdDate: { type: Date, default: Date.now },
    token: { type: String ,required: true},
});

schema.plugin(passportLocalMongoose);
schema.plugin(findOrCreate);

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

schema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', schema);