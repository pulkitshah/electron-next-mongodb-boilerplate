const mongoose = require('mongoose');
const Schema = mongoose.Schema;

driverSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  waId: {
    type: String,
    required: false,
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: 'vehicle',
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

module.exports = Driver = mongoose.model('driver', driverSchema);
