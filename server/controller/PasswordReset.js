require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
    }
})
async function handleSendOtp(req, res) {
    // console.log(req.body)
    const { email, OTP } = req.body;
    const user = await User.find({ email: email });
    // console.log(user);
    if (!user) {
        res.json({ success: 0, message: 'email not registered' });
    }
    const mailOptions = {
        from: {
            name: 'Xpense Tracker',
            address: process.env.GMAIL,
        },
        to: email,
        subject: 'OTP for Password change',
        text: `OTP for password update ${OTP}`
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent');
        res.json({ success: 1 })
    } catch (error) {
        console.error('Error sending email: ' + error);
        res.json({ success: 0 })
    }

}
async function handleChangePassword(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    //console.log(user);
    if (!user) {
        res.json({ success: 0, message: 'email not registered' });
    }
    try {
        const saltrounds = 10;
        const newPassword = await bcrypt.hash(password, saltrounds);
        //console.log('newpassword', newPassword);
        const updatedUser = await User.findByIdAndUpdate(user._id, { password: newPassword }, { new: true });
        //console.log('updatedUser', updatedUser);
        res.json({ success: 1 });
    } catch {
        res.json({ success: 0, message: "password change failed" });
    }
}
module.exports = { handleSendOtp, handleChangePassword };