document.addEventListener("DOMContentLoaded", () => {
  const incomeForm = document.getElementById("incomeForm");
  const expenseForm = document.getElementById("expenseForm");

  if (incomeForm) {
    incomeForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const incomeAmount = parseFloat(
        document.getElementById("incomeAmount").value
      );
      let totalIncome = parseFloat(
        document.getElementById("totalIncome").textContent.replace("$", "")
      );
      totalIncome += incomeAmount;
      document.getElementById("totalIncome").textContent = `$${totalIncome}`;
      updateIncomeChart(incomeAmount);

      await sendDataToServer({ type: "income", amount: incomeAmount });

      event.target.reset();
    });

    const ctx2 = document.getElementById("incomeChart").getContext("2d");
    let incomeChart = new Chart(ctx2, {
      type: "pie",
      data: {
        labels: ["Income"],
        datasets: [
          {
            data: [0],
            backgroundColor: ["#36a2eb"],
          },
        ],
      },
    });

    window.updateIncomeChart = (amount) => {
      incomeChart.data.datasets[0].data[0] += amount;
      incomeChart.update();
    };
  }

  if (expenseForm) {
    expenseForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const expenseAmount = parseFloat(
        document.getElementById("expenseAmount").value
      );
      let totalExpenses = parseFloat(
        document.getElementById("totalExpenses").textContent.replace("$", "")
      );
      totalExpenses += expenseAmount;
      document.getElementById(
        "totalExpenses"
      ).textContent = `$${totalExpenses}`;

      // Subtract expense from total income
      let totalIncome = parseFloat(
        document.getElementById("totalIncome").textContent.replace("$", "")
      );
      totalIncome -= expenseAmount;
      document.getElementById("totalIncome").textContent = `$${totalIncome}`;

      updateExpenseChart(expenseAmount);

      await sendDataToServer({ type: "expense", amount: expenseAmount });

      event.target.reset();
    });

    const ctx1 = document.getElementById("expenseChart").getContext("2d");
    let expenseChart = new Chart(ctx1, {
      type: "pie",
      data: {
        labels: ["Expenses"],
        datasets: [
          {
            data: [0],
            backgroundColor: ["#ff6384"],
          },
        ],
      },
    });

    window.updateExpenseChart = (amount) => {
      expenseChart.data.datasets[0].data[0] += amount;
      expenseChart.update();
    };
  }
});

// Function to simulate sending data to server
async function sendDataToServer(data) {
  try {
    const response = await fetch("https://example.com/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

// income entries
document.addEventListener('DOMContentLoaded', () => {
  const incomeForm = document.getElementById('incomeForm');
  const totalIncomeElement = document.getElementById('totalIncome');
  const userSelect = document.getElementById('userSelect');

  // Load user data from local storage
  function loadUserData(user) {
      let totalIncome = parseFloat(localStorage.getItem(`${user}_totalIncome`)) || 0;
      totalIncomeElement.textContent = `$${totalIncome}`;
  }

  // Function to store individual income entries
  function storeIncomeEntry(user, amount, memo) {
      let incomeEntries = JSON.parse(localStorage.getItem(`${user}_incomeEntries`)) || [];
      incomeEntries.push({ amount, memo, date: new Date().toLocaleString() });
      localStorage.setItem(`${user}_incomeEntries`, JSON.stringify(incomeEntries));
  }

  // Event listener for user selection
  userSelect.addEventListener('change', (event) => {
      loadUserData(event.target.value);
  });

  // Initial load for the default user
  loadUserData(userSelect.value);

  incomeForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const incomeAmount = parseFloat(document.getElementById('incomeAmount').value);
      const incomeMemo = document.getElementById('incomeMemo').value || "No memo";
      let totalIncome = parseFloat(localStorage.getItem(`${userSelect.value}_totalIncome`)) || 0;
      totalIncome += incomeAmount;
      totalIncomeElement.textContent = `$${totalIncome}`;
      localStorage.setItem(`${userSelect.value}_totalIncome`, totalIncome);

      // Store the individual income entry with the memo
      storeIncomeEntry(userSelect.value, incomeAmount, incomeMemo);

      event.target.reset();
  });
});


// expense entries
document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expenseForm');
  const totalExpensesElement = document.getElementById('totalExpenses');
  const userSelect = document.getElementById('userSelect');

  // Load user data from local storage
  function loadUserData(user) {
      let totalExpenses = parseFloat(localStorage.getItem(`${user}_totalExpenses`)) || 0;
      totalExpensesElement.textContent = `$${totalExpenses}`;
  }

  // Function to store individual expense entries
  function storeExpenseEntry(user, amount, memo) {
      let expenseEntries = JSON.parse(localStorage.getItem(`${user}_expenseEntries`)) || [];
      expenseEntries.push({ amount, memo, date: new Date().toLocaleString() });
      localStorage.setItem(`${user}_expenseEntries`, JSON.stringify(expenseEntries));
  }

  // Event listener for user selection
  userSelect.addEventListener('change', (event) => {
      loadUserData(event.target.value);
  });

  // Initial load for the default user
  loadUserData(userSelect.value);

  expenseForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
      const expenseMemo = document.getElementById('expenseMemo').value || "No memo";
      let totalExpenses = parseFloat(localStorage.getItem(`${userSelect.value}_totalExpenses`)) || 0;
      totalExpenses += expenseAmount;
      totalExpensesElement.textContent = `$${totalExpenses}`;
      localStorage.setItem(`${userSelect.value}_totalExpenses`, totalExpenses);

      // Store the individual expense entry with the memo
      storeExpenseEntry(userSelect.value, expenseAmount, expenseMemo);

      event.target.reset();
  });
});


