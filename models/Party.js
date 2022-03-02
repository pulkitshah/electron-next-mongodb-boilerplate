const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const partySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  name: {
    type: String,
    max: 100,
  },
  location: {
    type: Object,
  },
  mobile: {
    type: String,
  },
  waId: {
    type: String,
    required: false,
  },
  transporter: {
    type: Boolean,
  },
});

Party = mongoose.model('party', partySchema);

module.exports = Party;
