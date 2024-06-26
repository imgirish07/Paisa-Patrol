const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
        // unique: true
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }]
    // we could add expense Schema in referene 
    // for a separate page of each conatct of user;
})
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;