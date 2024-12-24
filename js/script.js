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
        - Replace consecutive percentages like 50%50% by inserting '*' between them
        - Handle cases like '50%6' by converting them into valid mathematical expressions
        - Update history display according to above mentioned changes for clarity 
        - Implement logic to handle precision in decimals by limiting the number of decimal points to avoid JavaScript's issues with high-precision calculations
        - Implement logic for when tu use scientific notations
        - Format results to trim trailing zeroes and avoid ending with a period => safeguard 
        
    */

    // Function to evaluate calculations
    const evaluateExpression = () => {
        try {
            // Replace operators for math.js compatibility
            let expression = currentInput
                .replace(/×/g, '*') // Change '×' into '*' for math.js
                .replace(/÷/g, '/'); // Change '÷' into '/' for math.js
    
            // Replace consecutive percentages by inserting '*' between them
            expression = expression.replace(/(\d+%)\s*(\d+%)/g, '$1*$2');
    
            // Handle percentage followed by a number (e.g., '50%6' -> '50%*6')
            expression = expression.replace(/(\d+%)\s*(\d+)/g, '$1*$2');
    
            // Evaluate the corrected expression
            let result = math.evaluate(expression);
    
            // Format result
            let formattedResult;
    
            const SCIENTIFIC_NOTATION_THRESHOLD = 1e15; // Numbers >= 10^15 switch to scientific notation
            const MINIMUM_THRESHOLD = 1e-15; // Numbers <= 10^-15 switch to scientific notation
            const MAX_DECIMAL_LENGTH = 12; // Number of decimal places
    
            if (
                Math.abs(result) >= SCIENTIFIC_NOTATION_THRESHOLD ||
                (Math.abs(result) <= MINIMUM_THRESHOLD && result !== 0)
            ) {
                formattedResult = result.toExponential(3); // Format to scientific notation
            } else {
                formattedResult = result
                    .toFixed(MAX_DECIMAL_LENGTH) // Format to fixed decimal
                    .replace(/(\.\d*?)0+$/, '$1') // Trim trailing zeros
                    .replace(/\.$/, ''); // Avoid ending with a period
            }
    
            recentHistory = `${currentInput
                .replace(/(\d+%)\s*(\d+%)/g, '$1 * $2')  // Add space around * for consecutive percentages
                .replace(/(\d+%)\s*(\d+)/g, '$1 * $2')} =`; // Add space around * for percentage followed by number
                
            currentInput = formattedResult; // Update input to the result
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
