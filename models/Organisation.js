const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const organisationSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    max: 100,
  },
  gstin: {
    type: String,
  },
  pan: {
    type: String,
  },
  jurisdiction: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  initials: {
    type: String,
  },
  invoiceTermsAndConditions: {
    type: String,
  },
  logo: {
    type: Object,
  },
  counter: {
    type: Array,
  },
  lrFormat: {
    type: String,
  },
  invoiceFormat: {
    type: String,
  },
  contact: {
    type: String,
  },
  email: {
    type: String,
  },
  bankAccountNumber: {
    type: String,
  },
  bankBranchName: {
    type: String,
  },
  bankIFSC: {
    type: String,
  },
});

Organisation = mongoose.model('organisation', organisationSchema);

module.exports = Organisation;
