const express = require('express');
const Book = require('../models/book'); 

const router = express.Router();

// GET home page.
router.get('/', async function(req, res, next) {
    try {
        const books = await Book.find(); // Fetch all books from the database
        res.render('index', { title: 'Home', user: req.user, books: books }); 
    } catch (error) {
        console.error('Failed to retrieve books:', error);
        next(error); // Pass error to the error-handling middleware
    }
});


// About page
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About Us' });
});

// Contact page
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Contact Us' });
});

module.exports = router;
