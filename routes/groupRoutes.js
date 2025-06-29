const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.get('/:city', groupController.formGroups);

module.exports = router;
