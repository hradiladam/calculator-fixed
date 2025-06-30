// js/modules/evaluator.js
// ——— Evaluation Logic with BigNumber support and auto-formatting ———

import state from './state.js';

export const evaluateExpression = async () => {
    try {
        const response = await fetch('https://calculator-new-1ova.onrender.com/evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ expression: state.currentInput })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Format Error');


        // Format the history and display output 
        const formattedHistory = state.currentInput
            .replace(/(\d+%)\s*(\d+%)/g, '$1 × $2')   // percent followed by percent
            .replace(/(\d+%)\s*(\d+)/g, '$1 × $2')    // percent followed by number
            .replace(/(\d+%)\s*\(/g, '$1 × (')        // percent followed by parenthesis
        
            state.recentHistory = `${formattedHistory} =`;
            state.currentInput = data.result;
            state.lastButtonWasEquals = true;

    } catch (error) {
        console.error("fetch/eval error: ", error)
        state.currentInput = 'format error';
    }
};
