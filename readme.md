# Calculator Project

This is a simple calculator built using HTML, CSS, and JavaScript.


## Features

- **Basic operations:** Addition, subtraction, multiplication, division.
- **Percentage Calculations** Allows percentage calculations.
- **Decimal Support:** Enables precise decimal calculations.
- **Parentheses Support:** Lets you group operations for more complex expressions.
- **Clear & Delete:** "AC" to clear inputs and remove "format error" message, while "⌫" to delete the last character.
- **Theme Toggle:** Switch between light and dark themes.
- **Format Error Handling:** Invalid input formats result in a "format error" message.


## Technologies Used

- HTML
- CSS
- JavaScript for handling the logic and user interactions
- Math.js for evaluating complex expressions
- Visual Studio Code for development


## How to Access

1. **Online:** Open the application directly in your browser by visiting the following link: [Calculator](https://hradiladam.github.io/calculator/)
2. **Locally:** Clone the repository from [GitHub](https://github.com/hradiladam/calculator.git) and open the index.html file in your browser


## Features in Detail

- **Basic operations:** Basic operations are evaluated using Math.js to ensure accurate calculations. 
- **Percentage:** Custom logic handles consecutive percentage calculations without an operator. For example, 50%50% is interpreted as 50% * 50%, and 50%5 as 50% * 6, similar to standard calculator behavior.
- **Number Formatting and Rounding:** To avoid precision errors (e.g., 9.2 - 9 resulting in 0.199999999999998), numbers are rounded to a maximum of 12 decimal places. Trailing zeros are removed for a cleaner result, so values like 5.6000 are displayed as 5.6. 
- **Scientific Notation:** Large or small results are formatted using scientific notation when they exceed 10^15 or fall below 10^-15 (e.g., 1.23e+15 or 1.23e-15).
- **Regular Expressions:** Regular expressions are used throughout the calculator as they provide a more concise and expressive way to handle tasks, such as parsing and transforming mathematical expressions, compared to traditional loop methods. 

## Acknowledgements

- [math.js](https://mathjs.org/) - For mathematical expression evaluation.
- [Font Awesome](https://fontawesome.com/) - For providing the icons used in the theme switcher and the delete function.

---

> This project is a work in progress and it will be gradually updated and enhanced in the future.
