// DashContent.js
import React, { useState, useEffect } from 'react';
import Mycharts from '../charts/Mycharts';
import MyPieChart from '../charts/MyPieChart';
import AverageExpensesSummary from '../charts/AverageExpensesSummary';

import axios from 'axios';
const baseUrl = 'http://localhost:8000';

function DashContent() {
    const [expenses, setExpenses] = useState([]);
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

    return (
        <>
            <div className='h-full w-full'>
                {/* Dashboard Title */}
                <div className='flex justify-center'>
                    <div className="text-2xl font-bold text-purple-800 w-full lg:w-3/5 mt-4 mb-4 p-4 flex justify-center border border-gray-300 rounded-lg sm:rounded-3xl shadow-md hover:shadow-lg transition duration-200">
                        Dashboard
                    </div>
                </div>

                {/* Charts Container */}
                <div className='w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>

                    {/* Bar Chart and Stats */}
                    <div className='w-full md:w-1/2 flex flex-col space-y-4'>
                        <div className='h-1/2 md:h-full border border-gray-300 rounded-3xl shadow-md hover:shadow-lg transition duration-200 bg-gray-100 flex-1'>
                            <Mycharts expenses={expenses} />
                        </div>

                        <div className='h-1/2 md:h-full border border-gray-300 rounded-3xl shadow-md hover:shadow-lg transition duration-200 bg-gray-100 flex-1'>
                            <AverageExpensesSummary expenses={expenses} />
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className='w-full md:w-1/2 border border-gray-300 rounded-3xl shadow-md hover:shadow-lg transition duration-200 bg-gray-100 h-1/2 md:h-full'>
                        <MyPieChart expenses={expenses} />
                    </div>
                </div>
            </div>


        </>
    );
}

export default DashContent;
