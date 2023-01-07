import { SaveBudgetToLocalStorage, AddAnotherExpenseToLocalStorage, AddAnotherVendorToLocalStorage, RemoveExpenseFromLocalStorage, RemoveVendorFromLocalStorage, GetUserBudget, GetVendorsFromLocalStorage, GetUserExpensesFromLocalStorage } from './localStorage.js';

let EnterBudget = document.getElementById('EnterBudget');
let EnterExpense = document.getElementById('EnterExpense');
let EnterVendor = document.getElementById('EnterVendor')
let EnterBudgetBtn = document.getElementById('EnterBudgetBtn');
let EnterExpenseBtn = document.getElementById('EnterExpenseBtn');
let resetBtn = document.getElementById('resetBtn');

let injectHere = document.getElementById('injectHere');
let DisplayExpenses = document.getElementById('DisplayExpenses');
let BudgetDisplay = document.getElementById('BudgetDisplay');

//Connection to toast elements
let alertToast = document.getElementById('alert-toast');
let alertToastContent = document.getElementById('alert-toast-content');

let budget = GetUserBudget();
budget !== null ? EnterBudgetBtn.disabled = true : EnterBudgetBtn.disabled = false;

EnterBudgetBtn.addEventListener('click', function (e) {
    // console.log(EnterBudget.value);

    if (EnterBudget.value < 0 || EnterBudget.value === 0 || EnterBudget.value.length <= 0) {
        //alert toast pops out
        alertToastContent.textContent = "Enter a valid budget";
        setTimeout(() => {
            alertToast.classList.remove("show");
        }, 10000);
        alertToast.classList.add("show");
    } else {
        BudgetDisplay.textContent = "Balance: $" + EnterBudget.value;
        SaveBudgetToLocalStorage(EnterBudget.value);
        budget = GetUserBudget();
        // EnterBudgetBtn.classList.add("removeFromDOM");
        EnterBudgetBtn.disabled = true;
        EnterBudget.disabled = true;
    }
});

//this clears local storage and refreshes the page!
resetBtn.addEventListener('click', function () {
    localStorage.clear();
    window.location.reload();
    EnterBudgetBtn.disabled = false;
    EnterBudget.disabled = false;
});

function DisplayOverallExpenses() {
    let sum = 0;
    let allExpenses = GetUserExpensesFromLocalStorage();
    console.log(allExpenses);
    for (let i = 0; i < allExpenses.length; i++) {
        //convert all the strings to an int and pass them to another array!
        sum = parseInt(allExpenses[i]) + sum;
    }

    DisplayExpenses.textContent = "Expenses: $" + sum;
}

function CalculateRemainingBudget(userBudget, Expense) {
    //if you do not update the original budget, it will always subtract the original budget the user entered from the expense and will be bugged!
    let remainingBudget = parseInt(userBudget) - parseInt(Expense);
    BudgetDisplay.textContent = "Balance: $" + remainingBudget;
    console.log(remainingBudget);
    return remainingBudget;
}

function CalculateRemainingBudgetOnStart() {

    //take the original budget, subtract it from the sum of the expenses
    let userBudget = GetUserBudget();
    // budget = GetUserBudget(); GETTING THE BUDGET ON START MIGHT GET US CLOSE TO FIXING BUG!
    let culmulativeExpenses = GetUserExpensesFromLocalStorage();

    if (culmulativeExpenses.length > 0) {
        let expensesSum = 0;
        for (let i = 0; i < culmulativeExpenses.length; i++) {
            expensesSum = parseInt(culmulativeExpenses[i]) + expensesSum;
        }
        let remainingBudget = parseInt(userBudget) - expensesSum;
        BudgetDisplay.textContent = "Balance: $" + remainingBudget;
        return remainingBudget;
    } else if(userBudget != null) {
        //if a budget is declared but there are no expenses the budget remaining is the userBudget
        BudgetDisplay.textContent = "Balance: $" + userBudget;
    } else {
        //if a budget has yet to be declared just make it 0
        BudgetDisplay.textContent = "Balance: $" + "0";
    }
}


