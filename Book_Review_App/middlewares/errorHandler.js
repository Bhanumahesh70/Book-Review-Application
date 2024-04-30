function errorHandler(err, req, res, next) {
    // Log the error for internal use
    console.error(err);

    // Check if the environment is development or production
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Set the status code of the response
    const statusCode = err.statusCode || 500;

    // Set a generic message for production
    const errorMessage = isDevelopment ? err.message : 'A server error occurred. Please try again later.';

    // Send the error response
    res.status(statusCode).render('error', {
        title: 'Error',
        error: {
            status: statusCode,
            message: errorMessage,
            ...(isDevelopment && { stack: err.stack })  // Conditionally render stack trace in development only
        }
    });
}

module.exports = errorHandler;
