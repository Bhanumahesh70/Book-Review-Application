const sanitizeHtml = require('sanitize-html');

// Middleware to sanitize input data
function sanitizeInput(req, res, next) {
    const sanitizeOptions = {
        allowedTags: [],  // No HTML tags allowed
        allowedAttributes: {}  // No attributes allowed
    };

    // Sanitize each input field
    if (req.body.title) {
        req.body.title = sanitizeHtml(req.body.title, sanitizeOptions);
    }
    if (req.body.author) {
        req.body.author = sanitizeHtml(req.body.author, sanitizeOptions);
    }
    if (req.body.genre) {
        req.body.genre = sanitizeHtml(req.body.genre, sanitizeOptions);
    }
    if (req.body.text) { // For review text
        req.body.text = sanitizeHtml(req.body.text, sanitizeOptions);
    }

    next();
}

module.exports = sanitizeInput;