const { userVerify } = require('../service/auth');

async function restrictedToLoggedinUserOnly(req, res, next) {
    // const token = req.cookies.token;
    
    // // our token is in headers sent from the frontend we need to access it
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    //console.log("JWTtoken inside the cookie is:", token);

    if (!token) {
        return res.status(400).json({ message: "invalid token" });
    }

    const user = await userVerify(token);

    if (!user) {
        return res.status(404).json({ msg: "invalid user" });
    }
    req.user = user;
    next();
}

module.exports = {
    restrictedToLoggedinUserOnly
}