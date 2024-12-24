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

    updateDisplay();

    // Function to handle button clicks
    const handleButtons = (value) => {
        // Prevent any action except 'AC' if the current input is 'format error'
        if (currentInput === 'format error' && value !== 'AC') {
            return;
        }

        switch (value) {
            case 'AC':
                clearAll();
                break;
            case '⌫':
                backspace();
                break;
            case '=':
                evaluateExpression();
                break;
            default:
                appendValue(value);
        }

        updateDisplay(); // Update the display after each press
    };


    // Function to clear all inputs
    const clearAll = () => {
        currentInput = '0'; // Reset the current input
        recentHistory = ''; // Reset the recent history
        lastButtonWasEquals = false; // Reset the equals flag
    };


    // Function to delete the last character (or operator with spaces)
    const backspace = () => {
        currentInput = currentInput.slice(0, -1); // Remove the last character

        // Ensure currentInput doesn't end up empty
        if (currentInput === '') {
            currentInput = '0';
        }
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

    // Function to evaluate calculations
    const evaluateExpression = () => {
        try {
            // Replace operators for math.js compatibility
            let expression = currentInput
                .replace(/×/g, '*') // Change '×' into '*'
                .replace(/÷/g, '/'); // Change '÷' into '/'

            let result = math.evaluate(expression).toString(); // Evaluate the expression

            recentHistory = `${currentInput} =`; // Update recent history with the evaluated expression
            currentInput = result; // Update input to the result
            lastButtonWasEquals = true; // Set the equals flag
        } catch (error) {
            currentInput = 'format error'; // Show error on invalid expressions
        }
    };


    // Function to append value to the current input
    const appendValue = (value) => {
        if (lastButtonWasEquals) {
            if (/\d/.test(value)) {
                currentInput = value; // Start new input with the number
            } else {
                currentInput += ` ${value} `; // Continue with operator
            }
            lastButtonWasEquals = false; // Reset the equals flag
        } else {
            if (currentInput === '0' && /\d/.test(value)) {
                currentInput = value; // Replace default '0' with the number
            } else {
                currentInput += value; // Append the value
            }
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
