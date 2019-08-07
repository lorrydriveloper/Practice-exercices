const router = require('express').Router();
const middleware = require('../middleware');
const Campground = require('../models/campground');
const Comment = require('../models/comment');
var NodeGeocoder = require('node-geocoder')
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
var geocoder = NodeGeocoder(options);

router.get('/', (req, res) => {
    let textTruncate = function (str, length, ending) {
        ///prevent see html in truncate text///
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
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}, (err, campgrounds) => {
            if (err) {
                console.log(err);
            } else if(campgrounds.length == 0){
                req.flash('error', 'No campgrounds matches');
                res.redirect('/campgrounds');
            }
            else {
                context.listOfCampgrounds = campgrounds
                res.render('campground/campgrounds', context);
            }
        });
    } else {
        Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            context.listOfCampgrounds = campgrounds
            res.render('campground/campgrounds', context);
        }
        });
    }
    

});

router.post('/', middleware.isLoggedIn, (req, res) => {
    geocoder.geocode(req.body.location, function (err, data) {
        if (err || !data.length) {
            console.log(err)
          req.flash('error', 'Invalid address');
          return res.redirect('back');
        }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
   

        let newCamp = {
            name: req.body.name,
            imgUrl: req.body.image,
            description: req.body.description,
            author: {
                id: req.user.id,
                username: req.user.username
            },
            price: req.body.price,
            location: location,
            lng : lng,
            lat: lat
        }
        Campground.create(newCamp, (err, campground) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/campgrounds');
            }

    });
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
    geocoder.geocode(req.body.location, function (err, data) {
        if (err || !data.length) {
          req.flash('error', 'Invalid address');
          return res.redirect('back');
        }
        req.body.lat = data[0].latitude;
        req.body.lng = data[0].longitude;
        req.body.location = data[0].formattedAddress;
        Campground.findByIdAndUpdate(req.params.id, req.body, (err, DB_response) => {
            if (err) {
                console.log(err)
                res.redirect('campgrounds')
            } else {
                res.redirect('/campgrounds/' + req.params.id)
            }
        })
    });
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


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;