<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
  const incomeForm = document.getElementById("incomeForm");
  const expenseForm = document.getElementById("expenseForm");
  const savingsForm = document.getElementById("savingsForm");
  let incomes = [];
  let expenses = [];
  let savingsGoal = 0;
  let totalSavings = 0;

  incomeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("incomeAmount").value);
    const source = document.getElementById("incomeSource").value;
    incomes.push({ amount, source });
    totalSavings += amount;
    updateIncomeExpenseChart();
    updateSavingsChart();
    incomeForm.reset();
  });

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    const category = document.getElementById("expenseCategory").value;
    expenses.push({ amount, category });
    totalSavings -= amount;
    updateExpenseChart();
    updateIncomeExpenseChart();
    updateSavingsChart();
    expenseForm.reset();
  });

  savingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    savingsGoal = parseFloat(document.getElementById("savingsGoal").value);
    updateSavingsChart();
    savingsForm.reset();
  });

  const expenseChartCtx = document
    .getElementById("expenseChart")
    .getContext("2d");

  const savingsChartCtx = document
    .getElementById("savingsChart")
    .getContext("2d");

  const incomeExpenseChartCtx = document
    .getElementById("incomeExpenseChart")
    .getContext("2d");

  let expenseChart = new Chart(expenseChartCtx, {
    type: "pie",

    data: {
      labels: [],
      datasets: [
        {
          label: "Expenses",
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },

    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },

        title: {
          display: true,
          text: "Expenses by Category",
        },
      },
    },
  });

  let savingsChart = new Chart(savingsChartCtx, {
    type: "doughnut",

    data: {
      labels: ["Savings", "Remaining"],
      datasets: [
        {
          label: "Savings Progress",
          data: [0, 0],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },

    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Savings Progress",
        },
      },
    },
  });

  let incomeExpenseChart = new Chart(incomeExpenseChartCtx, {
    type: "bar",
    data: {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          label: "Amount",
          data: [0, 0],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },

    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,

          text: "Income vs Expenses",
        },
      },
    },
  });

  function updateExpenseChart() {
    const categories = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;

      return acc;
    }, {});

    expenseChart.data.labels = Object.keys(categories);
    expenseChart.data.datasets[0].data = Object.values(categories);
    expenseChart.update();
  }

  function updateSavingsChart() {
    const remaining = savingsGoal - totalSavings;
    savingsChart.data.datasets[0].data = [
      totalSavings,
      remaining > 0 ? remaining : 0,
    ];
    savingsChart.update();
  }

  function updateIncomeExpenseChart() {
    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    incomeExpenseChart.data.datasets[0].data = [totalIncome, totalExpenses];
    incomeExpenseChart.update();
  }
});
=======
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
>>>>>>> 71ad7e1dbe5fce6640ce7353bc520edd2dd2860c
