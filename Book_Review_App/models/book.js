const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Book
const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim: true,
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
        maxlength: [100, 'Genre cannot exceed 100 characters']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must not exceed 5']
    },
    reviewText: {
        type: String,
        required: [true, 'Review text is required'],
        trim: true,
        minlength: [10, 'Review text must be at least 10 characters long'],
        maxlength: [5000, 'Review text cannot exceed 5000 characters']
    }
}, {
    timestamps: true // adds createdAt and updatedAt timestamps automatically
});

// Indexes
bookSchema.index({ title: 1, author: 1, genre: 1 }, { unique: false });

// Compile model from schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
