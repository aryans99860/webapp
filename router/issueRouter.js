const express = require('express');
const issueController = require('../controller/issueController');

const router = express.Router();

router.post('/', issueController.submitIssue); // Update this line

module.exports = router;
