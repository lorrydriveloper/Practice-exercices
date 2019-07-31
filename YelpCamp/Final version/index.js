const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  passport = require('passport'),
  localStrategy = require('passport-local'),
  User = require('./models/user'),
  methodOverride = require('method-override')


const authRoutes = require('./routes/auth');
const campgroundRoutes = require('./routes/campgrounds');
const commentsRoutes = require('./routes/comments');

mongoose.connect('mongodb://localhost:27017/YelpCamp', { useNewUrlParser: true }).
  catch(error => handleError(error));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to MongoDB')

});

app.set('view engine', 'ejs');
app.use(express.static('statics'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());

// PASSPORT CONFIGURATION

app.use(require('express-session')({
  secret: 'Nothing to show here',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});



app.get('/', (req, res) => {
  res.render('home')
})

app.use(authRoutes);
app.use('/campgrounds/:id/comment', commentsRoutes);
app.use('/campgrounds', campgroundRoutes);

app.listen(3000, () => {
  console.log('server running...');
});