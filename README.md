# BudgetApplicationUsingLocalStorage
This is a budget mobile web application using JavaScript Local storage.

## Bugs To Be Fixed
* Vendors with spaced out names. Does the computer remove the right element from the DOM? Also will a long vendor name look right on a card?
* removed an expense and the remaining expense was incorrect or was it the balance? Dont remember that well?
    * Added removed expense as a string to the balance Ex. 10 bal, 8 expense removed => 108. Numbers added together just not mathematically. 
    * Bug found in conditional logic on line 177 of app.js this is where the error appears to occur!