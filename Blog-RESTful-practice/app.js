const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(express.static('statics'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true }).
  catch(error => handleError(error));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to MongoDB')
 
});

var postSchema = mongoose.Schema({
    title: String,
    image: String,
    content: String
});

var Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
    res.redirect('/blog')
});

app.get('/blog', (req, res) => {
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
    Post.find({},(err, DbResponse)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('index', {postList:DbResponse, truncate:textTruncate})
        }
    })
    
});

app.get('/blog/new', (req, res) => {
    res.render('newBlog')
});

app.post('/blog', (req, res) => {
    let newPost = {
        title: req.body.title,
        image: req.body.image,
        content: req.body.content
    }
    Post.create(newPost,(err)=>{
        if (err) {
            console.log(err)
        } else {
            res.redirect('/blog')
        }
    })
    
});

app.get('/blog/:id', (req, res) => {
    Post.findById(req.params.id, (err, dbResponse)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('post', {post:dbResponse})
        }
    })
});
app.get('/blog/:id/edit', (req, res) => {
    Post.findById(req.params.id, (err, dbResponse)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('edit', {post:dbResponse})
        }
    })
});

app.put('/blog/:id', (req, res) => {
    console.log(req.body)
 Post.findByIdAndUpdate(req.params.id, req.body,(err, updatePost)=>{
     if (err) {
         res.redirect('/blog')
         console.log('error')
     } else {
         res.redirect('/blog/' + req.params.id)
     }
 })
});

app.delete('/blog/:id', (req, res) => {
   Post.findByIdAndDelete(req.params.id, (err)=>{
       if (err) {
           console.log(err)
           res.redirect(`/blog/${req.params.id}`)
       } else {
           res.redirect('/blog')
       }
   }) 
});




app.listen(3000, () => {
    console.log('App listening on port 3000!');
});      