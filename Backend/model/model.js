const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email_id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    googleId:{},
    createdDate: { type: Date, default: Date.now },
    token: { type: String ,required: true},
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        // delete ret.hash;
    }
});

schema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


module.exports = mongoose.model('User', schema);