const Book = require('../models/book');

async function createBook(bookData) {
    const book = new Book(bookData);
    return book.save();
}

async function findAllBooks() {
    return Book.find();
}

async function findBookById(id) {
    return Book.findById(id);
}

async function updateBook(id, bookData) {
    return Book.findByIdAndUpdate(id, bookData, { new: true });
}

async function deleteBook(id) {
    return Book.findByIdAndDelete(id);
}
async function addReview(bookId, reviewData) {
    const book = await Book.findById(bookId);
    book.reviews.push(reviewData);
    return book.save();
}


module.exports = {
    createBook,
    findAllBooks,
    findBookById,
    updateBook,
    deleteBook
};
