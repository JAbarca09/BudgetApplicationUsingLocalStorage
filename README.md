# BudgetApplicationUsingLocalStorage
This is a budget mobile web application using JavaScript Local storage.

## Bugs To Be Fixed
* Place a limit to the number of digits a user can input for both expenses and budgets!
    * Check the length of the string before sending it to local storage (maxlength) does not work on type number input fields
* Users can enter invalid expenses and budget dollar amounts: $002333 is not a valid dollar amount
    * Write a function that checks if the dollar value provided is valid!
    * Also consider decimal values: $123.23
        * Point of reference: https://stackoverflow.com/questions/2227370/currency-validation