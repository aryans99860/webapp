const express = require('express');
const router = express.Router();
const jwtAuth = require('../middleware/jwtAuth')
const {loginController , signupController} = require("../controller/userController")

// Route for user signup
router.post('/login', loginController);
router.post('/signup', signupController);


module.exports = router;
