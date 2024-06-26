const multer = require('multer');
const path = require('path');
const GetUserFromCookies = require('../service/Get_User_from_cookies');
const User = require('../models/User')
// uploading the uploaded images 
// at the local folder created here
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage: storage }).single('image');
// Function to handle image upload
async function handleImageUpload(req, res) {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: 0, message: 'File upload failed', error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ success: 0, message: 'No file uploaded' });
        }
        try {
            const userFromCookies = await GetUserFromCookies(req, res);
            if (!userFromCookies) {
                return res.status(401).json({ success: 0, message: 'User not authenticated' });
            }
            const image_url = `${process.env.BACKEND}/images/${req.file.filename}`;
            const user = await User.findByIdAndUpdate(userFromCookies._id, { image_url: image_url }, { new: true });
            if (!user) {
                return res.status(404).json({ success: 0, message: 'User not found' });
            }
            res.json({
                success: 1,
                image_url: image_url,
            });
        } catch (error) {
            console.error('Error updating user with image URL:', error);
            res.status(500).json({ success: 0, message: 'Server error' });
        }
    });
}
module.exports = { handleImageUpload };