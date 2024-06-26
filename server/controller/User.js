const Contact = require('../models/Contact');
const User = require('../models/User');

// // this function is to obtain user from jwt token stored in the cookies
const GetUserFromCookies = require('../service/Get_User_from_cookies');

async function handleUserProfileInfo(req, res) {
    try {
        const user = await GetUserFromCookies(req, res);
        if (!user) {
            return res.status(401).json({ message: "User not logged in" });
        }

        const userId = user._id;
        // Find the user in the database and populate contacts and their expenses
        const userInDatabase = await User.findById(userId).populate({
            path: 'contacts',
            populate: {
                path: 'expenses'
            },
        }).populate('expenses');

        if (!userInDatabase) {
            return res.status(404).json({ message: "User not found in database" });
        }

        return res.status(200).json({ message: "User profile", user: userInDatabase });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


async function handleGetContactInfo(req, res) {
    const user = await GetUserFromCookies(req, res);
    if (!user) {
        res.status(401).json({ message: "user not logged in" });
    }
    try {
        const details = await User.findById(user._id).populate({
            path: 'contacts',
            populate: {
                path: 'expenses'
            }
        });
        res.json({ contactList: details.contacts });
    }
    catch (error) {
        console.log(error);
    }
}

async function handleGetExpenseInfo(req, res) {
    try {
        const user = await GetUserFromCookies(req, res);
        if (!user) {
            return res.status(401).json({ message: "User not logged in" });
        }

        // populating the expenses
        const expenseDetails = await User.findById(user._id).populate('expenses');

        if (!expenseDetails) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ expenses: expenseDetails.expenses });
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { handleUserProfileInfo, handleGetContactInfo, handleGetExpenseInfo };