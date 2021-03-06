const router = require('express').Router();
const isLoggedIn = require('../middleware').isLoggedIn;
const Campground = require('../models/campground');

router.get('/', (req, res)=>{
    let textTruncate = function(str, length, ending) {
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
    Campground.find({}, (err, campgrounds)=>{
        if (err) {
            console.log(err);
        } else {
            context.listOfCampgrounds = campgrounds
            res.render('campground/campgrounds',context);
        }
    })
    
});

router.post('/',isLoggedIn,(req, res)=>{
    let newCamp = {
        name:req.body.name,
        imgUrl: req.body.image,
        description: req.body.description,
        author:{
            id: req.user.id,
            username: req.user.username
        }
    }
    Campground.create(newCamp,(err, campground)=>{
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds')
            console.log(campground);
        }
        
    });

    
});
router.get('/new', isLoggedIn,(req, res)=>{
    res.render('campground/new')
});

router.get('/:id', (req, res) => {
    
    Campground.findById(req.params.id,(err, DB_response)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('campground/show',{campground:DB_response});
        }
    })
    
});

module.exports = router;