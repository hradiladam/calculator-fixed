// js/modules/display.js
// ——— Display Control ———

import state from './state.js';

// function to update the display of the calculator
export const updateDisplay = (recentHistoryDisplay, resultDisplay) => {
    recentHistoryDisplay.textContent = state.recentHistory || 'None'; // Show recent history or empty if none
    resultDisplay.textContent = state.currentInput || '0'; // Show current input or '0' if empty
};

// function to clear display
export const clearAll = () => {
    state.currentInput = '0'; // reset the current input
    state.recentHistory = ''; // reset the recent history
    state.lastButtonWasEquals = false; // reset the equals flag
};

// function to delete the last character (or the operator with spaces around it)
export const backspace = () => {
    // check if the last characters match the pattern ' operator ' (e.g., ' + ')
    if (/\s[+\-×÷]\s$/.test(state.currentInput)) {
        state.currentInput = state.currentInput.slice(0, -3); // remove the operator and surrounding spaces
    } else {
        state.currentInput = state.currentInput.slice(0, -1); // otherwise, remove the last character
    }

    if (state.currentInput === '') state.currentInput = '0'; // ensure currentInput doesn't end up empty
}



