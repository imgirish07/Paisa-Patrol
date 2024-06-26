const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('Hello Im Home page');
    const token = req.cookies.token; 
    if (token) {
        // If valid: send the token to the frontend
        res.json({ isAuthenticated: true });
    } else {
        res.json({ isAuthenticated: false });
    }
});

module.exports = router;
