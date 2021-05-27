const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  options: {
    type: [],
  },
});

module.exports = Item = mongoose.model('items', itemSchema);
