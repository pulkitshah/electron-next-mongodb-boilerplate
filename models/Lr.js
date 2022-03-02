const mongoose = require('mongoose');

lrSchema = new mongoose.Schema({
  lrNo: {
    type: String,
  },
  date: {
    type: Date,
  },
  consignor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partyAddress',
  },
  consignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partyAddress',
  },
  vehicleNumber: { type: String },
  loading: { type: String },
  unloading: { type: String },
  natureOfGoods: { type: String },
  fareBasis: { type: String },
  lrWeight: { type: String },
  lrRate: { type: String },
  noOfItems: { type: String },
  valueOfGoods: { type: String },
  packagingType: { type: String },
  dimesnionsLength: { type: String },
  dimesnionsBreadth: { type: String },
  dimesnionsHeight: { type: String },
  gstPayableBy: { type: String },
  insuranceCompany: { type: String },
  insuranceDate: { type: String },
  insurancePolicyNo: { type: String },
  insuranceAmount: { type: String },
  ewayBillNo: { type: String },
  ewayBillExpiryDate: { type: String },
  vehicleType: { type: String },

  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organisation',
  },

  delivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'delivery',
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

const Lr = mongoose.model('lr', lrSchema);

module.exports = Lr;
