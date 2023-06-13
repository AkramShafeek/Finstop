const express = require('express');
const router = express.Router();

const {
    getUsersController,
    signUpController,
    loginController,
    editController,
    passwordController } = require('../controllers/userControllers');

const { authenticationMiddleware } = require('../middleware/auth');

// only for dev purpose
router.route('/').get(getUsersController);

router.route('/signup').post(signUpController);
router.route('/login').post(loginController);
router.route('/edit').put(authenticationMiddleware, editController);
router.route('/changePassword').put(authenticationMiddleware, passwordController);


module.exports = router;