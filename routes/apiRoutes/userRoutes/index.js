const router = require('express').Router();
const userController = require('../../../controllers/apiControllers/userController');

// get all users or create new user
router.route('/').get(userController.getAllUsers);
router.route('/').post(userController.createUser);

// single user routes
router.route('/:userId').get(userController.getUserById);
router.route('/:userId').put(userController.updateUserById);
router.route('/:userId').delete(userController.deleteUserById);

// single user routes involving friends
router.route('/:userId/friends/:friendId').post(userController.addFriend);
router.route('/:userId/friends/:friendId').delete(userController.deleteFriend);

module.exports = router;