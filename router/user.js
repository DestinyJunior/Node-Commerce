var passport = require('passport');
var express = require('express');

// controllers
const {createUser, authenticate, fetchAllUsers, updateUser } = require('../controllers/userController');
//Create API group routes
var userRoute = express.Router();

userRoute.post('/register', createUser);

//Authenticate the user get a JWT
userRoute.post('/authenticate', authenticate);

// Protect dashboard route with JWT
userRoute.get(
  '/dashboard',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ 'user': req.user}     
    );
  }
);

userRoute.get('/fetch', fetchAllUsers);

userRoute.get(
  '/update',
  passport.authenticate('jwt', { session: false }),
  updateUser
);

module.exports = userRoute;
