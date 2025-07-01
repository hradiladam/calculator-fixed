// js/modules/evaluator.js
// ——— Evaluation Logic with BigNumber support and auto-formatting ———

import state from './state.js';

export const evaluateExpression = async () => {
    // Remove any previous error messages
    const resultDisplay = document.getElementById('result');

    resultDisplay.classList.remove('error-text');

    try {
        const response = await fetch('https://calculator-ihdr.onrender.com/evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ expression: state.currentInput })
        });

        const data = await response.json();
        
        // Apply formatting to recent history, always 
        const formattedHistory = state.currentInput
            .replace(/(\d+%)\s*(\d+%)/g, '$1 × $2')   // percent followed by percent, e.g., "20%30%" → "20% × 30%"
            .replace(/(\d+%)\s*(\d+)/g, '$1 × $2')    // percent followed by number, e.g., "20%3" → "20% × 3"
            .replace(/(\d+%)\s*\(/g, '$1 × (')        // percent followed by '(', e.g., "20%(" → "20% × ("
            .replace(/([0-9%])\s*\(/g, '$1 × (')      // number or percent before '(', e.g., "9(" → "9 × (", "20%(" → "20% × ("
            .replace(/\)\s*\(/g, ') × (')             // closing ')' before '(', e.g., ")(" → ") × ("
            .replace(/\)\s*([0-9%])/g, ') × $1');     // closing ')' before number/percent, e.g., ")9" → ") × 9", ")%" → ") × %"

        // Always record what the user attempted
        state.recentHistory = `${formattedHistory} =`;

        // Handle errors
        if (!response.ok) {
            // Show the backend’s error text
            state.currentInput = data.error || 'Unexpected error';
            // Add the error-text class so CSS will shrink + recolor
            resultDisplay.classList.add('error-text');
            return;
        }
        
        // Only if successful:
        state.currentInput = data.result;
        state.lastButtonWasEquals = true;

    } catch (error) {
        console.error("fetch/eval error:", error);
        state.currentInput = 'Network error';

        // Add the error-text class so CSS will shrink + recolor
        resultDisplay.classList.add('error-text');
    }
};
