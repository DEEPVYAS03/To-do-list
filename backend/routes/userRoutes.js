const express = require('express');
const router = express.Router();

// importing controllers

const { signup, login } = require('../controllers/userController');


// routes
router.post('/signup', signup);
router.post('/login', login);


module.exports = router;