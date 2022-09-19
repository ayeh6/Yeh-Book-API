const router = require('express').Router();
const thougthController = require('../../../controllers/apiControllers/thoughtController');

// get all thoughts, create new thought
router.route('/').get();
router.route('/').post();

// single thought routes
router.route('/:thoughtId').get();
router.route('/:thoughtId').put();  // new thought in body
router.route('/:thoughtId').delete();

// reactionId in body
router.route('/:thoughtId/reactions').post();
router.route('/:thoughtId/reactions/:reactionId').delete();
