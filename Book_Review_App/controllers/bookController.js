const bookService = require('../services/bookService');

exports.book_list = async (req, res) => {
    try {
        const books = await bookService.findAllBooks();
        res.render('book_list', { title: 'Book List', book_list: books });
    } catch (err) {
        res.status(500).send("Error retrieving books: " + err);
    }
};

exports.book_detail = async (req, res) => {
    try {
        const book = await bookService.findBookById(req.params.id);
        if (!book) {
            res.status(404).send("No book found with that ID");
        } else {
            res.render('book_detail', { title: 'Book Detail', book: book });
        }
    } catch (err) {
        res.status(500).send("Error retrieving book: " + err);
    }
};

exports.book_create_get = (req, res) => {
    res.render('book_form', { title: 'Create Book' });
};

exports.book_create_post = async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        res.redirect(`/books/${book._id}`);
    } catch (err) {
        res.status(500).send("Failed to create book: " + err);
    }
};

exports.book_delete_get = async (req, res) => {
    try {
        const book = await bookService.findBookById(req.params.id);
        if (!book) {
            res.redirect('/books');
        } else {
            res.render('book_delete', { title: 'Delete Book', book: book });
        }
    } catch (err) {
        res.status(500).send("Error finding book for deletion: " + err);
    }
};

exports.book_delete_post = async (req, res) => {
    try {
        await bookService.deleteBook(req.body.bookid);
        res.redirect('/books');
    } catch (err) {
        res.status(500).send("Failed to delete book: " + err);
    }
};

exports.book_update_get = async (req, res) => {
    try {
        const book = await bookService.findBookById(req.params.id);
        if (!book) {
            res.redirect('/books');
        } else {
            res.render('book_form', { title: 'Update Book', book: book });
        }
    } catch (err) {
        res.status(500).send("Error finding book for update: " + err);
    }
};

exports.book_update_post = async (req, res) => {
    try {
        const updatedBook = await bookService.updateBook(req.params.id, req.body);
        res.redirect(`/books/${updatedBook._id}`);
    } catch (err) {
        res.status(500).send("Failed to update book: " + err);
    }
};

module.exports = exports;
