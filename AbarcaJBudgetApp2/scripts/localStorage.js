
function SaveBudgetToLocalStorage(userBudget) {
    localStorage.setItem('userBudget', JSON.stringify(userBudget));
}

function GetUserBudget() {
    let userBudget = 0;
    const localStorageUserBudgetData = localStorage.getItem('userBudget');
    userBudget = JSON.parse(localStorageUserBudgetData);
    console.log(userBudget);
    return userBudget;
}

//---------------------------------------------------------
//three functions just for saving and adding user expenses
//get the user expenses
//check if their empty or not
//Add another expense then save it

function SaveUserExpenseToLocalStorage(userExpenses)
{
    localStorage.setItem('userExpense', JSON.stringify(userExpenses));
}

function GetUserExpensesFromLocalStorage()
{
    let userExpenses = [];
    let localStorageUserExpenses = localStorage.getItem('userExpense');
    localStorageUserExpenses != null ? userExpenses = JSON.parse(localStorageUserExpenses) : userExpenses = [];
    return userExpenses;
}

function AddAnotherExpenseToLocalStorage(anotherExpense)
{
    let userExpenses = GetUserExpensesFromLocalStorage();
    userExpenses.push(anotherExpense);
    SaveUserExpenseToLocalStorage(userExpenses);

}

function RemoveExpenseFromLocalStorage(ExpenseToBeRemoved){
   const userExpenses = GetUserExpensesFromLocalStorage();
   let Index = userExpenses.indexOf(ExpenseToBeRemoved);
   userExpenses.splice(Index, 1);
   SaveUserExpenseToLocalStorage(userExpenses);
}

//---------------------------------------------------------
function SaveVendorsToLocalStorage(vendors)
{
    localStorage.setItem('vendors', JSON.stringify(vendors));
}


function GetVendorsFromLocalStorage()
{
    let vendors = [];
    let localStorageVendors = localStorage.getItem('vendors');
    localStorageVendors != null ? vendors = JSON.parse(localStorageVendors) : vendors = [];
    return vendors;
}

function AddAnotherVendorToLocalStorage(anotherVendor)
{
    let vendors = GetVendorsFromLocalStorage();
    vendors.push(anotherVendor);
    SaveVendorsToLocalStorage(vendors);

}

function RemoveVendorFromLocalStorage(vendorToBeRemoved)
{
    const vendors = GetVendorsFromLocalStorage();
    let Index = vendors.indexOf(vendorToBeRemoved);
    vendors.splice(Index, 1);
    SaveVendorsToLocalStorage(vendors);
}



export { SaveBudgetToLocalStorage, AddAnotherExpenseToLocalStorage, AddAnotherVendorToLocalStorage, RemoveExpenseFromLocalStorage, RemoveVendorFromLocalStorage , GetUserExpensesFromLocalStorage, GetUserBudget, GetVendorsFromLocalStorage};