var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport); // pass passport for configuration
require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Connect to MongoDB Atlas
console.log('MongoDB URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // This is a secret key to sign the session ID cookie.
  resave: false,             // Forces the session to be saved back to the session store
  saveUninitialized: true,   // Forces a session that is "uninitialized" to be saved to the store
  cookie: { secure: false }  // Note: Set secure to true if using HTTPS, false otherwise
}));

app.use(passport.initialize());
app.use(passport.session());

// Use flash middleware
app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/*
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
