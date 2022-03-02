const mongoose = require('mongoose');
const Schema = mongoose.Schema;

vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    trim: true,
    required: true,
  },
  make: {
    type: String,
    trim: true,
  },
  model: {
    type: String,
    trim: true,
  },
  yearOfPurchase: {
    type: String,
    trim: true,
  },
  condition: {
    type: String,
    trim: true,
  },
  organisation: {
    type: Schema.Types.ObjectId,
    ref: 'organisation',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = Vehicle = mongoose.model('vehicle', vehicleSchema);
