function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')

}
function checkOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, (err, DB_response) => {
            if (err) {
                res.redirect('back')
            } else {
                if (DB_response.author.id.equals(req.user.id)) {
                    next()
                } else {
                    res.redirect('back')
                }
            }
        });
    }

}

module.exports = {
    isLoggedIn: isLoggedIn,
    checkOwnership: checkOwnership
}