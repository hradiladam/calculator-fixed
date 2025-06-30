// js/modules/inputs.js
// ——— Handle Inputs ———
import state from './state.js';
import { clearAll, backspace } from './display.js';
import { evaluateExpression } from './evaluator.js';

// function to handle button clicks
export const handleButtons = async (value) => {
    if (state.currentInput === 'format error' && value !== 'AC') return;

    switch (value) {
        case 'AC': clearAll(); break;
        case '⌫': backspace(); break;
        case '=': await evaluateExpression(); break;
        default: appendValue(value);
    }
};

// function to handle appending values
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


/* helper functions for specific button presses */

//function to handle if the '=' flag is set to true
const handleEqualsFollowUp = (value) => {
    if (value === '( )') state.currentInput += '(';             // append '(' directly after '='
    else if (/[0-9]/.test(value)) state.currentInput = value;   // if a number is pressed, reset the input to just the number
    else if (value === '%') state.currentInput += '%';          // append '%' directly without spaces
    else state.currentInput += ` ${value} `;                    // for operators or other values, append them with spaces
    state.lastButtonWasEquals = false;                          // reset the equals flag to allow normal behavior afterward
};

// handle numbers if the '=' flag is false
const handleNumber = (value) => {
    // if last char is %, just append number directly (do not insert × visually)
    if (state.currentInput.slice(-1) === '%') {
        state.currentInput += value; // let evaluateExpression() insert * for logic
    } else if (state.currentInput === '0') {
        state.currentInput = value;
    } else {
        state.currentInput += value;
    }
};

// handle operators
const handleOperator = (value) => {
    // trim trailing spaces to focus on the meaningful part of the input
    const trimmedInput = state.currentInput.trim();

    // prevent operator after '(' (allowing '-' after it)
    if (trimmedInput.slice(-1) === '(' && value !== '-') {
        return;
    }

    // make '-' the only operator that replaces default zero
    if (trimmedInput === '0' && value === '-') {
        state.currentInput = '-';
    }

    // prevent multiple consecutive operators
    if (state.operators.includes(trimmedInput.slice(-1))) {
        // replace the last operator with the new one
        state.currentInput = trimmedInput.slice(0, -1) + ` ${value} `; 
    } else {
        state.currentInput = `${trimmedInput} ${value} `;
    }
};

// function to handle percentages
const handlePercentage = () => {
    // trim trailing spaces to focus on the meaningful part of the input
    const trimmedInput = state.currentInput.trim();
    // check if the current input ends with a percentage
    if (trimmedInput.slice(-1) === '%') {
        // check if the previous part of the string is a valid number followed by another percentage (e.g., '50%50%')
        const lastNumber = state.currentInput.split(/[\+\-×÷\(\)]/).pop(); // get the last number before operator or parentheses
        if (lastNumber && !lastNumber.includes('%')) {
            // if it's a valid number, we insert multiplication between percentages
            state.currentInput += '*';
        }
    }
    // prevent invalid placement of '%' (e.g., directly after '(')
    if (trimmedInput.slice(-1) === '(') {
        return;
    }
    // append '%' to the input
    state.currentInput += '%';
};

// handle the decimal point
const handleDecimal = (value) => {
    const lastNumber = state.currentInput.split(/[\+\-×÷]/).pop();  // get the last number segment
    if (!lastNumber.includes('.')) {
       state.currentInput += value;                                 // append the decimal point only if not already present
    }
};

// handle parentheses
const handleParentheses = () => {
    const openParentheses = (state.currentInput.match(/\(/g) || []).length;
    const closedParentheses = (state.currentInput.match(/\)/g) || []).length;

    // if the input is '0', replace it with '('
    if (state.currentInput === '0') {
        state.currentInput = '(';
        return;
    }

    // add opening parenthesis if it's appropriate
    if (
        state.operators.includes(state.currentInput.trim().slice(-1)) ||
        state.currentInput.trim().slice(-1) === '(' ||
        state.currentInput === ''
    ) {
        state.currentInput += '(';
        return;
    }
    
    // add closing parenthesis only if there are unmatched opening parentheses
    if (openParentheses > closedParentheses) {
        state.currentInput += ')';
        return;
    }
    // default to adding an opening parenthesis
    state.currentInput += '(';
};