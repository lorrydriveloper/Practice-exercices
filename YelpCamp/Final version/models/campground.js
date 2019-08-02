/////// CAMPGROUND MODEL //////////

const mongoose = require('mongoose');
const commentSchema = require('./comment')

// console.log(comment.commentSchema)

var campgroundSchema = new mongoose.Schema({
    name: String,
    imgUrl: String,
    description: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'USer'
        },
        username: String

    },
    price: Number
},{timestamps:true});

module.exports = mongoose.model('Campground', campgroundSchema);