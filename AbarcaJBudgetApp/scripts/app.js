//Jesse Abarca
//1/26/22
//Budget App
//Build a budget app on mobile to have data saved when refreshed, add and delete expenses, update amounts accordingly, track totals,
//create elements, and import and export for this challenge!
//Struggled with local storage and got stuck on that and removing elements for a long time for simple errors. I progressed further with help from Trent and Danial giving me help.


//pass objects such as the vendor and the expense into local storage instead of doing them separately!

//import what I need
import {SaveBudgetToLocalStorage, SaveToLocalStorageBudget, GetBudgetFromLocalStorage, CheckIfTheBudgetWasSaved, CheckIfTheUserExpensesWereSaved, SaveUserExpensesToLocalStorage, SaveVendorAndAmountSpentToLocalStorage, GetUserExpensesFromLocalStorage, removeVendorAndExpenseFromLocalStorage} from './localStorage.js';


//Access to the input fields
let inputBudget = document.getElementById('inputBudget');
let inputVendor = document.getElementById('inputVendor');
let inputAmountSpent = document.getElementById('inputAmountSpent');

//Access to the buttons!
let enterBudgetBtn = document.getElementById('enterBudgetBtn');
let enterVenderAmountSpentBtn = document.getElementById('enterVenderAmountSpentBtn');

//This is where I'll inject my elements!
let injectHere = document.getElementById('injectHere');
let Balance = document.getElementById('Balance');
let Expenses = document.getElementById('Expenses');


// deleteBtn.addEventListener('click', function(e){
//     document.getElementById(inputVendor.value).remove();
// });


enterBudgetBtn.addEventListener('click', function(e){
    if(inputBudget.value == null || inputBudget.value == undefined || inputBudget.value.length < 1){
        alert('Enter something in your budget!');

    }else if(inputBudget.value >= 2147483647){
        //If the input exceeds int 32
        alert('No way you have that much money!');
    }else if(inputBudget.value < 0){
        alert('Your initial budget cannot be negative!');
    }else if(inputBudget.value[0] == 0 ){
        alert('Enter a valid budget!');
    }
    else{
        //If the user leaves the field empty then...
        let inputedUserBudget = inputBudget.value;
        //Save the budget to local storage!
        SaveBudgetToLocalStorage(inputedUserBudget);
        CheckIfTheBudgetWasSaved();
        const budget = GetBudgetFromLocalStorage()
        Balance.textContent = '$' +budget[0];
    }
});

enterVenderAmountSpentBtn.addEventListener('click', function(e){
    //data validate the vendor
    let letters = /^[A-Za-z]+$/;

    //if the budget is not filled then do not run this code!!!
    

        if(inputVendor.value.match(letters)){
            //If the vendor value matches the letters then run this block of code!
            //Then check the amount spent!
            if(inputAmountSpent.value == null || inputAmountSpent.value == undefined || inputAmountSpent.value.length < 1){
                alert('Your amount inputed is empty!');
            }else if(inputAmountSpent.value >= 2147483647){
                alert('You exceeded int 32!');
            }else if(inputAmountSpent.value[0] == 0){
                alert('Enter a valid amount spent');
            }else if(inputAmountSpent.value < 0){
                alert('The amount you spent cannot be less than zero!')
            }else{
                //save both the amount spent and the vendor name!
                SaveUserExpensesToLocalStorage(inputVendor.value, inputAmountSpent.value);
                createElements(inputVendor.value, inputAmountSpent.value);

                //Access to both of the arrays!
                const budget = GetBudgetFromLocalStorage();
                const expenses = GetUserExpensesFromLocalStorage();

                let sumOfExpenses = 0;
                let counter = 1;
                let counter2 = 1;
                let balance = Number(budget[0]);
                for(let i = 1; i < expenses.length; i+=2){
                    sumOfExpenses += Number(expenses[counter]);
                }

                //for loop for the balance!
                for(let j = 1; j < expenses.length; j+=2){
                    balance = balance - Number(expenses[counter2]);
                    counter2+=2;
                }
                Expenses.textContent = '$'+sumOfExpenses;
                Balance.textContent = '$'+balance;
            }
        }else{
            alert('Your vendor has numbers or special characters in it!')
        }

    
});

function createElements(Vendor, AmountSpent){
    let outerMostRow = document.createElement('div');
    outerMostRow.className = "row justify-content-center mt-3";
    outerMostRow.id = inputVendor.value;
    let firstCol = document.createElement('div');
    firstCol.className = "col-2";

    let firstPTag = document.createElement('p');
    firstPTag.className = "createElementPtagTxt";
    firstPTag.textContent = Vendor; //Enter the vendor here!

    firstCol.appendChild(firstPTag);

    let thirdColEmpty = document.createElement('div');
    thirdColEmpty.className = "col-2 p-0";

    let fourthCol = document.createElement('div');
    fourthCol.className = "col-5 p-0";

    let fourthColPtagTxt = document.createElement('p');
    fourthColPtagTxt.className = "createElementPtagTxt";
    fourthColPtagTxt.textContent = "$" + AmountSpent; //Enter the amount of money spent here!

    fourthCol.appendChild(fourthColPtagTxt);

    let finalCol = document.createElement('div');
    finalCol.className = "col-1";

    let deleteBtn = document.createElement('button');
    deleteBtn.id = "deleteBtn"
    deleteBtn.className = "btn btn-danger pt-1 pb-1";
    deleteBtn.type = "button";
    deleteBtn.textContent = "X";

    finalCol.appendChild(deleteBtn);

    let hr = document.createElement('hr');
    hr.className = "horizontalLine";

    outerMostRow.appendChild(firstCol);
    outerMostRow.appendChild(thirdColEmpty);
    outerMostRow.appendChild(fourthCol);
    outerMostRow.appendChild(finalCol);
    injectHere.appendChild(outerMostRow);

    //create your event listener in the function!
    deleteBtn.addEventListener('click', function(e){
        //If you delete the vendor then...
        //Remove its element,
        document.getElementById('')
        const budget = GetBudgetFromLocalStorage();
        const expenses = GetUserExpensesFromLocalStorage();
        removeVendorAndExpenseFromLocalStorage(inputVendor.value, inputAmountSpent.value);
        let sumOfExpenses = 0;
        // let counter2 = 1;
        let balance = Number(budget[0]);
        balance = balance + inputAmountSpent.value;
        // for(let j = 1; j < expenses.length; j+=2){
        //     balance = balance - Number(expenses[counter2]);
        //     counter2+=2;
        // }
        Expenses.textContent = '$'+sumOfExpenses;
        Balance.textContent = '$'+balance;
        //Reimberse the budget
        //update the total expenses!
        document.getElementById(inputVendor.value).remove();
    });
}

GetBudgetFromLocalStorage();
GetUserExpensesFromLocalStorage();


// localStorage.clear();