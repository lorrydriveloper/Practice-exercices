/////// CAMPGROUND MODEL //////////

const mongoose = require('mongoose');
const commentSchema = require('./comment').commentSchema

// console.log(comment.commentSchema)

var campgroundSchema = new mongoose.Schema({
    name: String,
    imgUrl: String,
    description: String,
    comments: [commentSchema],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USer'
        },
        username: String

    }
});

module.exports = mongoose.model('Campground', campgroundSchema);