const Book = require('../models/book');
const { ObjectId } = require('mongoose').Types;


async function createBook(bookData) {
    console.log("Received book data for creation:", bookData);

    // Check if reviews exist and map over them to transform user string into ObjectId
    const reviews = bookData.reviews ? bookData.reviews.map(review => ({
        ...review,
        user: new ObjectId(review.user) // Convert user string to ObjectId
    })) : [];

    const book = new Book({
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        reviews: reviews
    });

    return book.save();
}


async function findAllBooks() {
    return Book.find();
}

async function findBookById(id) {
    return Book.findById(id).populate({
        path: 'reviews.user',
        select: 'username' // only fetch the username from the user document
    });;
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
