const mongoose = require('mongoose');

deliverySchema = new mongoose.Schema({
  billWeight: {
    type: Number,
  },
  unloadingWeight: {
    type: Number,
  },
  loading: {
    type: Object,
  },
  unloading: {
    type: Object,
  },
  weighbridgeName: {
    type: String,
  },

  lrNo: {
    type: String,
  },

  lrDetail: {
    type: Object,
  },
  saleOthers: {
    type: Object,
  },
  purchaseOthers: {
    type: Object,
  },
  remarks: {
    type: String,
  },
  status: {
    type: String,
  },

  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trip',
  },

  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'order',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Delivery = mongoose.model('delivery', deliverySchema);

module.exports = Delivery;
