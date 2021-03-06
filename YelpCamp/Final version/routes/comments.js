const router = require('express').Router({ mergeParams: true });
const middleware = require('../middleware');
const Comment = require('../models/comment');
const Campground = require('../models/campground');


router.get('/new', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err)
            res.redirect('/campgrounds/:id/comment/new')
        } else {

            res.render('comment/new', { campground: campground })
        }
    })


});

router.post('/', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect('/campground/' + req.params.id)
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    req.flash('error','Something went Wrong!!!');

                    console.log(err)
                } else {
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success','Successfully added comment.');
                    res.redirect('/campgrounds/' + req.params.id)

                }
            });
        }
    })
});

router.get('/:comment_id/edit', middleware.checkOwnershipComment, (req, res) => {
    Comment.findById(req.params.comment_id, (err, DB_response) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comment/edit', { comment: DB_response, baseUrl: req.baseUrl });
        }
    })
});

router.put('/:comment_id', middleware.checkOwnershipComment, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body, (err, comment) => {
        if (err) {
            console.log(err)
        } else {
            req.flash('success','Successfully edited your comment.');
            res.redirect(req.baseUrl.replace('/comment', ''))
        }
    })
});
router.delete('/:comment_id', middleware.checkOwnershipComment, (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect(req.baseUrl.replace('/comment', ''))
    });
});

module.exports = router;