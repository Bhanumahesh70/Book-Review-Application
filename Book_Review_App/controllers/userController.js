const userService = require('../services/userService');
const passport = require('passport');

// Display registration form
exports.user_create_get = (req, res) => {
    res.render('register');
};

// Handle User create on POST
exports.user_create_post = async (req, res) => {
    try {
        await userService.createUser(req.body);
        res.redirect('/users/login');
    } catch (err) {
        // Handle error e.g., user already exists or database errors
        res.render('register', { error: 'User could not be created: ' + err.message });
    }
};

// Display login form
exports.user_login_get = (req, res) => {
    // Check if there are any flash messages and send them to the view
    res.render('login', {
        messages: {
            error: req.flash('error')  // This will either be an array of messages or an empty array
        }
    });
};


// Handle login on POST
exports.user_login_post = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true // Ensure you have flash middleware configured if you use this option
    })(req, res, next);
};

// Logout
exports.user_logout_get = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
};

module.exports = exports;
