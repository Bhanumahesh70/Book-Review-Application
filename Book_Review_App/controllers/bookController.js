const Book = require('../models/book');

// Display list of all books
exports.book_list = async (req, res) => {
    try {
        const books = await Book.find();
        res.render('book_list', { title: 'Book List', book_list: books });
    } catch (err) {
        res.status(500).send("Error retrieving books: " + err);
    }
};

// Display detail page for a specific book
exports.book_detail = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).send("No book found with that ID");
        } else {
            res.render('book_detail', { title: 'Book Detail', book: book });
        }
    } catch (err) {
        res.status(500).send("Error retrieving book: " + err);
    }
};

// Display book create form on GET
exports.book_create_get = (req, res) => {
    res.render('book_form', { title: 'Create Book' });
};

// Handle book create on POST
exports.book_create_post = async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        rating: req.body.rating,
        reviewText: req.body.reviewText
    });
    try {
        await book.save();
        res.redirect(book.url);
    } catch (err) {
        res.status(500).send("Failed to create book: " + err);
    }
};

// Display book delete form on GET
exports.book_delete_get = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.redirect('/books');
        } else {
            res.render('book_delete', { title: 'Delete Book', book: book });
        }
    } catch (err) {
        res.status(500).send("Error finding book for deletion: " + err);
    }
};

// Handle book delete on POST
exports.book_delete_post = async (req, res) => {
    try {
        await Book.findByIdAndRemove(req.body.bookid);
        res.redirect('/books');
    } catch (err) {
        res.status(500).send("Failed to delete book: " + err);
    }
};

// Display book update form on GET
exports.book_update_get = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.redirect('/books');
        } else {
            res.render('book_form', { title: 'Update Book', book: book });
        }
    } catch (err) {
        res.status(500).send("Error finding book for update: " + err);
    }
};

// Handle book update on POST
exports.book_update_post = async (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        rating: req.body.rating,
        reviewText: req.body.reviewText
    };
    try {
        await Book.findByIdAndUpdate(req.params.id, book);
        res.redirect('/books');
    } catch (err) {
        res.status(500).send("Failed to update book: " + err);
    }
};

module.exports = exports;
