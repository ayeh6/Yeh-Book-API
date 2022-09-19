const router = require('express').Router();
const thougthController = require('../../../controllers/apiControllers/thoughtController');

// get all thoughts, create new thought
router.route('/').get(thougthController.getAllThoughts);
router.route('/').post(thougthController.createThought);

// single thought routes
router.route('/:thoughtId').get(thougthController.getThoughtById);
router.route('/:thoughtId').put(thougthController.updateThoughtById);  // new thought in body
router.route('/:thoughtId').delete(thougthController.deleteThoughtById);

// reactionId in body
router.route('/:thoughtId/reactions').post(thougthController.addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(thougthController.deleteReaction);

module.exports = router;