import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { aggregateExpensesByDate } from './ChartFunctions';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function Mycharts({ expenses }) {
    const aggregatedData = aggregateExpensesByDate(expenses);

    const labels = Object.keys(aggregatedData); // Dates
    const dataValues = Object.values(aggregatedData); // Amounts

    const backgroundColors = dataValues.map(value => value >= 0 ? 'rgba(11, 255, 64, 0.3)' : 'rgba(255, 0, 0, 0.3)');
    const borderColors = dataValues.map(value => value >= 0 ? 'rgba(11, 255, 64, 1)' : 'rgba(255, 0, 0, 1)');

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Amount',
                data: dataValues.map(amount => Math.abs(amount)),
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Expenses by Date',
            },
        },
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount',
                },
            },
        },
    };

    return (
        <Bar data={data} options={options} />
    )
}

export default Mycharts;