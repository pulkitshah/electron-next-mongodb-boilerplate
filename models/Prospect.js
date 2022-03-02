const mongoose = require('mongoose');
const validator = require('validator');

const prospectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: false,
  },
  waId: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'prospect',
    require: true,
  },
});

const Prospect = mongoose.model('prospect', prospectSchema);

module.exports = Prospect;
