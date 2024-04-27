// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controller/supervisorController');

// Route to fetch operator names
router.get('/operators', supervisorController.getOperators);

module.exports = router;
