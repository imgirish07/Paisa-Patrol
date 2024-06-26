import React, { useState, useEffect } from 'react';
import axios from 'axios';
import deleteSvg from '../assets/delete.svg';
import { useNavigate } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_BACKEND;

function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // onChange functions
    const handlePhoneNumber = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
    };
    const handleName = (e) => {
        const value = e.target.value;
        setName(value);
    };

    // Add Contact
    const handleSubmitContact = async () => {
        try {
            const res = await axios.post(`${baseUrl}/addcontact`, {
                name: name,
                number: phoneNumber,
            }, {
                withCredentials: true,
            });
            const contactData = res.data;
            //console.log("Contact data ", contactData);
            // Fetch the updated list of contacts after adding a new one
            fetchContacts();
        } catch (error) {
            console.log("Error : ", error);
        }
    };

    // fetch contacts
    const fetchContacts = async () => {
        try {
            const res = await axios.get(`${baseUrl}/user/contacts`, {
                withCredentials: true,
            });
            const contactData = res.data;
            //console.log("Contact Data for testing...", contactData);
            await setContacts(contactData.contactList);
            //console.log("Contact Data", contacts);
        } catch (error) {
            console.log("Error fetching contacts:", error);
        }
    };

    // Delete Contact
    const handleDeleteContact = async (deleteId) => {
        //console.log("Deleting contact with ID:", deleteId);
        try {
            const res = await axios.post(`${baseUrl}/removecontact`, {
                id: deleteId
            }, {
                withCredentials: true,
            });
            const Response = res.data;
            //console.log("The deleted user was:", Response);
            fetchContacts();
        } catch (error) {
            console.log("Error deleting contact:", error);
        }
    }

    useEffect(() => {
        fetchContacts();
    }, []);

    // onClick to navigate to the ContactDetails 
    const navigate = useNavigate();
    const handleContactDetails = (contact) => {
        navigate('/dashboard/contactdetails', { state: { contactId: contact._id } });
    };

    return (
        <>
            <div className="w-full lg:w-[60%] mt-4 space-y-4 mb-4 p-4 flex justify-center border border-gray-300 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200">
                <div className="text-2xl font-bold text-purple-800">
                    My Contacts
                </div>
            </div>
            <div className="w-full max-w-md flex flex-col items-center space-y-4 rounded-lg p-4 lg:max-w-lg xl:max-w-xl">
                <input
                    type="text"
                    id="name"
                    name="FirstName"
                    placeholder="Name"
                    onChange={handleName}
                    className="bg-white h-[50px] px-4 mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-800 hover:shadow-md"
                />

                <input
                    type="number"
                    id="phonenumber"
                    name="phonenumber"
                    placeholder="Phone Number"
                    onChange={handlePhoneNumber}
                    className="bg-white h-[50px] px-4 mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-800 hover:shadow-md"
                    required
                />

                <button
                    type="submit"
                    onClick={handleSubmitContact}
                    className="bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-400 transition duration-200 flex items-center justify-center hover:shadow-md"
                >
                    <span className="mr-2 text-2xl leading-none">+</span>
                    <span className="text-xl">Add Contact</span>
                </button>
            </div>

            <div className="w-full lg:w-[60%] mt-4 space-y-4 overflow-y-auto overflow-hidden hide-scrollbar">
                {contacts.map((contact, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-md font-semibold uppercase text-purple-800" onClick={() => handleContactDetails(contact)}>{contact.name}</span>
                                <span className="text-xl font-bold text-gray-600">{contact.number}</span>
                            </div>
                            <div className="flex items-center ">
                                <button onClick={() => handleDeleteContact(contact._id)} className=" text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                                    <img src={deleteSvg} alt="Delete" className="w-8 h-8" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {<style jsx>{`
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                        .hide-scrollbar {
                            -ms-overflow-style: none;
                            scrollbar-width: none;
                        }`}
            </style>}
        </>
    );
}

export default ContactList;