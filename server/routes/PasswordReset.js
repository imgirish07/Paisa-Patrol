const express = require('express');
const router = express.Router();
const { handleSendOtp, handleChangePassword } = require('../controller/PasswordReset')

router.post('/sendotp', handleSendOtp);

router.post('/updatepassword', handleChangePassword);

module.exports = router;