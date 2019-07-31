const router = require('express').Router();
const passport = require('passport')
const User = require('../models/user')


router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res) => {
    let newUser = {
        username: req.body.username,
        fullName: req.body.fullName
    }
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            return res.redirect('/register')
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/campgrounds')
        });
    });
});

router.get('/login', (req, res) => {
    res.render('auth/login')
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
}), (req, res) => {

});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;
