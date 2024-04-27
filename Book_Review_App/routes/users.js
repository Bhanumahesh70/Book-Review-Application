const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

// GET request for registering a new user
router.get('/register', userController.user_create_get);

// POST request for registering a new user
router.post('/register', userController.user_create_post);

// GET request for user login
router.get('/login', userController.user_login_get);

// POST request for user login
router.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/', // Redirect to the homepage on successful login
        failureRedirect: '/users/login', // Redirect back to the login page if there's an error
        failureFlash: true // Optional: Use flash messages to report login errors
    })
);

// GET request for logging out
router.get('/logout', userController.user_logout_get);

module.exports = router;
