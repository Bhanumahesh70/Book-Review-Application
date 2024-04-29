const bookService = require('../services/bookService');


//Display List of all books
exports.book_list = async (req, res) => {
    console.log("Inside bookController.book_list");
    try {
        console.log("Displaying book details");
        const books = await bookService.findAllBooks();
        res.render('book_list', { title: 'Book List', books: books });
    } catch (err) {
        console.log("Error retrieving books");
        res.status(500).send("Error retrieving books: " + err);
    }
};

// Display detail page for a specific book
exports.book_detail = async (req, res) => {
    console.log("Inside bookController.book_detail");
    try {
        const book = await bookService.findBookById(req.params.id);
        if (!book) {
            console.log("No book found with that ID");
            res.status(404).send("No book found with that ID");
        } else {
            console.log("Displaying book details");
            res.render('book_detail', { 
                title: 'Book Detail', 
                book: book,
            // Send computed average rating to the view
            averageRating: book.reviews.length ? book.reviews.reduce((acc, curr) => acc + curr.rating, 0) / book.reviews.length : 'No ratings yet'
            });
        }
    } catch (err) {
        res.status(500).send("Error retrieving book: " + err);
    }
};


// Display book create form on GET
exports.book_create_get = (req, res) => {
    console.log("Inside bookController.book_create_get");
    res.render('book_form', { title: 'Create Book' });
};

// Handle book create on POST
exports.book_create_post = async (req, res) => {
    console.log("Inside bookController.book_create_post");
    console.log(req.body)
    const { title, author, genre } = req.body;
    let reviews = [];

    //logged in user
    if (req.user) {
        console.log("Logged in user ID:", req.user._id);
    } else {
        console.log("No user is logged in.");
        return res.status(403).send("User must be logged in to create a book.");
    }

    // Convert flat review keys into structured data
    Object.keys(req.body).forEach(key => {
        if (key.startsWith('reviews[')) {
            const match = key.match(/reviews\[(\d+)\]\[(\w+)\]/);
            if (match) {
                const index = parseInt(match[1]);
                const property = match[2];
                reviews[index] = reviews[index] || {user: req.user._id };
                reviews[index][property] = req.body[key];
            }
        }
    });
    console.log("Structured reviews with user IDs:", reviews);
    // Call the createBook function
    try {
        const bookData = { title, author, genre, reviews };
        const book = await bookService.createBook(bookData);
        console.log("Book Created Succesfully");
        //res.status(201).send(book);
        res.redirect(`/books/${book._id}`);
    } catch (error) {
        console.error('Failed to create book:', error);
        res.status(400).send(error);
    }
    /*
    try {
        const book = await bookService.createBook(req.body);
        console.log("Book Created Succesfully");
        res.redirect(`/books/${book._id}`);
    } catch (err) {
        console.log("Book is not Created");
        res.status(500).send("Failed to create book: " + err);
    }
    */
};

// Display book delete form on GET
exports.book_delete_get = async (req, res) => {
    console.log("Inside bookController.book_delete_get");
    try {
        const book = await bookService.findBookById(req.params.id);
        if (!book) {
            console.log("book is not found to delete");
            res.redirect('/books');
        } else {
            console.log("Book is deleted sucessfully");
            res.render('book_delete', { title: 'Delete Book', book: book });
        }
    } catch (err) {
        console.log("Error in deleting book");
        res.status(500).send("Error finding book for deletion: " + err);
    }
};

// Handle book delete on POST
exports.book_delete_post = async (req, res) => {
    console.log("Inside bookController.book_delete_post");
    try {
        await bookService.deleteBook(req.body.bookid);
        console.log("Book is deleted sucessfully");
        res.redirect('/books');
    } catch (err) {
        console.log("Error in deleting the book");
        res.status(500).send("Failed to delete book: " + err);
    }
};

// Display book update form on GET
exports.book_update_get = async (req, res) => {
    console.log("Inside bookController.book_update_get");
    try {
        const book = await bookService.findBookById(req.params.id);
        if (!book) {
            console.log("book is not found to update");
            res.redirect('/books');
        } else {
            console.log("Displaying book form to update");
            res.render('book_form', { title: 'Update Book', book: book });
        }
    } catch (err) {
        console.log("Error in updating book");
        res.status(500).send("Error finding book for update: " + err);
    }
};

// Handle book update on POST
exports.book_update_post = async (req, res) => {
    console.log("Inside bookController.book_update_post");
    try {
        
        const updatedBook = await bookService.updateBook(req.params.id, req.body);
        console.log("Book updated sucessfully");
        res.redirect(`/books/${updatedBook._id}`);
    } catch (err) {
        console.log("Error in updating book");
        res.status(500).send("Failed to update book: " + err);
    }
};

// Add or update a review
exports.add_or_update_review_post = async (req, res) => {
    try {
        await bookService.addOrUpdateReview(req.params.id, req.user._id, {
            rating: req.body.rating,
            text: req.body.text
        });
        res.redirect(`/books/${req.params.id}`);
    } catch (err) {
        res.status(500).send("Failed to add or update review: " + err);
    }
};

// Delete a review
exports.delete_review_post = async (req, res) => {
    try {
        await bookService.removeReview(req.params.id, req.user._id);
        res.redirect(`/books/${req.params.id}`);
    } catch (err) {
        res.status(500).send("Failed to delete review: " + err);
    }
};

module.exports = exports;
