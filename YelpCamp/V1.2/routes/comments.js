const router = require('express').Router({mergeParams: true});
const isLoggedIn = require('../middleware').isLoggedIn;
const Comment = require('../models/comment').model;
const Campground = require('../models/campground');


router.get('/new', isLoggedIn,(req, res) => {
    Campground.findById(req.params.id,(err,campground)=>{
        if (err) {
            console.log(err)
            res.redirect('/campgrounds/:id/comment/new')
        } else {
            
            res.render('comment/new',{campground:campground})
        }
    })
    
    
});

router.post('/',isLoggedIn, (req, res) => {
    Campground.findById(req.params.id,(err,campground)=>{
        if (err) {
            console.log(err);
            res.redirect('/campground/' + req.params.id)
        } else {
            Comment.create(req.body.comment,(err,comment)=>{
                if (err) {
                    console.log(err)
                } else {
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + req.params.id)

                }
            });
        }
    })
});

module.exports = router;