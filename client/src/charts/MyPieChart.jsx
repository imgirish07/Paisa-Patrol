// MyPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { aggregateExpensesByCategory } from './ChartFunctions';

// Register the necessary chart.js components
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const MyPieChart = ({ expenses }) => {
    const aggregatedData = aggregateExpensesByCategory(expenses);

    const labels = Object.keys(aggregatedData); // Categories
    const dataValues = Object.values(aggregatedData); // Amounts

    const data = {
        labels,
        datasets: [
            {
                label: 'Expenses by Category',
                data: dataValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', // Red
                    'rgba(54, 162, 235, 0.6)', // Blue
                    'rgba(255, 205, 86, 0.6)', // Yellow
                    'rgba(75, 192, 192, 0.6)', // Green
                    'rgba(153, 102, 255, 0.6)', // Purple
                    'rgba(255, 159, 64, 0.6)', // Orange
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', // Red
                    'rgba(54, 162, 235, 1)', // Blue
                    'rgba(255, 205, 86, 1)', // Yellow
                    'rgba(75, 192, 192, 1)', // Green
                    'rgba(153, 102, 255, 1)', // Purple
                    'rgba(255, 159, 64, 1)', // Orange
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Expenses by Category',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}`; // Display amount in tooltip
                    }
                }
            }
        }
    };

    return (
        <div className=" flex items-center justify-center ">
            <Pie data={data} options={options} />
        </div>
    );
};

export default MyPieChart;
