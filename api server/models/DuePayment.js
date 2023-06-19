const mongoose = require('mongoose');

const dueSchema = mongoose.Schema({
  track:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paid: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'pending'
  },
  deadline: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const DuePayment = mongoose.model('categories', dueSchema);

module.exports = DuePayment;

