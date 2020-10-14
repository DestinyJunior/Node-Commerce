var Product = require("../models/product");

class ProductController {
  /**
   * Create new Product
   * @param {*} req  Request
   * @param {*} res Response
   * @param {*} next
   */
  static createProduct = (req, res, next) => {
    // validate request
    if (!req.body.name && req.body.desc && req.body.price) {
      return res.json({
        success: false,
        message: "Provide Product,  Description,  Price.",
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
            message: "created",
            product: product,
          });
        }
      });
    }
  };

}
module.exports = ProductController;
