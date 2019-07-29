const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      Campground = require('./models/campground'),
      Comment = require('./models/comment').model,
      seeDB = require('./seed')

seeDB();

mongoose.connect('mongodb://localhost:27017/YelpCamp', { useNewUrlParser: true }).
  catch(error => handleError(error));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to MongoDB')
 
});

app.set('view engine','ejs');
app.use(express.static('statics'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/campgrounds', (req, res)=>{
    let textTruncate = function(str, length, ending) {
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

app.post('/campgrounds',(req, res)=>{
    let newCamp = {
        name:req.body.name,
        imgUrl: req.body.image,
        description: req.body.description
    }
    Campground.create(newCamp,err=>{
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds')
        }
        
    })
    
})

app.get('/campgrounds/new', (req, res)=>{
    res.render('campground/new')
});

app.get('/campgrounds/:id', (req, res) => {
    
    Campground.findById(req.params.id,(err, DB_response)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('campground/show',{campground:DB_response});
        }
    })
    
});

app.get('/campgrounds/:id/comment/new', (req, res) => {
    Campground.findById(req.params.id,(err,campground)=>{
        if (err) {
            console.log(err)
            res.redirect('/campgrounds/:id/comment/new')
        } else {
            
            res.render('comment/new',{campground:campground})
        }
    })
    
    
});

app.post('/campgrounds/:id/comment', (req, res) => {
    Campground.findById(req.params.id,(err,campground)=>{
        if (err) {
            console.log(err);
            res.redirect('/campground/' + req.params.id)
        } else {
            Comment.create(req.body.comment,(err,comment)=>{
                if (err) {
                    console.log(err)
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + req.params.id)

                }
            });
        }
    })
});


app.listen(3000, ()=>{
    console.log('server running...');
});