const express = require('express');
const { authenticationMiddleware } = require('../middleware/auth');
const router = express.Router();
const {
    fetchTracks,
    createTrack,
    editTrack,
    deleteTrack } = require('../controllers/trackControllers');

router.route('/').get(authenticationMiddleware, fetchTracks);
// router.route('/:id').get(authenticationMiddleware, fetchOneTrack);
router.route('/create').post(authenticationMiddleware, createTrack);
router.route('/edit').put(authenticationMiddleware, editTrack);
router.route('/delete').delete(authenticationMiddleware, deleteTrack);

module.exports = router;