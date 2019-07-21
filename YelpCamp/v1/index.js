const express = require('express');
const app = express();

app.set('view engine','ejs');
// app.use(static('statics'))

app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/campsgrounds', (req, res)=>{
    var campsGrounds = [
        {name:'Salmon creek', img:'https://cdn.pixabay.com/photo/2016/11/21/14/31/vw-bus-1845719_960_720.jpg'},
        {name:'Granite Hill', img:'https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092_960_720.jpg'},
        {name:'Villa Rusu', img:'https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg'},
    ]

    res.render('campsgrounds',{listOfCampsGrounds:campsGrounds});
})

app.listen(3000, ()=>{
    console.log('server running...');
});