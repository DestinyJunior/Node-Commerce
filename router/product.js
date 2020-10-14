var passport = require('passport');
var config = require('../config/database');
var jwt = require('jsonwebtoken');
var express = require('express');

// controllers
var bankController = require('../controllers/bank_controller');

// initialize api group
var bankRequests = express.Router();

// non-protected routes

// protected routes
bankRequests.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  bankController.createBankDetails
);

bankRequests.get(
  '/user-bank-detail',
  passport.authenticate('jwt', { session: false }),
  bankController.getUserBank
);

bankRequests.get(
  '/user-bank-details',
  passport.authenticate('jwt', { session: false }),
  bankController.getBankDetails
);

module.exports = bankRequests;
