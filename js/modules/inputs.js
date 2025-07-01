// js/modules/inputs.js
// ——— Handle Inputs ———
import state from './state.js';
import { clearAll, backspace } from './display.js';
import { evaluateExpression } from './evaluator.js';

// Function to handle appending values
export const appendValue = (value) => {
    if (state.lastButtonWasEquals) {
        handleEqualsFollowUp(value);
        return;
    }
    if (/[0-9]/.test(value)) return handleNumber(value);
    if (state.operators.includes(value)) return handleOperator(value);
    if (value === '%') return handlePercentage();
    if (value === '.') return handleDecimal(value);
    if (value === '( )') return handleParentheses();
};

/* Helper functions for specific button presses */

// Function to handle if the '=' flag is set to true
const handleEqualsFollowUp = (value) => {
    if (value === '( )') state.currentInput += '(';             // Append '(' directly after '='
    else if (/[0-9]/.test(value)) state.currentInput = value;   // If a number is pressed, reset the input to just the number
    else if (value === '%') state.currentInput += '%';          // Append '%' directly without spaces
    else state.currentInput += ` ${value} `;                    // For operators or other values, append them with spaces
    state.lastButtonWasEquals = false;                          // Reset the equals flag to allow normal behavior afterward
};

// Handle numbers if the '=' flag is false
const handleNumber = (value) => {
    // If last char is %, just append number directly (do not insert × visually)
    if (state.currentInput.slice(-1) === '%') {
        state.currentInput += value; // Let evaluateExpression() insert * for logic
    } else if (state.currentInput === '0') {
        state.currentInput = value;
    } else {
        state.currentInput += value;
    }
};

// Handle operators
const handleOperator = (value) => {
    // Trim trailing spaces to focus on the meaningful part of the input
    const trimmedInput = state.currentInput.trim();

    // Prevent operator after '(' (allowing '-' after it)
    if (trimmedInput.slice(-1) === '(' && value !== '-') {
        return;
    }

    // Make '-' the only operator that replaces default zero
    if (trimmedInput === '0' && value === '-') {
        state.currentInput = '-';
    }

    // Prevent multiple consecutive operators
    if (state.operators.includes(trimmedInput.slice(-1))) {
        // Replace the last operator with the new one
        state.currentInput = trimmedInput.slice(0, -1) + ` ${value} `;
    } else {
        state.currentInput = `${trimmedInput} ${value} `;
    }
};

// Function to handle percentages
const handlePercentage = () => {
    // Trim trailing spaces to focus on the meaningful part of the input
    const trimmedInput = state.currentInput.trim();
    // Check if the current input ends with a percentage
    if (trimmedInput.slice(-1) === '%') {
        // Check if the previous part of the string is a valid number followed by another percentage (e.g., '50%50%')
        const lastNumber = state.currentInput.split(/[\+\-×÷\(\)]/).pop(); // Get the last number before operator or parentheses
        if (lastNumber && !lastNumber.includes('%')) {
            // If it's a valid number, we insert multiplication between percentages
            state.currentInput += '*';
        }
    }
    // Prevent invalid placement of '%' (e.g., directly after '(')
    if (trimmedInput.slice(-1) === '(') {
        return;
    }
    // Append '%' to the input
    state.currentInput += '%';
};

// Handle the decimal point
const handleDecimal = (value) => {
    const lastNumber = state.currentInput.split(/[\+\-×÷]/).pop();  // Get the last number segment
    if (!lastNumber.includes('.')) {
       state.currentInput += value;                                 // Append the decimal point only if not already present
    }
};

// Handle parentheses
const handleParentheses = () => {
    const openParentheses = (state.currentInput.match(/\(/g) || []).length;
    const closedParentheses = (state.currentInput.match(/\)/g) || []).length;

    // If the input is '0', replace it with '('
    if (state.currentInput === '0') {
        state.currentInput = '(';
        return;
    }

    // Add opening parenthesis if it's appropriate
    if (
        state.operators.includes(state.currentInput.trim().slice(-1)) ||
        state.currentInput.trim().slice(-1) === '(' ||
        state.currentInput === ''
    ) {
        state.currentInput += '(';
        return;
    }
    
    // Add closing parenthesis only if there are unmatched opening parentheses
    if (openParentheses > closedParentheses) {
        state.currentInput += ')';
        return;
    }
    // Default to adding an opening parenthesis
    state.currentInput += '(';
};

// Function to handle button clicks
export const handleButtons = async (value) => {
    const resultDisplay = document.getElementById('result');
    const wasError = resultDisplay.classList.contains('error-text');

    // 1. If we're showing an error and "=" is pressed, do absolutely nothing
    if (wasError && value === '=') return;

    // 2. Always clear error styling on any button press
    resultDisplay.classList.remove('error-text');

    // 3. If there was an error and it's not "=", reset state before continuing
    if (wasError) clearAll();
    
    // Normal handling
    switch (value) {
        case 'AC':
            clearAll();
            break;

        case '⌫':
            backspace();
            break;

        case '=':
            await evaluateExpression();
            break;

        default:
            appendValue(value);
    }
};
