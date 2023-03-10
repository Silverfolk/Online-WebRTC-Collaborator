var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator=require('express-validator');

var mongoose=require('mongoose');
var passport=require('passport');
var session=require('express-session');

var app = express();


require('./passport');
var config=require('./config');

var indexRoute=require('./routes/index');
var authRoute=require('./routes/auth');
var taskRoute=require('./routes/task');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
  secret:"hello",
  resave:false,
  saveUninitialized:true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {//login authencation
  if (req.isAuthenticated()) {//if user is authenticated
    res.locals.user = req.user;
  }
  next();//after signing you can move to next middleware present in app.js file
});


app.use('/', indexRoute);
app.use('/', authRoute);//'/auth'
app.use('/', taskRoute);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
