const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine','ejs');
app.use(express.static('statics'));
app.use(bodyParser.urlencoded({extended: true}));

var campsGrounds = [
    {name:'Salmon creek', img:'https://cdn.pixabay.com/photo/2016/11/21/14/31/vw-bus-1845719_960_720.jpg'},
    {name:'Granite Hill', img:'https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg'},
    {name:'Villa Rusu', img:'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg'},
]

app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/campsgrounds', (req, res)=>{
  

    res.render('campsgrounds',{listOfCampsGrounds:campsGrounds});
});

app.post('/campsgrounds',(req, res)=>{
    let newCamp = {
        name:req.body.name,
        img: req.body.image,
    }
    console.log(req.body)
    campsGrounds.push(newCamp);
    res.redirect('/campsgrounds')
})

app.get('/campsgrounds/new', (req, res)=>{
    res.render('new')
});


app.listen(3000, ()=>{
    console.log('server running...');
});