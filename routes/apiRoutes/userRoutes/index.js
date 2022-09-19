const router = require('express').Router();
const userController = require('../../../controllers/apiControllers/userController');

// get all users or create new user
router.route('/').get();
router.route('/').post();

// userId in params, friendId in body
router.route('/friends/:userId').post();
router.route('/friends/:userId').delete();

// userId in params
router.route('/:userId').get();
router.route('/:userId').put();
router.route('/:userId').delete();

module.exports = router;