import React, { useEffect, useState } from 'react';
import dateSvg from '../assets/date.svg';
import messageSvg from '../assets/message.svg';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND;

function AddExpense() {
    const [expenses, setExpenses] = useState([]);
    const [oldexpenses, setOldExpenses] = useState([]);
    const [totalexpense, setTotalExpense] = useState(0);
    const [newexpense, setNewExpense] = useState({
        amount: 0,
        category: "food",
        description: "",
    });
    // Fetch Expense  
    const fetchExpenseList = async () => {
        try {
            const res = await axios.get(`${baseUrl}/user/expenses`, {
                withCredentials: true,
            });
            const userData = res.data;
            //console.log("User Data : ", userData);
            setExpenses(userData.expenses);
        } catch (error) {
            console.log("Error fetching expenses:", error);
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
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
            });
            // Refresh the expense list
            await fetchExpenseList();
            setNewExpense({ amount: 0, category: "food", description: "" });
        } catch (error) {
            console.error("Error adding expense:", error);
        }
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
                    value={newexpense.amount}
                    id="amount"
                    name="amount"
                    placeholder="Amount"
                    onChange={handleExpenseChange}
                    className="bg-white h-[50px] px-4 mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-800 hover:shadow-md"
                    required
                />
                <input
                    type="text"
                    id="description"
                    value={newexpense.description}
                    name="description"
                    placeholder="Description"
                    onChange={handleExpenseChange}
                    className="bg-white h-[50px] px-4 mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-800 hover:shadow-md"
                />
                <select value={newexpense.category} name="category" onChange={handleExpenseChange} className="bg-white h-[50px] px-4 mt-1 block w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-800 hover:shadow-md ">
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
                {oldexpenses.slice(0, 3).map((expense, index) => (
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
                        </div>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </>
    );
}

export default AddExpense;