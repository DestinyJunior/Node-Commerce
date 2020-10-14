var mongoose = require('mongoose');

var ProductDetails = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  desc: {
    type: String,
    required: true,
  },
  
  price: {
    type: String,
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Product', ProductDetails);
