const express = require('express');
const router = express.Router();

const { handleContact, handleContactDelete, handleContactDetails } = require('../controller/Contact');

router.post('/addcontact', handleContact);

router.post('/removecontact', handleContactDelete)

router.post('/contactdetails', handleContactDetails)

module.exports = router;