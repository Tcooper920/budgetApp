const totalBudgetAmount = 100;
let listOfExpenses = [];
const addEntryButton = document.getElementsByClassName("add-entry");
let totalBudgetAmountContainer = document.getElementById("total-budget-amount");
const currentExpenseType = document.getElementsByClassName("expense-type")[0];
let listOfExpensesContainer = document.getElementById("list-of-expenses-container");

// Total Budget Amount Left
totalBudgetAmountContainer.innerText = `$${totalBudgetAmount}`;

// Spending Entry Object Constructor
function spendingEntry(entryName, entryAmount, entryType) {
    this.entryName = entryName;
    this.entryAmount = entryAmount;
    this.entryType = entryType;
}

// Submit an Expense Entry
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-entry")) {
        let currentExpenseName = document.getElementsByClassName("expense-name")[0].value;
        let currentExpenseAmount = document.getElementsByClassName("expense-amount")[0].value;
        let currentExpenseTypeValue = currentExpenseType.value;
        let newExpenseEntry = new spendingEntry(currentExpenseName, currentExpenseAmount, currentExpenseTypeValue);

        listOfExpenses.push(newExpenseEntry);    
        subtractFromTotalBudgetAmount();
        printExpensesToPage();
    }
});

// Function to calculate how much money is left in the budget and update the amount
const subtractFromTotalBudgetAmount = () => {
    let updatedBudgetAmount = totalBudgetAmount;
    for (let i = 0; i < listOfExpenses.length; i++) {
        updatedBudgetAmount = updatedBudgetAmount - listOfExpenses[i].entryAmount;
    }
    totalBudgetAmountContainer.innerText = `$${updatedBudgetAmount}`;
}

// Function to print expenses to the page
const printExpensesToPage = () => {
    listOfExpensesContainer.innerHTML = "";
    listOfExpenses.forEach(expenseItem => {
        listOfExpensesContainer.innerHTML += `
            <div class="container d-flex mt-3 bg-light">
                <p class="d-block m-2 w-100">Name: <span class="fw-bold">${expenseItem.entryName}</span></p>
                <p class="d-block m-2 w-100">Amount: <span class="fw-bold">$${expenseItem.entryAmount}</span></p>
                <p class="d-block m-2 w-100">Type: <span class="fw-bold">${expenseItem.entryType}</span></p>
                <button type="button" class="remove-btn btn fw-bolder text-secondary">&#10005;</button>
            </div>`
    });
}
