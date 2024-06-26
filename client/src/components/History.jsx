import React, { useState, useEffect } from 'react';
import dateSvg from '../assets/date.svg';
import messageSvg from '../assets/message.svg';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND;

function History() {
    const [expenses, setExpenses] = useState([]);
    const [oldexpenses, setOldExpenses] = useState([]);
    const [totalexpense, setTotalExpense] = useState(0);

    // Expense of a contact using ContactID 
    const fetchExpenseList = async () => {
        try {
            const res = await axios.get(`${baseUrl}/user/expenses`, {
                withCredentials: true,
            });
            const userData = res.data;
            setExpenses(userData.expenses);
        } catch (error) {
            console.log("Error fetching expenses:", error);
        }
    };
    useEffect(() => {
        fetchExpenseList();
    }, []);

    // use Effect to make the expense list reverse whenever expense is added
    useEffect(() => {
        if (expenses.length) {
            setTotalExpense(expenses.reduce((acc, expense) => acc + expense.Amount, 0));
            setOldExpenses([...expenses].reverse());
        }
    }, [expenses]);

    return (
        <>
            <div className="w-full lg:w-[60%] mt-4 space-y-4 mb-4 p-4 flex justify-center border border-gray-300 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200">
                <div className="text-2xl font-bold text-purple-800">
                    Total Expense : <span className={`text-2xl ${totalexpense < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        &#8377;{Math.abs(totalexpense)}
                    </span>
                </div>
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

export default History