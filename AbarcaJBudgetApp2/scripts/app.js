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
budget !== null ? EnterBudget.disabled = true : EnterBudget.disabled = false;

EnterBudgetBtn.addEventListener('click', function (e) {
    // console.log(EnterBudget.value);
    let roundedBudget = Math.round(EnterBudget.value * 100) / 100;
    if (EnterBudget.value < 0 || EnterBudget.value === 0 || EnterBudget.value.length <= 0) {
        //alert toast pops out
        alertToastContent.textContent = "Enter a valid budget";
        setTimeout(() => {
            alertToast.classList.remove("show");
        }, 10000);
        alertToast.classList.add("show");
    } else if (EnterBudget.value.length > 9) {
        alertToastContent.textContent = "Enter a valid budget less than 9 digits";
        setTimeout(() => {
            alertToast.classList.remove("show");
        }, 10000);
        alertToast.classList.add("show");
    } else {
        BudgetDisplay.textContent = "Balance: $" + roundedBudget.toFixed(2);
        SaveBudgetToLocalStorage(roundedBudget.toString()); //Adding values to local storage need to be a string!
        budget = GetUserBudget();
        EnterBudgetBtn.disabled = true;
        EnterBudget.disabled = true;

    }
});

EnterExpenseBtn.addEventListener('click', function (e) {
    //Check if there is a valid budget before the expense is added!
    let checkBudget = GetUserBudget();
    let roundedExpense = Math.round(EnterExpense.value * 100) / 100;
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
    } else if (EnterExpense.value.length > 9) {
        alertToastContent.textContent = "Enter a valid budget less than 9 digits";;
        setTimeout(() => {
            alertToast.classList.remove("show");
        }, 10000);
        alertToast.classList.add("show");
    } else {
        AddAnotherExpenseToLocalStorage(roundedExpense.toString()); //Adding values to local storage need to be a string!
        AddAnotherVendorToLocalStorage(EnterVendor.value);
        CreateElement(roundedExpense.toString(), EnterVendor.value);
        budget = CalculateRemainingBudget(budget, roundedExpense);
        DisplayOverallExpenses();

        //After the Expense and vendor is added clear it!
        EnterExpense.value = "";
        EnterVendor.value = "";
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
        sum = Number(allExpenses[i]) + sum;
    }

    DisplayExpenses.textContent = "Expenses: $" + sum.toFixed(2);
}

function CalculateRemainingBudget(userBudget, Expense) {
    //if you do not update the original budget, it will always subtract the original budget the user entered from the expense and will be bugged!
    let remainingBudget = Math.round((Number(userBudget) - Expense) * 100) / 100;
    BudgetDisplay.textContent = "Balance: $" + remainingBudget.toFixed(2);
    console.log(remainingBudget);
    return remainingBudget;
}

function CalculateRemainingBudgetOnStart() {
    //take the original budget, subtract it from the sum of the expenses
    budget = GetUserBudget();
    // budget = GetUserBudget(); GETTING THE BUDGET ON START MIGHT GET US CLOSE TO FIXING BUG!
    let culmulativeExpenses = GetUserExpensesFromLocalStorage();
    console.log(culmulativeExpenses);
    if (culmulativeExpenses.length > 0) {
        let expensesSum = 0;
        for (let i = 0; i < culmulativeExpenses.length; i++) {
            expensesSum += Number(culmulativeExpenses[i]);
        }
        let remainingBudget = Number(budget) - expensesSum;
        BudgetDisplay.textContent = "Balance: $" + remainingBudget.toFixed(2);
        budget = remainingBudget;
        return remainingBudget;
    } else if (budget != null) {
        //if a budget is declared but there are no expenses the budget remaining is the userBudget
        BudgetDisplay.textContent = "Balance: $" + Number(budget).toFixed(2);
    } else {
        //if a budget has yet to be declared just make it 0
        BudgetDisplay.textContent = "Balance: $" + "0.00";
    }
}


function CreateElement(Cost, Vendor) {
    let card = document.createElement('div');
    let cardBody = document.createElement('div');
    let cardRow = document.createElement('row');
    let Expense = document.createElement('div');
    let DeleteButton = document.createElement('button');

    card.id = Vendor + Cost;
    card.className = "card";
    cardBody.className = "card-body";

    cardRow.className = "d-flex justify-content-center"
    Expense.className = "col-6 mt-2"
    Expense.textContent = "$" + Number(Cost).toFixed(2) + " | " + Vendor;
    DeleteButton.className = "col-2 btn btn-primary";
    DeleteButton.innerHTML = "<img src=\"../images/delete.png\" width=\"28px\" height=\"29px\" alt=\"remove expense garbage can icon\">";

    cardRow.appendChild(Expense);
    cardRow.appendChild(DeleteButton);
    cardBody.appendChild(cardRow);
    card.appendChild(cardBody);
    injectHere.appendChild(card);

    DeleteButton.addEventListener('click', function (e) {
        //Remove both the cost and vendor from local storage!
        let tempExpenses = GetUserExpensesFromLocalStorage();
        let totalExpenses = 0;
        let currentBal = 0;
        let firstTimeRun = false;
        console.log(Cost);
        //check if the page was refreshed, if it was the input field is an empty string!
        //should only run for the first value once
        if (EnterBudget.value === "" && firstTimeRun === false) {
            //page was refreshed
            let OverallBudget = GetUserBudget();
            console.log(OverallBudget);

            //get the total expenses
            for (let i = 0; i < tempExpenses.length; i++) {
                totalExpenses += Number(tempExpenses[i]);
            }
            currentBal = (Number(OverallBudget) - totalExpenses) + Cost;
            console.log(currentBal);
            BudgetDisplay.textContent = "Balance: $" + Number(currentBal).toFixed(2);
            firstTimeRun = true;
        } else {
            //page was not refreshed
            //budget is a number, Cost is a string
            budget = CalculateReminbursementBudget(budget, Cost);
        }
        RemoveExpenseFromLocalStorage(Cost.toString());
        RemoveVendorFromLocalStorage(Vendor);
        //To determine which element is removed from the DOM it uses the name of the vendor, but in case the vendors are the same name the computer has trouble determining which element to remove from the DOM
        document.getElementById(Vendor + Cost).remove();
        //UPDATE THE OVERALL EXPENSES OF THE USER after deleting an object occurs!
        DisplayOverallExpenses();
    });
}




function CalculateReminbursementBudget(userBudget, reimbursement) {
    //what if the user does not enter a budget or amounts on refresh, you have to do the calculations from local storage
    // let usersBudgetLocalStorage = GetUserBudget();

    let remainingBudget = userBudget + Number(reimbursement);
    BudgetDisplay.textContent = "Balance: $" + remainingBudget.toFixed(2);
    console.log(remainingBudget);
    return remainingBudget;
}



//get Local Storage when the application begins!
function CheckForLocalStorageDisplayIt() {
    let vendors = GetVendorsFromLocalStorage();
    let userExpenses = GetUserExpensesFromLocalStorage();

    //I need a for loop that goes through both the vendors and userExpenses at the same time to create the elements when the page is refreshed!
    let j = 0;
    for (let i = 0; i < vendors.length; i++) {
        CreateElement(Number(userExpenses[i]), vendors[j]);
        j++;
    }

    DisplayOverallExpenses();

}


//resend the budget again to the like the user has to 

CheckForLocalStorageDisplayIt();
CalculateRemainingBudgetOnStart();
BudgetDisplay.className = "DisplayTxt";
DisplayExpenses.className = "DisplayTxt";