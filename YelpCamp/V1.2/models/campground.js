const Schema = require('mongoose').Schema;
const model = require('mongoose').model;
const commentSchema = require('./comment').commentSchema

// console.log(comment.commentSchema)

var campgroundSchema = Schema({
    name: String,
    imgUrl: String,
    description: String,
    comments:[commentSchema]
    });

module.exports = model('Campground', campgroundSchema);