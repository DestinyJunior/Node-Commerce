const mongoose = require('mongoose');


const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: String,
  price: String,
  description: String,
});


mongoose.model('Users', ProductSchema);
