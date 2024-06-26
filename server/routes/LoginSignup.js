const express = require('express');
const { handleUserLogin, handleUserSignup } = require("../controller/LoginSignup");
const router = express.Router();

router.post('/signup', handleUserSignup);

router.post('/login', handleUserLogin);

module.exports = router;