const mongoose = require('mongoose');
const mongooseStrategy = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    password: String

},{timestamps:true});

userSchema.plugin(mongooseStrategy);

module.exports = mongoose.model('User', userSchema);