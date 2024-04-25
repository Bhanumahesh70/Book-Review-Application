const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcryptjs');

// Display registration form
exports.user_create_get = (req, res) => {
    res.render('register');
};

// Handle User create on POST
exports.user_create_post = (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.render('register', { message: 'Password encryption failed' });
        }
        const user = new User({
            username: username,
            password: hashedPassword
        });
        user.save(err => {
            if (err) {
                return res.render('register', { message: 'User could not be created' });
            }
            res.redirect('/users/login');
        });
    });
};

// Display login form
exports.user_login_get = (req, res) => {
    res.render('login');
};

// Handle login on POST
exports.user_login_post = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
};

// Logout
exports.user_logout_get = (req, res) => {
    req.logout();
    res.redirect('/');
};

module.exports = exports;
