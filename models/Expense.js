const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const expenseSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    max: 100,
  },
  default: {
    type: Boolean,
  },
});

Expense = mongoose.model('expense', expenseSchema);

module.exports = Expense;
