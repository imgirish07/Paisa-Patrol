const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    // Clear the session and any authentication-related cookies
    req.session.destroy();
    res.clearCookie('token', {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });

    return res.json({ message: 'Logout successful' });
});

module.exports = router;
