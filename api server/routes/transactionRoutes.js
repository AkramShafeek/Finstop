const express = require('express');
const { authenticationMiddleware } = require('../middleware/auth');
const router = express.Router();
const {
  addTransaction,
  fetchTransactions } = require('../controllers/transactionController');

// router.route('/:id').get(authenticationMiddleware, fetchOneTrack);
router.route('/').get(fetchTransactions);
router.route('/create').post(addTransaction);

module.exports = router;