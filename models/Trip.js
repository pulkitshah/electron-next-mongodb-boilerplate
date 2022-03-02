const mongoose = require('mongoose');

tripSchema = new mongoose.Schema({
  orderNo: {
    type: String,
  },
  loadingDate: {
    type: Date,
  },
  isVehicleOwned: {
    type: Boolean,
  },
  route: {
    type: Array,
  },
  tripExpenses: {
    type: Array,
  },
  type: {
    type: String,
  },
  vehicleNumber: {
    type: String,
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vehicle',
  },
  transporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'party',
  },
  driverArrivalTime: {
    type: Date,
  },
  sale: {
    type: Object,
  },
  purchase: {
    type: Object,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'driver',
  },
  driverMobile: {
    type: String,
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

const Trip = mongoose.model('trip', tripSchema);

module.exports = Trip;
