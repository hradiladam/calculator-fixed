// js/modules/evaluator.js
// ——— Evaluation Logic with BigNumber support and auto-formatting ———

import state from './state.js';

export const evaluateExpression = async () => {
    try {
        const response = await fetch('https://calculator-hdnq.onrender.com/evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ expression: state.currentInput })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Format Error');


        // Format the history and display output 
        const formattedHistory = state.currentInput
            .replace(/(\d+%)\s*(\d+%)/g, '$1 × $2')   // percent followed by percent, e.g., "20%30%" → "20% × 30%"
            .replace(/(\d+%)\s*(\d+)/g, '$1 × $2')    // percent followed by number, e.g., "20%3" → "20% × 3"
            .replace(/(\d+%)\s*\(/g, '$1 × (')        // percent followed by '(', e.g., "20%(" → "20% × ("
            .replace(/([0-9%])\s*\(/g, '$1 × (')      // number or percent before '(', e.g., "9(" → "9 × (", "20%(" → "20% × ("
            .replace(/\)\s*\(/g, ') × (')             // closing ')' before '(', e.g., ")(" → ") × ("
            .replace(/\)\s*([0-9%])/g, ') × $1')      // closing ')' before number/percent, e.g., ")9" → ") × 9", ")%" → ") × %"
        
            state.recentHistory = `${formattedHistory} =`;
            state.currentInput = data.result;
            state.lastButtonWasEquals = true;

    } catch (error) {
        console.error("fetch/eval error: ", error)
        state.currentInput = 'format error';
    }
};
