const Book = require('../models/book');

async function createBook(bookData) {
    const book = new Book(bookData);
    return book.save();
}

async function findAllBooks() {
    return Book.find();
}

async function findBookById(id) {
    return Book.findById(id).populate('reviews.user');;
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

// Add a review
async function addOrUpdateReview(bookId, userId, reviewData) {
    const book = await Book.findById(bookId);
    const existingReviewIndex = book.reviews.findIndex(review => review.user.toString() === userId.toString());

    if (existingReviewIndex > -1) {
        // Update existing review
        book.reviews[existingReviewIndex] = { ...book.reviews[existingReviewIndex].toObject(), ...reviewData };
    } else {
        // Add new review
        book.reviews.push({ user: userId, ...reviewData });
    }

    return book.save();
}

// Remove a review
async function removeReview(bookId, userId) {
    const book = await Book.findById(bookId);
    book.reviews = book.reviews.filter(review => review.user.toString() !== userId.toString());
    return book.save();
}
module.exports = {
    createBook,
    findAllBooks,
    findBookById,
    updateBook,
    deleteBook,
    addOrUpdateReview,
    removeReview
};
