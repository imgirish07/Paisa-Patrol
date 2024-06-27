/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import dateSvg from '../assets/date.svg';
import messageSvg from '../assets/message.svg';
import axios from 'axios'
import deleteSvg from '../assets/delete.svg';

const baseUrl = process.env.REACT_APP_BACKEND;

const ContactDetails = () => {
    const location = useLocation();
    const { contactId } = location.state;
    const [expenses, setExpenses] = useState([]);
    const [oldexpenses, setOldExpenses] = useState([]);
    const [totalexpense, setTotalExpense] = useState(0);
    const [newexpense, setNewExpense] = useState({
        "amount": 0,
        "category": "food",
        "description": "",
    });

    // Expense of a contact using ContactID 
    const fetchExpenseList = async () => {
        try {
            const fetchededContact = await axios.post(`${baseUrl}/contactdetails`,
                {
                    contactId: contactId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            setExpenses(fetchededContact.data.expenses)
            setTotalExpense(fetchededContact.data.expenses.reduce((acc, expense) => acc + expense.Amount, 0));
        } catch (error) {
            console.error("Error fetching expenses:", error);
        }
    };
    useEffect(() => {
        fetchExpenseList();
    }, []);

    useEffect(() => {
        if (expenses.length) {
            setTotalExpense(expenses.reduce((acc, expense) => acc + expense.Amount, 0));
            setOldExpenses([...expenses].reverse());
        }
    }, [expenses]);

    // onChange function
    const handleExpenseChange = (event) => {
        setNewExpense({ ...newexpense, [event.target.name]: event.target.value });
    };

    // Add Expense of the contact
    const handleAddExpense = async () => {
        try {
            await axios.post(`${baseUrl}/addexpense`, {
                Amount: newexpense.amount,
                Category: newexpense.category,
                Description: newexpense.description,
                contactId: contactId,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
            // Refresh the expense list
            await fetchExpenseList();
            setNewExpense({ "amount": 0, "category": "food", "description": "" });
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    // Remove Expense of the contact
    const handleRemoveExpense = async (expenseId) => {
        let confirm = window.confirm(`Remove this from this Expense list`);
        if (!confirm) return;
        try {
            await axios.post(`${baseUrl}/remove-expense`,
                {
                    expenseId: expenseId,
                    contactId: contactId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            // Refresh the expense list
            await fetchExpenseList();
        } catch (error) {
            console.error("Error removing expense:", error);
        }
    };

    //credit/debit
    const [transactionType, setTransactionType] = useState('debit');

    const handleTransactionTypeChange = (e) => {
        const type = e.target.value;
        setTransactionType(type);

        // Adjust the amount based on the selection
        handleExpenseChange({
            target: {
                name: 'amount',
                value: type === 'debit' ? -Math.abs(newexpense.amount) : Math.abs(newexpense.amount),
            },
        });
    };

    const handleAmountChange = (e) => {
        const amount = e.target.value;
        handleExpenseChange({
            target: {
                name: 'amount',
                value: transactionType === 'debit' ? -Math.abs(amount) : Math.abs(amount),
            },
        });
    };

    return (
        <>
            <div className="w-full lg:w-[60%] mt-4 space-y-4 mb-4 p-4 flex justify-center border border-gray-300 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200">
                <div className="text-2xl font-bold text-purple-800">
                    Total Expense : <span className={`text-2xl ${totalexpense < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        &#8377;{Math.abs(totalexpense)}
                    </span>
                </div>
            </div>

            <div className="w-full max-w-md flex flex-col items-center space-y-4 rounded-lg p-4 lg:max-w-lg xl:max-w-xl">

                <input
                    type="number"
                    value={Math.abs(newexpense.amount)}
                    id="amount"
                    name="amount"
                    placeholder="Amount"
                    onChange={handleAmountChange}
                    className="bg-white h-[50px] px-4 mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-800 hover:shadow-md"
                    required
                />
                <select
                    value={transactionType}
                    onChange={handleTransactionTypeChange}
                    className="bg-white h-[50px] px-4 mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-800 hover:shadow-md"
                >
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                </select>
                <input
                    type="text"
                    id="description"
                    value={newexpense.description}
                    name="description"
                    placeholder="Description"
                    onChange={handleExpenseChange}
                    className="bg-white h-[50px] px-4 mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-800 hover:shadow-md"
                />
                <select
                    value={newexpense.category}
                    name="category"
                    onChange={handleExpenseChange}
                    className="bg-white h-[50px] px-4 mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-800 hover:shadow-md"
                >
                    <option value="food">Food</option>
                    <option value="udhar">Udhar</option>
                    <option value="travel">Travel</option>
                    <option value="education">Education</option>
                    <option value="other">Others</option>
                </select>
                <button
                    onClick={handleAddExpense}
                    className="bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-400 transition duration-200 flex items-center justify-center hover:shadow-md"
                >
                    <span className="mr-2 text-2xl leading-none">+</span>
                    <span className="text-xl">Add Expense</span>
                </button>
            </div>

            <div className="w-full lg:w-[60%] mt-4 space-y-4 overflow-y-auto overflow-hidden hide-scrollbar">
                {oldexpenses.map((expense, index) => (
                    <div key={index} className="p-4 border border-gray-300 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div className="flex justify-between w-full">
                                <span className="text-lg font-semibold uppercase text-purple-800">{expense.Category}</span>
                                <span className={`text-lg font-semibold ${expense.Amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>&#8377; {Math.abs(expense.Amount)}</span>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
                            <div className="flex items-center">
                                <img src={dateSvg} alt="Date" className="w-6 h-6 fill-current mr-2" />
                                <span className="ml-2">{new Date(expense.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0">
                                <img src={messageSvg} alt="Message" className="w-6 h-6 fill-current mr-2" />
                                <span className="ml-2 capitalize">{expense.Description}</span>
                            </div>
                            <button onClick={() => handleRemoveExpense(expense._id)} className=" text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                                <img src={deleteSvg} alt="Delete" className="w-8 h-8" />
                            </button>
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
};
export default ContactDetails;