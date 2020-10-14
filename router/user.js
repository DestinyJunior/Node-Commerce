var passport = require('passport');
var express = require('express');

// controllers
var userController = require('../controllers/userController');
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
    res.json({ 'user': req.user}     
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
