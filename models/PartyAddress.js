const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const partyAddressSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  party: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'party',
  },
  name: {
    type: String,
    max: 100,
  },
  gstin: {
    type: String,
    max: 100,
  },
  pan: {
    type: String,
  },
  billingAddressLine1: {
    type: String,
  },
  billingAddressLine2: {
    type: String,
  },
  city: {
    type: Object,
  },
});

PartyAddress = mongoose.model('partyAddress', partyAddressSchema);

module.exports = PartyAddress;
