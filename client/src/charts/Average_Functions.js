
// Helper function to get week number
function getWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNumber;
}

// weekly average expense
export function calculateWeeklyAverage(expenses) {
    const weeklyTotals = {};

    expenses.forEach(expense => {
        const week = getWeekNumber(new Date(expense.createdAt));
        if (!weeklyTotals[week]) {
            weeklyTotals[week] = { totalAmount: 0, count: 0 };
        }
        weeklyTotals[week].totalAmount += expense.Amount;
        weeklyTotals[week].count++;
    });

    const weeklyAverages = Object.keys(weeklyTotals).map(week => ({
        week,
        average: weeklyTotals[week].totalAmount / weeklyTotals[week].count
    }));

    return weeklyAverages;
}

// daily average expense
export function calculateDailyAverage(expenses) {
    const dailyTotals = {};

    expenses.forEach(expense => {
        const day = new Date(expense.createdAt).toLocaleDateString();
        if (!dailyTotals[day]) {
            dailyTotals[day] = { totalAmount: 0, count: 0 };
        }
        dailyTotals[day].totalAmount += expense.Amount;
        dailyTotals[day].count++;
    });

    const dailyAverages = Object.keys(dailyTotals).map(day => ({
        day,
        average: dailyTotals[day].totalAmount / dailyTotals[day].count
    }));

    return dailyAverages;
}

// monthly average expense
export function calculateMonthlyAverage(expenses) {
    const monthlyTotals = {};

    expenses.forEach(expense => {
        const month = new Date(expense.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        if (!monthlyTotals[month]) {
            monthlyTotals[month] = { totalAmount: 0, count: 0 };
        }
        monthlyTotals[month].totalAmount += expense.Amount;
        monthlyTotals[month].count++;
    });

    const monthlyAverages = Object.keys(monthlyTotals).map(month => ({
        month,
        average: monthlyTotals[month].totalAmount / monthlyTotals[month].count
    }));

    return monthlyAverages;
}

