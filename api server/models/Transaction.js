const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  track: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
  },
  transaction: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;

