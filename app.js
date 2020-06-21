var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var products = require('./routes/products');

var app = express();

var mongoose = require('mongoose');

var mongoaddress = require('./config.json');

let date_ob = new Date();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://192.168.1.80:27017/serversmanagement', {
  useNewUrlParser: true,
  autoReconnect: true,
  keepAlive: 30000,
  autoReconnectInterval: Number.MAX_VALUE,
  bufferMaxEntries:60
})
  .then(() => console.log(new Date().toISOString().
  replace(/T/, ' ').
  replace(/\..+/, '') + 
  ' --> ******* Connection Succeded *******'))
  .catch((err) => console.error(err))
  ;

mongoose.connection.on('error', function() {
  console.log(new Date().toISOString().
  replace(/T/, ' ').
  replace(/\..+/, '') + 
  ' --> _______ Lost MongoDB connection, retrying to connect... _______'),
    mongoose.connect('mongodb://localhost:27017/serversmanagement', {
       useNewUrlParser: true,
       autoReconnect: true,
       keepAlive: 30000,
       bufferMaxEntries:60,
});
});

//mongoose.connection.on('disconnected', function(){
//  console.log(new Date().toISOString().
//  replace(/T/, ' ').
//  replace(/\..+/, '') + 
//  ' --> _______ Lost MongoDB connection, retrying to connect... _______'),
//    mongoose.connect('mongodb://localhost:27017/serversmanagement', {
//       useNewUrlParser: true,
//       autoReconnect: true,
//       keepAlive: 30000,
//       bufferMaxEntries:60,
//});
//}), 5000;

mongoose.connection.on('connected', function() {
    isConnectedBefore = true;
    console.log(new Date().toISOString().
    replace(/T/, ' ').
    replace(/\..+/, '') + 
    ' --> ******* Connection established to MongoDB *******');
});

mongoose.connection.on('reconnected', function() {
    console.log(new Date().toISOString().
    replace(/T/, ' ').
    replace(/\..+/, '') + 
    ' --> ******* Reconnected to MongoDB *******');
});
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
// });
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/servers', products);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(3000);

module.exports = app;
