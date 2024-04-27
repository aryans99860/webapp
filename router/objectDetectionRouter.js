// router/indexRouter.js

const express = require('express');
const router = express.Router();
const objectDetectionController = require('../controller/objectDetectionController');

// Define routes
router.post('/predict', objectDetectionController.predict);

module.exports = router;
