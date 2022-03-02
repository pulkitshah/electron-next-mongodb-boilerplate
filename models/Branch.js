const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const branchSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    max: 100,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: Object,
  },
});

Branch = mongoose.model('branch', branchSchema);

module.exports = Branch;
