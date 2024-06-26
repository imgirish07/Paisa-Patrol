const Contact = require('../models/Contact');
const User = require('../models/User');

// // this function is to obtain user from jwt token stored in the cookies
const GetUserFromCookies = require('../service/Get_User_from_cookies');

// // ADD CONTACT
async function addContactToUserSchema(userId, contactData) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return null;
        }
        // console.log("USER IN THE CONTACT CONTROLLER : ", user)
        // console.log("user id:", userId); // Log the value of contactData

        // // Add the new contact's _id to the user's contacts array
        await user.contacts.push(contactData._id);  // change 1--> contactData to contactData's ID
        const savedUser = await user.save();
        if (!savedUser) return null;
        //console.log("savedUser : ", savedUser);
        return;

    } catch (error) {
        console.log("error from Contact controller", error);
    }
}

async function handleContact(req, res) {
    const { name, number } = req.body;
    if (!(name && number)) {
        return res.status(400).send('Please enter all the fields');
    }
    try {
        const saveContact = await Contact.create({ // Await the creation of the contact
            name,
            number,
        });
        // this is the function that will give me the user stored in the token(jwt) which is stored in cookies
        const user = await GetUserFromCookies(req, res);
        //console.log(user);
        // when user wants to add new contact
        await addContactToUserSchema(user._id, saveContact);

        res.status(200).json({ message: "contact added", success: true });

    } catch (error) {
        console.log("Error in handleContact:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// // CONTACT DELETE

// async function removeContactFromUserSchema(userId, contactData) {
//     const user = await User.findById(userId);
//     if (!user)
//         return null;
//     // removing ContactData From the list of contacts
//     user.contacts = user.contacts.filter(contact => contact._id != contactData._id);
//     const savedUser = await user.save();
//     if (!savedUser) return null;
//     return;
// }

async function handleContactDelete(req, res) {
    const user = await GetUserFromCookies(req);
    // this id is of the contact to be deleted
    const { id } = req.body;
    console.log("received id is : ", id)

    if (!id) res.status(201).json({ message: id });

    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) res.status(201).json({ message: id });

    // removeContactFromUserSchema(user._id, deletedContact);

    // Use $pull to remove the contact ID from the user's contacts array
    await User.updateOne(
        { _id: user._id },
        { $pull: { contacts: id } }
    );

    res.status(200).json({ success: true, message: "contact removed" });
}

// getting contact details

async function handleContactDetails(req, res) {
    const { contactId } = req.body;
    const contact = await Contact.findById(contactId).populate('expenses');
    // console.log(contact);
    res.status(200).send(contact)
}
module.exports = { handleContact, handleContactDelete, handleContactDetails };