const mongoose = require('mongoose');

saleSchema = new mongoose.Schema({
  orderNo: {
    type: Number,
  },
  saleDate: {
    type: Date,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'party',
  },
  saleInvoice: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Order = mongoose.model('order', saleSchema);

module.exports = Order;
