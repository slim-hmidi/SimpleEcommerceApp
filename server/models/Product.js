const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  name: {
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  },
  price: {
    type: 'number',
    required: true,
  },
  quantity: {
    type: 'number',
    required: true,
  },
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
