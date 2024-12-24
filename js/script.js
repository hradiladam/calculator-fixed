document.addEventListener('DOMContentLoaded', () => {
    const recentHistoryDisplay = document.getElementById('recent-history'); // Get recent-history element
    const resultDisplay = document.getElementById('result'); // Get result element

    let currentInput = ''; // What user types
    let recentHistory = ''; // Stores the previous operation
    let lastButtonWasEquals = false; // Flag to track if the last button pressed was '='


    // Function to update the display of the calculator
    const updateDisplay = () => {
        recentHistoryDisplay.textContent = recentHistory || 'None'; // Show recent history or empty if none
        resultDisplay.textContent = currentInput || '0'; // Show current input or '0' if empty
    };


    // Function to handle button clicks
    const handleButtons = (value) => {
        switch (value) {
            case 'AC':
                console.log("AC button clicked - Functionality not implemented yet"); // Placeholder for clearAll()
            case '⌫':
                console.log("Backspace button clicked - Functionality not implemented yet"); // Placeholder for backspace()
            case '=':
                evaluateExpression(); // Evaluate the expression
                lastButtonWasEquals = true; // Set the flag after pressing '='
                break;
            default:
                appendValue(value); // Append value to the current input
        }

        updateDisplay(); // Update the display after each press
    };


    
    /* 
    FUNCTIONALITY THAT IS TO BE IMPLEMENTED LATER: 
        - Parentheses
        - Percentages
        - Decimal points
        - Formatting for operators
        - etc.
    */


    /*
    Function to evaluate calculations
        - Implements Math.js to handle basic calculations and error handling
    */

    const evaluateExpression = () => {
        try {
            // Replace operators for math.js compatibility
            let expression = currentInput
                .replace(/×/g, '*') // Change '×' into '*' for math.js
                .replace(/÷/g, '/'); // Change '÷' into '/' for math.js

            // Evaluate the corrected expression
            let result = math.evaluate(expression).toString();

            recentHistory = `${currentInput}=`; // Save the expression and result in recentHistory
            currentInput = result; // Update input to the result
            lastButtonWasEquals = true; // Set the equals flag
        } 
        
        catch (error) {
            currentInput = 'format error'; // Show error on invalid expressions
        }
    };


    // Append value to the current input
const appendValue = (value) => {
    if (lastButtonWasEquals) {
        // If the last button pressed was '=', use the result for new operation
        if (['+', '-', '×', '÷'].includes(value)) {
            // If the user presses an operator after '=', start a new calculation with the result
            currentInput = currentInput + value;
            lastButtonWasEquals = false; // Allow for the next input to be appended normally
        } else {
            // If the user presses a number, start a new expression with that number
            currentInput = value;
            lastButtonWasEquals = false;
        }
    } else {
        // Otherwise, append normally
        currentInput += value;
    }
};



    // Function to add event listeners to buttons and connect buttons data-value with JS
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => {
            handleButtons(button.dataset.value); // Pass button's data-value to handleButtons
        });
    });


    // Function to switch theme between light and dark
    const switchTheme = () => {
        const body = document.body;
        const themeSwitchButton = document.querySelector('#theme-switch');

        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            themeSwitchButton.innerHTML = '<i class="fa-regular fa-sun"></i>';
        } else {
            themeSwitchButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    }

    const themeSwitchButton = document.getElementById('theme-switch');
    themeSwitchButton.addEventListener('click', switchTheme);
});
