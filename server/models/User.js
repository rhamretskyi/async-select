const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');

var userSchema = mongoose.Schema({
    userName: { type: String, unique: true },
    email: String,
    registrationDate: { type: Date, default: Date.now },
    password: String,
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);
