const router = require('express').Router();
const thougthController = require('../../../controllers/apiControllers/thoughtController');

// get all thoughts, create new thought
router.route('/').get();
router.route('/').post();

// reactionId in body
router.route('/reactions/:thoughtId').post();
router.route('/reactions/:thoughtId').delete();

router.route('/:thoughtId').get();
router.route('/:thoughtId').put();  // new thought in body
router.route('/:thoughtId').delete();
