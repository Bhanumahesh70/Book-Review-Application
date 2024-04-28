function errorHandler(err, req, res, next) {
    // Log the error internally
    console.error(err);

    // Determine the status code of the response
    const statusCode = err.statusCode || 500;

    // Only provide error details in development
    const isDevelopment = process.env.NODE_ENV === 'development';
    const errorMessage = isDevelopment ? err.message : 'Internal Server Error';

    // Respond with the error
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: errorMessage,
        ...(isDevelopment && { stack: err.stack })  // Include stack trace in development mode
    });
}

module.exports = errorHandler;
