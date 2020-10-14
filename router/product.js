var passport = require('passport');
var express = require('express');

// controllers
const {createProduct, getProducts, updateProducts, showProduct, deleteProduct} = require('../controllers/productController');

// initialize api group
var productRequests = express.Router();

// create product
productRequests.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  createProduct
);

// get products
productRequests.get(
  '/',
  getProducts
);

// update product
productRequests.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  updateProducts
);

// show product
productRequests.get(
  '/:id',
  showProduct
);

// delete product
productRequests.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  deleteProduct
);


module.exports = productRequests;
