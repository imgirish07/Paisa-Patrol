const express = require('express');
const { handleImageUpload } = require('../controller/Upload');
const router = express.Router();

router.post('/upload', handleImageUpload);

module.exports = router