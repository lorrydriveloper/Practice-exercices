const mongoose = require('mongoose')

var campgroundSchema = new mongoose.Schema({
    name: String,
    imgUrl: String,
    description: String,
    });

module.exports = mongoose.model('Campground', campgroundSchema);