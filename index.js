let totalBudgetAmount = 0;
let totalBudgetAmountSubmittedField = document.getElementById("budget-amount-field");
let listOfExpenses = [];
const addEntryButton = document.getElementsByClassName("add-entry");
let totalBudgetAmountContainer = document.getElementById("total-budget-amount");
const currentExpenseType = document.getElementsByClassName("expense-type")[0];
let listOfExpensesContainer = document.getElementById("list-of-expenses-container");

// Function to display total budget amount left
function displayAmountLeftToBudgetWith(totalBudgetAmount) {
    totalBudgetAmount = Number(totalBudgetAmount).toFixed(2); // Convert to number and round
    totalBudgetAmountContainer.innerText = `$${totalBudgetAmount} Remaining to budget with.`;
}

displayAmountLeftToBudgetWith(totalBudgetAmount);

// User submits budget amount into the field
totalBudgetAmountSubmittedField.addEventListener("input", () => {
    let totalBudgetAmountSubmittedFieldValue = totalBudgetAmountSubmittedField.value;

    totalBudgetAmount = totalBudgetAmountSubmittedFieldValue.replace(/,/g,'');
    displayAmountLeftToBudgetWith(totalBudgetAmount);
    subtractFromTotalBudgetAmount();
    printExpensesToPage();
    calculateSpendingPercentages();
});

// Expense Entry Object Constructor
function SpendingEntry(entryName, entryAmount, entryType) {
    this.entryName = entryName;
    this.entryAmount = entryAmount;
    this.entryType = entryType;
}

// Submit an Expense Entry
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-entry")) {
        let currentExpenseName = document.getElementsByClassName("expense-name")[0].value;
        let currentExpenseAmount = document.getElementsByClassName("expense-amount")[0].value;
        currentExpenseAmount = Number(currentExpenseAmount); // Convert string to number
        let currentExpenseTypeValue = currentExpenseType.value;
        let newExpenseEntry = new SpendingEntry(currentExpenseName, currentExpenseAmount, currentExpenseTypeValue);

        listOfExpenses.push(newExpenseEntry);    
        subtractFromTotalBudgetAmount();
        printExpensesToPage();
        calculateSpendingPercentages();
    }
});

// Function to calculate how much money is left in the budget and update the amount
const subtractFromTotalBudgetAmount = () => {
    let updatedBudgetAmount = totalBudgetAmount;
    for (let i = 0; i < listOfExpenses.length; i++) {
        updatedBudgetAmount = updatedBudgetAmount - listOfExpenses[i].entryAmount;
    }
    displayAmountLeftToBudgetWith(updatedBudgetAmount);
    
    // If amount left to budget is a negative number (over spending limit) then...
    if (Math.sign(updatedBudgetAmount) == "-1") {
        totalBudgetAmountContainer.classList.add("red");
    } else {
        totalBudgetAmountContainer.classList.remove("red");
    }
}

// Function to print expenses to the page
const printExpensesToPage = () => {
    listOfExpensesContainer.innerHTML = "";
    listOfExpenses.forEach(expenseItem => {
        listOfExpensesContainer.innerHTML += `
            <div class="container d-flex mt-3 bg-light rounded dark-blue">
                <p class="d-block m-2 w-100">Name: <span class="fw-bold">${expenseItem.entryName}</span></p>
                <p class="d-block m-2 w-100">Amount: <span class="fw-bold">$${expenseItem.entryAmount}</span></p>
                <p class="d-block m-2 w-100">Type: <span class="fw-bold">${expenseItem.entryType}</span></p>
                <button type="button" class="remove-btn btn fw-bolder text-secondary">&#10005;</button>
            </div>`
    });
}

// Remove an expense entry
const removeExpenseEntry = () => {
    let numberOfRemoveButtons = document.getElementsByClassName("remove-btn");

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            for (let i = 0; i < numberOfRemoveButtons.length; i++) {
                if (e.target === numberOfRemoveButtons[i]) {
                    listOfExpenses.splice(i, 1);
                    subtractFromTotalBudgetAmount();
                    printExpensesToPage();
                    calculateSpendingPercentages();
                } 
            }
        }
    });
}

removeExpenseEntry();

// Calculate percentages for spending bar graph
const fixedSpendingProgressBar = document.getElementById("fixed-spending-progress-bar");
const debtSpendingProgressBar = document.getElementById("debt-spending-progress-bar");
const savingsSpendingProgressBar = document.getElementById("savings-spending-progress-bar");
const funSpendingProgressBar = document.getElementById("fun-spending-progress-bar");
const otherSpendingProgressBar = document.getElementById("other-spending-progress-bar");

const calculateSpendingPercentages = () => {
    resetBarGraph();
    let totalFixedSpendingAmount = 0;
    let fixedSpendingPercentage = 0;
    let totalDebtSpendingAmount = 0;
    let debtSpendingPercentage = 0;
    let totalSavingsSpendingAmount = 0;
    let savingsSpendingPercentage = 0;
    let totalFunSpendingAmount = 0;
    let funSpendingPercentage = 0;
    let totalOtherSpendingAmount = 0;
    let otherSpendingPercentage = 0;

    for (let i = 0; i < listOfExpenses.length; i++) {
        if (listOfExpenses[i].entryType == "Fixed") {
            totalFixedSpendingAmount += listOfExpenses[i].entryAmount;
        }
        fixedSpendingPercentage = calculatePercentage(totalFixedSpendingAmount);
        fixedSpendingProgressBar.style.width = `${fixedSpendingPercentage}%`;
        
        if (listOfExpenses[i].entryType == "Debt") {
            totalDebtSpendingAmount += listOfExpenses[i].entryAmount;
        }
        debtSpendingPercentage = calculatePercentage(totalDebtSpendingAmount);
        debtSpendingProgressBar.style.width = `${debtSpendingPercentage}%`;

        if (listOfExpenses[i].entryType == "Savings") {
            totalSavingsSpendingAmount += listOfExpenses[i].entryAmount;
        }
        savingsSpendingPercentage = calculatePercentage(totalSavingsSpendingAmount);
        savingsSpendingProgressBar.style.width = `${savingsSpendingPercentage}%`;

        if (listOfExpenses[i].entryType == "Fun") {
            totalFunSpendingAmount += listOfExpenses[i].entryAmount;
        }
        funSpendingPercentage = calculatePercentage(totalFunSpendingAmount);
        funSpendingProgressBar.style.width = `${funSpendingPercentage}%`;

        if (listOfExpenses[i].entryType == "Other") {
            totalOtherSpendingAmount += listOfExpenses[i].entryAmount;
        }
        otherSpendingPercentage = calculatePercentage(totalOtherSpendingAmount);
        otherSpendingProgressBar.style.width = `${otherSpendingPercentage}%`;
    }
}

// Function to reset spending bar graph values back to "0%"
function resetBarGraph () {
    fixedSpendingProgressBar.style.width = "0%";
    debtSpendingProgressBar.style.width = "0%";
    savingsSpendingProgressBar.style.width = "0%";
    funSpendingProgressBar.style.width = "0%"
    otherSpendingProgressBar.style.width = "0%";
}

// Function to calculate percentage of spending out of total budget amount (equation)
function calculatePercentage(totalEntrySpendingAmount) {
    return ((totalEntrySpendingAmount/totalBudgetAmount)*100);
}