EnterExpenseBtn.addEventListener('click', function (e) {
    //Check if there is a valid budget before the expense is added!
    let checkBudget = GetUserBudget();
    if (checkBudget === null) {
        //if the budget is null that means there is not one!
        alertToastContent.textContent = "Enter a budget before adding expenses";
        setTimeout(() => {
            alertToast.classList.remove("show");
        }, 10000);
        alertToast.classList.add("show");
    }
    else if (EnterVendor.value.length <= 0) {
        alertToastContent.textContent = "Enter a valid vendor";
        setTimeout(() => {
            alertToast.classList.remove("show");
        }, 10000);
        alertToast.classList.add("show");
    }
    else if (EnterExpense.value < 0 || EnterExpense.value.length <= 0) {
        alertToastContent.textContent = "Enter a valid expense";
        setTimeout(() => {
            alertToast.classList.remove("show");
        }, 10000);
        alertToast.classList.add("show");
    } else {
        AddAnotherExpenseToLocalStorage(EnterExpense.value);
        AddAnotherVendorToLocalStorage(EnterVendor.value);
        CreateElement(EnterExpense.value, EnterVendor.value);
        budget = CalculateRemainingBudget(budget, EnterExpense.value);
        DisplayOverallExpenses();
    }
});



function CreateElement(Cost, Vendor) {
    let card = document.createElement('div');
    let cardBody = document.createElement('div');
    let cardRow = document.createElement('row');
    let Expense = document.createElement('div');
    let DeleteButton = document.createElement('button');

    card.id = Vendor;
    card.className = "card";
    cardBody.className = "card-body";

    cardRow.className = "d-flex justify-content-center"
    Expense.className = "col-6 mt-2"
    Expense.textContent = "$" + Cost + ", " + Vendor;
    DeleteButton.className = "col-2 btn btn-primary";
    DeleteButton.textContent = "X";

    cardRow.appendChild(Expense);
    cardRow.appendChild(DeleteButton);
    cardBody.appendChild(cardRow);
    card.appendChild(cardBody);
    injectHere.appendChild(card);

    DeleteButton.addEventListener('click', function (e) {
        //Remove both the cost and vendor from local storage!
        RemoveExpenseFromLocalStorage(Cost);
        RemoveVendorFromLocalStorage(Vendor);
        budget = CalculateReminbursementBudget(budget, Cost);
        console.log(budget);
        document.getElementById(Vendor).remove();
        //UPDATE THE OVERALL EXPENSES OF THE USER after deleting an object occurs!
        DisplayOverallExpenses();
    });
}




function CalculateReminbursementBudget(userBudget, reimbursement) {
    //what if the user does not enter a budget or amounts on refresh, you have to do the calculations from local storage
    // let usersBudgetLocalStorage = GetUserBudget();


    let remainingBudget = parseInt(userBudget) + parseInt(reimbursement);
    BudgetDisplay.textContent = "Balance: $" + remainingBudget;
    console.log(remainingBudget);
    return remainingBudget;
}



//get Local Storage when the application begins!
function CheckForLocalStorageDisplayIt() {
    // let userBudget = GetUserBudget();
    let vendors = GetVendorsFromLocalStorage();
    let userExpenses = GetUserExpensesFromLocalStorage();

    //I need a for loop that goes through both the vendors and userExpenses at the same time to create the elements when the page is refreshed!
    let j = 0;
    for (let i = 0; i < vendors.length; i++) {
        CreateElement(parseInt(userExpenses[i]), vendors[j]);
        j++;
    }

    DisplayOverallExpenses();

}

//resend the budget again to the like the user has to 

CheckForLocalStorageDisplayIt();
CalculateRemainingBudgetOnStart();
BudgetDisplay.className = "DisplayTxt";
DisplayExpenses.className = "DisplayTxt";