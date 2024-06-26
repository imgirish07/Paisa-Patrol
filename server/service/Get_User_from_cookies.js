const { userVerify } = require('../service/auth')

// this function is to obtain user from jwt token stored in the cookies
async function GetUserFromCookies(req, res) {

    const token = await req.cookies.token;

    // // THIS IS HOW WE ACCESS THE TOKEN USING AUTHORIZATION
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]; // Bearer token

    // console.log("JWTtoken inside the cookie is:", token);

    if (!token) {
        // return res.status(400).json({ message: "invalid token" });
        return null;
    }

    const user = await userVerify(token);

    if (!user) {
        // return res.status(404).json({ msg: "invalid user" });
        return null;
    }
    
    return user;
}

module.exports = GetUserFromCookies;