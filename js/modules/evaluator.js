// js/modules/evaluator.js
// ——— Evaluation Logic with BigNumber support and auto-formatting ———

import state from './state.js';

// Configure Math.js to use BigNumber with 64 digits of precision
math.config({
  number: 'BigNumber',
  precision: 64
});

// Function to evaluate calculations
//   - Uses Math.js BigNumber for high-precision calculations
//   - Inserts '*' between percentages and numbers/parentheses
//   - Leverages math.format with auto notation for result formatting
//   - Updates history display for clarity
export const evaluateExpression = () => {
  try {
    // Prepare expression for BigNumber evaluation
    let expression = state.currentInput
      .replace(/×/g, '*')           // visual × → *
      .replace(/÷/g, '/')           // ÷ → /
      .replace(/(\d+%)\s*(\d+%)/g, '$1*$2')  // 50%50% → 50%*50%
      .replace(/(\d+%)\s*(\d+)/g, '$1*$2')   // 50%6 → 50%*6
      .replace(/(\d+%)\s*\(/g, '$1*(');      // 10%(10) → 10%*(10)

    // Evaluate under BigNumber
    const result = math.evaluate(expression);

    // Format the result with auto notation:
    // - switches to scientific when very large/small
    // - limits to 12 significant digits
    const formattedResult = math.format(result, {
      notation: 'auto',
      precision: 12,
      lowerExp: -12,
      upperExp: 12
    });

    // Update history (display the original input with × for clarity)
    state.recentHistory = `${state.currentInput
      .replace(/(\d+%)\s*(\d+%)/g, '$1 × $2')   // percent followed by percent
      .replace(/(\d+%)\s*(\d+)/g, '$1 × $2')    // percent followed by number
      .replace(/(\d+%)\s*\(/g, '$1 × (')        // percent followed by parenthesis
    } =`;

    // Set the calculator display to the formatted result
    state.currentInput = formattedResult;
    state.lastButtonWasEquals = true;
  } catch {
    state.currentInput = 'format error';
  }
};
