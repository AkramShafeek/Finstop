const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Category = mongoose.model('categories', categoriesSchema);

module.exports = Category;

