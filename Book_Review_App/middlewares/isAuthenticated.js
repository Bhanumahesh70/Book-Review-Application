function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();  // If user is authenticated, proceed to the next middleware/function
    }
    // If not authenticated, redirect to the login page
    res.redirect('/users/login');
}

module.exports = isAuthenticated;
