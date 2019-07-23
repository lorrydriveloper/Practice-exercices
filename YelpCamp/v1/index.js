const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/YelpCamp', { useNewUrlParser: true }).
  catch(error => handleError(error));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to MongoDB')
 
});

var campgroundSchema = new mongoose.Schema({
    name: String,
    imgUrl: String,
    description: String,
    });

    var Campground = mongoose.model('Campground', campgroundSchema);

    // Campground.create(
    //     {name:'Salmon creek', imgUrl:'https://cdn.pixabay.com/photo/2016/11/21/14/31/vw-bus-1845719_960_720.jpg'},
    //     (err, campground)=>{
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log(`New Campground ${campground.name} Created`)
    //     }
    // });

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
            res.render('campgrounds',context);
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
    res.render('new')
});

app.get('/campgrounds/:id', (req, res) => {
    
    Campground.findById(req.params.id,(err, DB_response)=>{
        if (err) {
            console.log(err)
        } else {
            res.render('show',{campground:DB_response})
        }
    })
    
});


app.listen(3000, ()=>{
    console.log('server running...');
});