// function to make data for the bar chart
export const aggregateExpensesByDate = (expenses) => {
    const dateTotals = {};

    expenses.forEach(({ createdAt, Amount }) => {
        const date = new Date(createdAt).toLocaleDateString();
        if (dateTotals[date]) {
            dateTotals[date] += Amount;
        } else {
            dateTotals[date] = Amount;
        }
    });
    return dateTotals;
}

// function to make data for the pie chart using categories
// utils.js

export const aggregateExpensesByCategory = (expenses) => {
    const categoryTotals = {};

    expenses.forEach(({ Category, Amount }) => {
        if (categoryTotals[Category]) {
            categoryTotals[Category] += Amount;
        } else {
            categoryTotals[Category] = Amount;
        }
    });

    return categoryTotals;
};
