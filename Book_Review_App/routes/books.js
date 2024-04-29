const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Middleware to ensure users are authenticated before allowing access to certain routes
const isAuthenticated = require('../middlewares/isAuthenticated');

// GET request for the list of all book entries.
router.get('/', bookController.book_list);

// GET request for creating a book
router.get('/create', isAuthenticated, bookController.book_create_get);

// POST request for creating Book
router.post('/create', isAuthenticated, bookController.book_create_post);

// GET request for one Book's detail
router.get('/:id', bookController.book_detail);

// GET request to update Book
router.get('/:id/update', isAuthenticated, bookController.book_update_get);

// POST request to update Book
router.post('/:id/update', isAuthenticated, bookController.book_update_post);

// GET request to delete Book
router.get('/:id/delete', isAuthenticated, bookController.book_delete_get);

// POST request to delete Book
router.post('/:id/delete', isAuthenticated, bookController.book_delete_post);

/*
*routes to view/edit/delete review
*/

// POST request to add or update a review
router.post('/:id/review', isAuthenticated, bookController.add_or_update_review_post);

// Get request to edit an existing review
router.get('/:id/review/edit', isAuthenticated, bookController.update_review_get);

// POST request to update an existing review
router.post('/:id/review/update', isAuthenticated, bookController.update_review_post);

// POST request to delete a review
router.post('/:id/review/delete', isAuthenticated, bookController.delete_review_post);

module.exports = router;
