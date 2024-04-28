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

module.exports = {
    createBook,
    findAllBooks,
    findBookById,
    updateBook,
    deleteBook
};