// retrieve entries for charting
function getIncomeEntries(user) {
  return JSON.parse(localStorage.getItem(`${user}_incomeEntries`)) || [];
}

function getExpenseEntries(user) {
  return JSON.parse(localStorage.getItem(`${user}_expenseEntries`)) || [];
}

// Example of retrieving entries for a chart
const incomeEntries = getIncomeEntries('user1');
const expenseEntries = getExpenseEntries('user1');


// display income entries

document.addEventListener('DOMContentLoaded', () => {
    const incomeForm = document.getElementById('incomeForm');
    const totalIncomeElement = document.getElementById('totalIncome');
    const incomeEntriesList = document.getElementById('incomeEntriesList');
    const userSelect = document.getElementById('userSelect');

    // Load user data from local storage
    function loadUserData(user) {
        const incomeEntries = JSON.parse(localStorage.getItem(`${user}_incomeEntries`)) || [];
        let totalIncome = incomeEntries.reduce((sum, entry) => sum + entry.amount, 0);
        totalIncomeElement.textContent = `$${totalIncome}`;
        displayIncomeEntries(incomeEntries);
    }

    // Display income entries
    function displayIncomeEntries(entries) {
        incomeEntriesList.innerHTML = '';
        entries.forEach((entry, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.textContent = `$${entry.amount} - ${entry.date}`;

            // Create a delete button for each entry
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm';
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteIncomeEntry(index));

            listItem.appendChild(deleteBtn);
            incomeEntriesList.appendChild(listItem);
        });
    }

    // Delete an income entry
    function deleteIncomeEntry(index) {
        const incomeEntries = JSON.parse(localStorage.getItem(`${userSelect.value}_incomeEntries`)) || [];
        incomeEntries.splice(index, 1);
        localStorage.setItem(`${userSelect.value}_incomeEntries`, JSON.stringify(incomeEntries));
        loadUserData(userSelect.value);
    }

    // Event listener for user selection
    userSelect.addEventListener('change', () => {
        loadUserData(userSelect.value);
    });

    // Initial load for the default user
    loadUserData(userSelect.value);

    incomeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const incomeAmount = parseFloat(document.getElementById('incomeAmount').value);
        const incomeEntry = {
            amount: incomeAmount,
            date: new Date().toLocaleString()
        };
        let incomeEntries = JSON.parse(localStorage.getItem(`${userSelect.value}_incomeEntries`)) || [];
        incomeEntries.push(incomeEntry);
        localStorage.setItem(`${userSelect.value}_incomeEntries`, JSON.stringify(incomeEntries));
        loadUserData(userSelect.value);
        event.target.reset();
    });
});


// display expense entries

document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expenseForm');
  const totalExpensesElement = document.getElementById('totalExpenses');
  const expenseEntriesList = document.getElementById('expenseEntriesList');
  const userSelect = document.getElementById('userSelect');

  function loadUserData(user) {
      const expenseEntries = JSON.parse(localStorage.getItem(`${user}_expenseEntries`)) || [];
      let totalExpenses = expenseEntries.reduce((sum, entry) => sum + entry.amount, 0);
      totalExpensesElement.textContent = `$${totalExpenses}`;
      displayExpenseEntries(expenseEntries);
  }

  function displayExpenseEntries(entries) {
      expenseEntriesList.innerHTML = '';
      entries.forEach((entry, index) => {
          const listItem = document.createElement('li');
          listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
          listItem.textContent = `$${entry.amount} - ${entry.date}`;

          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'btn btn-danger btn-sm';
          deleteBtn.textContent = 'Delete';
          deleteBtn.addEventListener('click', () => deleteExpenseEntry(index));

          listItem.appendChild(deleteBtn);
          expenseEntriesList.appendChild(listItem);
      });
  }

  function deleteExpenseEntry(index) {
      const expenseEntries = JSON.parse(localStorage.getItem(`${userSelect.value}_expenseEntries`)) || [];
      expenseEntries.splice(index, 1);
      localStorage.setItem(`${userSelect.value}_expenseEntries`, JSON.stringify(expenseEntries));
      loadUserData(userSelect.value);
  }

  userSelect.addEventListener('change', () => {
      loadUserData(userSelect.value);
  });

  loadUserData(userSelect.value);

  expenseForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
      const expenseEntry = {
          amount: expenseAmount,
          date: new Date().toLocaleString()
      };
      let expenseEntries = JSON.parse(localStorage.getItem(`${userSelect.value}_expenseEntries`)) || [];
      expenseEntries.push(expenseEntry);
      localStorage.setItem(`${userSelect.value}_expenseEntries`, JSON.stringify(expenseEntries));
      loadUserData(userSelect.value);
      event.target.reset();
  });
});
