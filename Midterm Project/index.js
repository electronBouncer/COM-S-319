document.getElementById('incomeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const incomeAmount = parseFloat(document.getElementById('incomeAmount').value);
    let totalIncome = parseFloat(document.getElementById('totalIncome').textContent.replace('$', ''));
    totalIncome += incomeAmount;
    document.getElementById('totalIncome').textContent = `$${totalIncome}`;
    updateIncomeChart(incomeAmount);
    this.reset();
});

document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
    let totalExpenses = parseFloat(document.getElementById('totalExpenses').textContent.replace('$', ''));
    totalExpenses += expenseAmount;
    document.getElementById('totalExpenses').textContent = `$${totalExpenses}`;
    updateExpenseChart(expenseAmount);
    this.reset();
});

// Chart.js configuration
const ctx1 = document.getElementById('expenseChart').getContext('2d');
const ctx2 = document.getElementById('incomeChart').getContext('2d');

let expenseChart = new Chart(ctx1, {
    type: 'pie',
    data: {
        labels: ['Expenses'],
        datasets: [{
            label: 'Expenses',
            data: [0],
            backgroundColor: ['#ff6384'],
        }]
    }
});

let incomeChart = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['Income'],
        datasets: [{
            label: 'Income',
            data: [0],
            backgroundColor: ['#36a2eb'],
        }]
    }
});

function updateExpenseChart(amount) {
    expenseChart.data.datasets[0].data[0] += amount;
    expenseChart.update();
}

function updateIncomeChart(amount) {
    incomeChart.data.datasets[0].data[0] += amount;
    incomeChart.update();
}
