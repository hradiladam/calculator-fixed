document.addEventListener('DOMContentLoaded', () => {
    const recentHistoryDisplay = document.getElementById('recent-history'); // Get recent-history element
    const resultDisplay = document.getElementById('result'); // Get result element

    let currentInput = ''; // What user types
    let recentHistory = ''; // Stores the previous operation


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
                evaluateExpression(); // Evaluates expression (modified currentInput)
                break; // End the switch here for this case
            default:
                appendValue(value); // Appends other buttons' value to currentInput
        }

        updateDisplay(); // Update the display after each press
    };

    // Append buttons' values to current input
    const appendValue = (value) => {
        currentInput += value;
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
        } catch (error) {
            currentInput = 'format error'; // Show error on invalid expressions
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
