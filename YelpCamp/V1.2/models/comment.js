const Schema = require('mongoose').Schema;
const model = require('mongoose').model;


const commentSchema = Schema({
    text: String,
    author: String
});

module.exports = { 
    model: model('Comment', commentSchema),
    commentSchema : commentSchema,

};