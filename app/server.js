
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session      = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var config    = require('./config');

// Setup passport
require('./auth/passport')(passport);

// Setup database
mongoose.connect(config.MONGO_DB); // connect to our database

// Routes
var routes = require('./routes/index');
var auth = require('./routes/auth')(passport);
var visitor = require('./routes/visitor');
var comment = require('./routes/comment');
var checkout = require('./routes/checkout');

// App
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(express.static(path.join(__dirname, '../dist')));

app.use(session({
  secret: '4815162342s',
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/', routes);
app.use('/auth', auth);
app.use('/api/visitor', visitor);
app.use('/api/comment', comment);
app.use('/api/checkout', checkout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log('Error');
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
