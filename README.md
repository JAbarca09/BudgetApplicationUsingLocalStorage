# BudgetApplicationUsingLocalStorage
This is a budget mobile web application using JavaScript Local storage.

## Bugs To Be Fixed
* Users can enter invalid expenses and budget dollar amounts: $002333 is not a valid dollar amount
    * Write a function that checks if the dollar value provided is valid!
    * Also consider decimal values: $123.23
        * Try rounding ex. num = Math.round(val * 100) / 100 this gets a number with a decimal value in the hundredths place!
* Issue with multiple expenses, removing them adds up to the balance incorrectly not sure why?
    * This occurred aftering updating the application by including rounding!