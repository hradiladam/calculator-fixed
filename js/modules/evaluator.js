// js/modules/evaluator.js
// ——— Evaluation Logic ———

import state from './state.js';

// Function to evaluate calculations
//     - Implements Math.js to handle basic calculations and error handling
//     - Replace consecutive percentages like 50%50% by inserting '*' between them
//     - Handle cases like '50%6' by converting them into valid mathematical expressions
//     - Update history display according to above mentioned changes for clarity 
//     - Implement logic to handle precision in decimals by limiting the number of decimal points to avoid JavaScript's issues with high-precision calculations
//     - Implement logic for when tu use scientific notations
//     - Format results to trim trailing zeroes and avoid ending with a period => safeguard 
        
export const evaluateExpression = () => {
    try {
        // prepare expression for math.js
        let expression = state.currentInput
            .replace(/×/g, '*') // change '×' into '*' for math.js
            .replace(/÷/g, '/') // change '÷' into '/' for math.js
            .replace(/(\d+%)\s*(\d+%)/g, '$1*$2') // handle 50%50% → 50%*50%
            .replace(/(\d+%)\s*(\d+)/g, '$1*$2'); // handle 50%6 → 50%*6
        
        // evaluate expression using math.js
        let result = math.evaluate(expression);
        
        // format result
        const MAX_DECIMALS = 12;  // number of decimal places
        const SCI_NOTATION_UPPER = 1e15; // numbers <= 10^-15 switch to scientific notation
        const SCI_NOTATION_LOWER = 1e-15; // numbers >= 10^15 switch to scientific notation
        
        let formattedResult = (Math.abs(result) >= SCI_NOTATION_UPPER || (Math.abs(result) <= SCI_NOTATION_LOWER && result !== 0))
            ? result.toExponential(3)  // format to scientific notation
            : result
                .toFixed(MAX_DECIMALS)  // format to fixed decimal
                .replace(/(\.\d*?)0+$/, '$1') // Trim trailing zeros
                .replace(/\.$/, ''); // avoid ending with a period
                
        // Update history and input
        state.recentHistory = `${state.currentInput
            .replace(/(\d+%)\s*(\d+%)/g, '$1 × $2') // add space around * for consecutive percentages
            .replace(/(\d+%)\s*(\d+)/g, '$1 × $2')} =`; // add space around * for percentage followed by number
                        
        state.currentInput = formattedResult; // update input to the result
        state.lastButtonWasEquals = true; // set the equals flag
            
    } catch {
        state.currentInput = 'format error'; // show error on invalid expressions
    }
};