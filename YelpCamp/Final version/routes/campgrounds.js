const router = require('express').Router();
const middleware = require('../middleware');
const Campground = require('../models/campground');
const Comment = require('../models/comment');

router.get('/', (req, res) => {
    let textTruncate = function (str, length, ending) {
        ///prevent hmtl to show in truncate text///
        str = str.replace(/<\/?[^>]+(>|$)/g, "");
        if (str == undefined) {
            return 'Upps not description ...Yet'
        }
        if (ending == null) {
            ending = '...';
        }
        if (str.length > length) {
            return str.substring(0, length - ending.length) + ending;
        } else {
            return str;
        }
    };

    let context = {
        textTruncate: textTruncate,
    }
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            context.listOfCampgrounds = campgrounds
            res.render('campground/campgrounds', context);
        }
    })

});

router.post('/', middleware.isLoggedIn, (req, res) => {
    let newCamp = {
        name: req.body.name,
        imgUrl: req.body.image,
        description: req.body.description,
        author: {
            id: req.user.id,
            username: req.user.username
        },
        price: req.body.price
    }
    Campground.create(newCamp, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }

    });


});
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('campground/new')
});

router.get('/:id', (req, res) => {

    Campground.findById(req.params.id).populate('comments').exec((err, DB_response) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campground/show', { campground: DB_response });
        }
    })

});

router.get('/:id/edit', middleware.checkOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, DB_response) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campground/edit', { campground: DB_response });
        }
    })
});

router.put('/:id', middleware.checkOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body, (err, DB_response) => {
        if (err) {
            console.log(err)
            res.redirect('campgrounds')
        } else {
            res.redirect('/campgrounds/' + req.params.id)
        }
    })

});

router.delete('/:id', middleware.checkOwnership, (req, res) => {
    Campground.findByIdAndDelete(req.params.id, (err, DB_response) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds/' + req.params.id)

        } else {
            Comment.deleteMany({ _id: { $in: DB_response.comments } }, (err) => {
                if (err) {
                    console.log(err);
                }
                res.redirect("/campgrounds");
            });
        }
    })
});

module.exports = router;