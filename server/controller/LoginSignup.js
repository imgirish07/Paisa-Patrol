const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { signUser } = require('../service/auth');

// // function to validate the email using Regular Expression (Regex)
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

async function handleUserSignup(req, res) {
    // got data from frontend
    const { userName, email, password } = req.body;

    // checking if all the fields are entered
    if (!(userName && email && password)) {
        return res.status(400).json({ message: 'enter all the fields' });
    }

    // Validating the format of Email entered using Regex
    const validEmail = validateEmail(email);
    if (!validEmail) {
        return res.status(400).json({ message: "invalid email" });
    }

    // encrypting the password
    let x;
    const salt = 10;
    await
        bcrypt.hash(password, salt)
            .then(hashPassword => {
                x = hashPassword;
            })
    const encryptedPassword = x;

    const user = await User.create({
        userName,
        email,
        password: encryptedPassword
    })

    // making a token for the user
    const token = signUser(user);

    // append the token with user
    user.token = token;

    // i dont want to send the password to  the frontend but it is stored in DB.
    user.password = undefined;

    return res.status(201).json({ user, message: "successful signup", boolValue: true });
}


async function handleUserLogin(req, res) {
    // get user data from frontend
    const { email, password } = req.body;

    // validate them
    if (!(email && password)) {
        return res.status(400).json({ message: "invalid email or password" });
    }

    // find the user in Database
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "invalid user" });
    }

    // comapre the password stored in db with entered password
    const boolPasswordMatched = await bcrypt.compare(password, user.password);

    if (boolPasswordMatched) {

        // making a token and storing a cookie
        const token = await signUser(user);

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
        });

        return res.status(200).json({ msg: 'login successful', user, boolValue: true });
    }
    else {
        return res.status(400).json({ msg: 'login failed' });
    }
}

module.exports = {
    handleUserLogin,
    handleUserSignup,
}