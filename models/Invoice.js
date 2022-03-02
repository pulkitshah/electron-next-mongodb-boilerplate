const mongoose = require('mongoose');

invoiceSchema = new mongoose.Schema({
  invoiceNo: {
    type: String,
  },
  invoiceDate: {
    type: Date,
  },
  invoiceType: {
    type: String,
  },
  remarks: {
    type: String,
  },
  status: {
    type: String,
  },
  deliveryIds: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'delivery' }],
  },
  taxes: {
    type: Array,
  },
  buyerParty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'party',
  },
  buyerBillingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partyAddress',
  },
  sellerOrganisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organisation',
  },

  sellerParty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'party',
  },
  sellerBillingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'partyAddress',
  },
  buyerOrganisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'organisation',
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Invoice = mongoose.model('invoice', invoiceSchema);

module.exports = Invoice;
