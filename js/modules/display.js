// js/modules/display.js
// ——— Display Control ———

import state from './state.js';

// Function to update the display of the calculator
export const updateDisplay = (recentHistoryDisplay, resultDisplay) => {
    // Update the history and result text
    recentHistoryDisplay.textContent = state.recentHistory || 'No history';
    resultDisplay.textContent     = state.currentInput   || '0';

    // Force the hidden-scroll container to stay scrolled all the way right
    resultDisplay.scrollLeft = resultDisplay.scrollWidth;
};

// Function to clear display
export const clearAll = () => {
    state.currentInput = '0';           // Reset the current input
    state.recentHistory = '';           // Reset the recent history
    state.lastButtonWasEquals = false;  // Reset the equals flag
};

// Function to delete the last character (or the operator with surrounding spaces)
export const backspace = () => {
    // If the input ends with an operator surrounded by spaces (e.g., " + ")
    if (/\s[+\-×÷]\s$/.test(state.currentInput)) {
        // Remove the operator and its surrounding spaces
        state.currentInput = state.currentInput.slice(0, -3);
    } else {
        // Otherwise, remove just the last character
        state.currentInput = state.currentInput.slice(0, -1);
    }

    // Prevent empty input—reset to "0" if nothing remains
    if (state.currentInput === '') {
        state.currentInput = '0';
    }
};