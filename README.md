# BudgetApplicationUsingLocalStorage
This is a budget mobile web application using JavaScript Local storage.

## Bugs To Be Fixed
* Users can enter invalid expenses and budget dollar amounts: $002333 is not a valid dollar amount
    * Also consider decimal values: $123.23
        * Try rounding ex. num = Math.round(val * 100) / 100 this gets a number with a decimal value in the hundredths place!