const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine','ejs');
app.use(express.static('statics'));
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    {name:'Salmon creek', img:'https://cdn.pixabay.com/photo/2016/11/21/14/31/vw-bus-1845719_960_720.jpg'},
    {name:'Granite Hill', img:'https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg'},
    {name:'Villa Rusu', img:'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg'},    {name:'Salmon creek', img:'https://cdn.pixabay.com/photo/2016/11/21/14/31/vw-bus-1845719_960_720.jpg'},
    {name:'Granite Hill', img:'https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg'},
    {name:'Villa Rusu', img:'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg'},    {name:'Salmon creek', img:'https://cdn.pixabay.com/photo/2016/11/21/14/31/vw-bus-1845719_960_720.jpg'},
    {name:'Granite Hill', img:'https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg'},
    {name:'Villa Rusu', img:'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg'},    {name:'Salmon creek', img:'https://cdn.pixabay.com/photo/2016/11/21/14/31/vw-bus-1845719_960_720.jpg'},
    {name:'Granite Hill', img:'https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg'},
    {name:'Villa Rusu', img:'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg'},
]

app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/campgrounds', (req, res)=>{
  

    res.render('campgrounds',{listOfCampgrounds:campgrounds});
});

app.post('/campgrounds',(req, res)=>{
    let newCamp = {
        name:req.body.name,
        img: req.body.image,
    }
    console.log(req.body)
    campgrounds.push(newCamp);
    res.redirect('/campgrounds')
})

app.get('/campgrounds/new', (req, res)=>{
    res.render('new')
});


app.listen(3000, ()=>{
    console.log('server running...');
});