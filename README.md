# BudgetApplicationUsingLocalStorage
This is a budget mobile web application using JavaScript Local storage.

## Bugs To Be Fixed
* Vendors with spaced out names. Does the computer remove the right element from the DOM? Also will a long vendor name look right on a card?
* Add a message when the user clicks on the budget input field when a budget is already declared and the Enter budget button is disabled. Show using the toast that a budget is inputted and too input another you have to use the reset button.
* Accessibility: users need to know that content was dynamically added onto the page
    * Tell user that there were changes with the budget and expenses
    * Tell user that there were changes because a card with expense and vendor was created to the DOM
        * Documentation: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
        * Example of dynamic content accessibility: https://www.youtube.com/watch?v=NTcpHJAmNTI&ab_channel=CassidyPittman
