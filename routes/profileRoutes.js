const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/:userId/next', profileController.getNextProfile);
router.post('/:userId/feedback', express.json(), profileController.postFeedback);

module.exports = router;
