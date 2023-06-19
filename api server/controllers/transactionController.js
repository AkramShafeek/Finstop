const Transaction = require('../models/Transaction');

const addTransaction = async (req, res) => {
  const newTransaction = await Transaction.create(req.body);
  res.status(200).send(newTransaction);
}

const fetchTransactions = async (req, res) => {
  const transactions = await Transaction.find();
  res.status(200).send(transactions);
}

module.exports = {
  addTransaction,
  fetchTransactions
}