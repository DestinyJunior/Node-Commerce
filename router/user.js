var passport = require('passport');
var config = require('../config/database');
var jwt = require('jsonwebtoken');
var express = require('express');

// controllers
var userController = require('../controllers/user_controller');
//Create API group routes
var userRoute = express.Router();

userRoute.post('/register', userController.createUser);

//Authenticate the user get a JWT
userRoute.post('/authenticate', userController.authenticate);

// Protect dashboard route with JWT
userRoute.get(
  '/dashboard',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send(
      'Dashboard : ' + req.user._id + '. ' + req.user + ' ' + req.user.email
    );
  }
);

userRoute.get('/fetch', userController.fetchAllUsers);

userRoute.get(
  '/update',
  passport.authenticate('jwt', { session: false }),
  userController.updateUser
);

module.exports = userRoute;
