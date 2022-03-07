//console logs the budget array to see if the budget was saved!
function CheckIfTheBudgetWasSaved(){
    const userBudget = GetBudgetFromLocalStorage();
    console.log(JSON.stringify(userBudget));
}

function SaveBudgetToLocalStorage(userBudgetInput){ //1
    let userBudget = GetBudgetFromLocalStorage();
    userBudget.push(userBudgetInput);
    SaveToLocalStorageBudget(userBudget);
}

function SaveToLocalStorageBudget(userBudget){ //2
    localStorage.setItem('userBudget',JSON.stringify(userBudget));
}

function GetBudgetFromLocalStorage(){
    let localStorageBudgetData =  localStorage.getItem('userBudget');
    if(localStorageBudgetData == null){
        return [];
    }else{
        //However if there is data return that!
        return JSON.parse(localStorageBudgetData);
    }
}
//---------------------------------------------------------------

function CheckIfTheUserExpensesWereSaved(){
    const userExpenses = GetUserExpensesFromLocalStorage();
    console.log(JSON.stringify(userExpenses));
}

function SaveUserExpensesToLocalStorage(userInputVendor, userInputAmountSpent){
    let userExpenses = GetUserExpensesFromLocalStorage();
    userExpenses.push(userInputVendor); //I pushed the vendor first!
    userExpenses.push(userInputAmountSpent); //The amount spent is  the second thing I pushed!
    SaveVendorAndAmountSpentToLocalStorage(userExpenses);
}

function SaveVendorAndAmountSpentToLocalStorage(userExpenses){
    localStorage.setItem('userExpenses',JSON.stringify(userExpenses));

}

let localStorageUserExpenseData;
function GetUserExpensesFromLocalStorage(){
    let userExpenses = [];
    localStorageUserExpenseData = localStorage.getItem('userExpenses');
    localStorageUserExpenseData != null ? userExpenses = JSON.parse(localStorageUserExpenseData): userExpenses = [];
    return userExpenses;
}

function removeVendorAndExpenseFromLocalStorage(InputVendor, InputAmount){
    const userExpenses = GetUserExpensesFromLocalStorage();
    let Index = userExpenses.indexOf(InputVendor, InputAmount);
    userExpenses.splice(Index, 1);
    userExpenses.splice(Index, 1);
    SaveVendorAndAmountSpentToLocalStorage(userExpenses);
}

GetBudgetFromLocalStorage();
GetUserExpensesFromLocalStorage();

//when retrieving the numbers you have to parse them before you can use them!

export{SaveBudgetToLocalStorage, SaveToLocalStorageBudget, GetBudgetFromLocalStorage, CheckIfTheBudgetWasSaved, CheckIfTheUserExpensesWereSaved, SaveUserExpensesToLocalStorage, SaveVendorAndAmountSpentToLocalStorage, GetUserExpensesFromLocalStorage, removeVendorAndExpenseFromLocalStorage}



