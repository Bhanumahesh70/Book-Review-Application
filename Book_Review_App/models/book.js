const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Review Subdocument Schema
const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must not exceed 5']

    },
    text: {
        type: String,
        required: [true, 'Review text is required'],
        trim: true,
        minlength: [10, 'Review text must be at least 10 characters long'],
        maxlength: [5000, 'Review text cannot exceed 5000 characters']

    }
}, {
    timestamps: true
});

// Main Book Schema
const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
        unique: true, // Ensure each book title is unique
        maxlength: [500, 'Book title cannot exceed 500 characters']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
        maxlength: [200, 'Author name cannot exceed 200 characters']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true,
        maxlength:[100, 'Genre cannot exceed 100 characters']
    },
    createdByUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviews: [reviewSchema] // Embed reviews directly within each book document
}, {
    timestamps: true
});

// Virtual for average rating
bookSchema.virtual('averageRating').get(function() {
    if (this.reviews.length > 0) {
        let sum = this.reviews.reduce((total, review) => total + review.rating, 0);
        return sum / this.reviews.length;
    }
    return 0;
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
