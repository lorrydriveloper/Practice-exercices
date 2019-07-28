const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = { 
    model: mongoose.model('Comment', commentSchema),
    commentSchema : commentSchema,

};