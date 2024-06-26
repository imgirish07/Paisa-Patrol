// AverageExpensesSummary.js

import React, { useEffect, useState } from 'react';
import { calculateDailyAverage, calculateWeeklyAverage, calculateMonthlyAverage } from '../charts/Average_Functions';

const AverageExpensesSummary = ({ expenses }) => {
    const [dailyAverage, setDailyAverage] = useState(null);
    const [weeklyAverage, setWeeklyAverage] = useState(null);
    const [monthlyAverage, setMonthlyAverage] = useState(null);

    useEffect(() => {
        if (expenses.length > 0) {
            const today = new Date();
            const currentDay = today.toLocaleDateString();
            const currentWeek = getWeekNumber(today);
            const currentMonth = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

            const dailyAverages = calculateDailyAverage(expenses);
            const weeklyAverages = calculateWeeklyAverage(expenses);
            const monthlyAverages = calculateMonthlyAverage(expenses);

            const todayAverage = dailyAverages.find(day => day.day === currentDay);
            const weekAverage = weeklyAverages.find(week => week.week === currentWeek.toString());
            const monthAverage = monthlyAverages.find(month => month.month === currentMonth);

            setDailyAverage(todayAverage ? todayAverage.average.toFixed(2) : 0);
            setWeeklyAverage(weekAverage ? weekAverage.average.toFixed(2) : 0);
            setMonthlyAverage(monthAverage ? monthAverage.average.toFixed(2) : 0);
        }
    }, [expenses]);

    function getWeekNumber(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));
        const yearStart = new Date(d.getFullYear(), 0, 1);
        const weekNumber = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNumber;
    }

    return (
        <>
            <div className='text-xl text-center'>
                <h1 className='text-purple-800 text-3xl font-bold mb-6'>Statistics</h1>
                <div className='flex flex-col justify-center items-center gap-4'>
                    <div className='bg-gray-50 w-[80%] flex items-center justify-center rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
                        <h2 className='text-lg font-semibold'>Daily Average Expense = ₹ <span className={`text-xl font-bold ${dailyAverage >= 0 ? 'text-green-600' : 'text-red-600'}`}>{dailyAverage ? dailyAverage : '0.00'}</span></h2>
                    </div>
                    <div className='bg-gray-50 w-[80%] flex items-center justify-center rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
                        <h2 className='text-lg font-semibold'>Weekly Average Expense = ₹ <span className={`text-xl font-bold ${weeklyAverage >= 0 ? 'text-green-600' : 'text-red-600'}`}>{weeklyAverage ? weeklyAverage : '0.00'}</span></h2>
                    </div>
                    <div className='bg-gray-50 w-[80%] flex items-center justify-center rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300'>
                        <h2 className='text-lg font-semibold'>Monthly Average Expense = ₹ <span className={`text-xl font-bold ${monthlyAverage >= 0 ? 'text-green-600' : 'text-red-600'}`}>{monthlyAverage ? monthlyAverage : '0.00'}</span></h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AverageExpensesSummary;
