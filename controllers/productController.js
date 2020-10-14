/* eslint-disable no-unused-vars */
const product = require('../models/product');
var Product = require('../models/product');

// class ProductController {
/**
   * Create new Product
   * @param {*} req  Request
   * @param {*} res Response
   * @param {*} next
   */
exports.createProduct = (req, res, next) => {
  // validate request
  if (!req.body.name && req.body.desc && req.body.price) {
    return res.json({
      success: false,
      message: 'Provide Product,  Description,  Price.',
    });
  } else {
    // save new product details
    let productDetails = new Product({
      userId: req.user._id,
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
    });

    // attempt to save new product details
    Product.create(productDetails, (err, product) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          message: err,
        });
      } else {
        return res.json({
          success: true,
          message: 'created',
          product: product,
        });
      }
    });
  }
};

exports.getProducts = (req, res, next) => {

  Product.find()
    .then(product => {
      res.json({
        success: true,
        message: 'product found',
        product: product
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: 'product not found',
        product: ''
      });
    });
};

exports.updateProducts = (req, res, next) => {
  let id = req.params.id;

  let query = {
    name: req.body.name,
    desc: req.body.desc,
    price: req.body.price,
  };
  Product.findByIdAndUpdate(id, query, {new:true})
    .then(product => {
      res.json({
        success: true,
        message: 'product updated',
        product: product
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: 'product not found',
        product: ''
      });
    });
};

exports.showProduct = (req, res, next) => {

  Product.findById(req.params.id)
    .then(product => {
      res.json({
        success: true,
        message: 'product found',
        product: product
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: 'product not found',
        product: ''
      });
    });
};
exports.deleteProduct = (req, res, next) => { 

  Product.findByIdAndRemove(req.params.id)
    .then(product => {
      res.json({
        success: true,
        message: 'product deleted',
        product: product
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: 'product not found',
        product: ''
      });
    });
};

// }
// module.exports = ProductController;
