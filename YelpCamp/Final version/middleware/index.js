const Campground = require('../models/campground');
const Comment = require('../models/comment');



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')

}
function checkOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, DB_response) => {
            if (err) {
                res.redirect('back')
            } else {
                if (DB_response.author.id.equals(req.user.id)) {
                    next()
                } else {
                    res.redirect('back')
                }
            }
        });
    } else{
        res.redirect('back')
    }

}

function checkOwnershipComment(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, DB_response) => {
            if (err) {
                res.redirect('back')
            } else {
                if (DB_response.author.id.equals(req.user.id)) {
                    next()
                } else {
                    res.redirect('back')
                    console.log('not authorized v2');
                }
            }
        });
    } else{
        console.log('not authorized');
        res.redirect('back')
    }

}

module.exports = {
    isLoggedIn: isLoggedIn,
    checkOwnership: checkOwnership,
    checkOwnershipComment: checkOwnershipComment,
}