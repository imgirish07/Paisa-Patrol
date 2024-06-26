const express = require('express');
const router = express.Router();
const { handleUserProfileInfo, handleGetContactInfo, handleGetExpenseInfo } = require('../controller/User');

// route to get details of user with the contacts
// to display on the contact or friends page

router.get('/profile', handleUserProfileInfo);

router.get('/contacts', handleGetContactInfo);

router.get('/expenses', handleGetExpenseInfo);

module.exports = router;