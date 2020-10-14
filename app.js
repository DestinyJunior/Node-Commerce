var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
// var jwt = require('jsonwebtoken');
var passport = require('passport');
var config = require('./config/database');
var mongoose = require('mongoose');

var app = express();

//Use body-parser to get POST  requests for API Use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Log requests to console
app.use(morgan('dev'));

//Initialize passport for use
app.use(passport.initialize());

// mongoose connection to database config file
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Bring in passport strategy we just defined
require('./config/passport')(passport);

// controllers

var userRouter = require('./router/user');
var productRouter = require('./router/product');

// routes prefix

app.use('/api/user/', userRouter);
app.use('/api/product', productRouter);



// Handle 404 Requests
app.use((req, res, next) => {
  const error = new Error('Route Not found');
  error.status = 404;
  next(error);
});

//Home route
app.get('/', (req, res) => {
  res.send('Relax, we will put the home page here later');
});

module.exports = app;
