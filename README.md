# BudgetApplicationUsingLocalStorage
This is a budget mobile web application using JavaScript Local storage.

## Bugs To Be Fixed
* Users can enter invalid expenses and budget dollar amounts: $002333 is not a valid dollar amount
    * Write a function that checks if the dollar value provided is valid!
    * Also consider decimal values: $123.23
        * Try rounding ex. num = Math.round(val * 100) / 100 this gets a number with a decimal value in the hundredths place!
* Issue with multiple expenses, removing them adds up to the balance incorrectly not sure why? Expenses with the same vendors causes this issue!
    * To determine which element is removed from the DOM it uses the name of the vendor, but in case the vendors are the same name the computer has troubl determining which element to remove from the DOM.
