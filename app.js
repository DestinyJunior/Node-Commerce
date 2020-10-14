const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
var passport = require('passport');

var config = require('./config/database');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');



//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// files folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'node-commerce', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));


//Initialize passport for use
app.use(passport.initialize());

if(!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose


const connectDB = async () => {
  const conn = await mongoose.connect(config.database, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
    
  console.log(`MongoDB Connected : http://${conn.connection.host}`.cyan.underline.bold);
};


connectDB();

mongoose.set('debug', true);


require('./config/passport');
app.use(require('./routes'));

// Handle 404 Requests
app.use((req, res, next) => {
  const error = new Error('Route Not found');
  error.status = 404;
  next(error);
});

const server = app.listen(4000, () => {
  console.log('Server running on port localhost:4000/'.yellow.bold);
});
// Handle unhandled promise rejections
// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & process
  server.close(() => process.exit(1));
});