const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const taxeschema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    max: 100,
  },
  value: {
    type: String,
  },
});

Tax = mongoose.model('tax', taxeschema);

module.exports = Tax;
