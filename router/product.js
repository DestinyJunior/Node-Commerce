var passport = require('passport');
var express = require('express');

// controllers
var productController = require('../controllers/productController');

// initialize api group
var productRequests = express.Router();

// create product
productRequests.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  productController.createProduct
);


module.exports = productRequests;
