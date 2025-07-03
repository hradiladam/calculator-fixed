// BACKEND/calculator.js

// —— CALCULATOR ENDPOINT ——
// Encapsulates evaluation logic and formatting

import { create, all } from 'mathjs';
import Validator from '../utils/Validator.js';

export default class Calculator {
    constructor() {
        // Initialize a math.js instance configured for high-precision BigNumber calculations
        this.math = create(all);
        this.math.config({ number: 'BigNumber', precision: 64 });

        // Create a Validator instance to check for bad inputs before we calculate
        this.validator = new Validator();
    }

    /**
        * Evaluate the given expression string:
        * 1. Preprocess it
        * 2. Run validation checks
        * 3. Ask math.js to compute a BigNumber result
        * 4. Final check for infinities or NaN
        * 5. Format the final result for display
        */

    // Preprocess the expression for safe and valid mathjs parsing
    preprocess(expression) {
        //- Normalize visual multiplication and division symbols
        let expr = expression
            .replace(/×/g, '*')                         // Visual × → *
            .replace(/÷/g, '/');                        // Visual ÷ → /

        // - Add * between percent and other characters:
        expr = expr
            .replace(/(\d+%)\s*(\d+%)/g, '$1*$2')       // Add * between two chained percentages: e.g. 5%5% → 5%*5%
            .replace(/(\d+%)\s*(\d+)/g, '$1*$2')        // Add * between percent and number: e.g. 5%2 → 5%*2
            .replace(/(\d+%)\s*\(/g, '$1*(');           // Add * between percent and parenthesis: e.g. 5%( → 5%*(

        // - Generic percent sequenc→ divide by 100: "10%%%" → "(((10/100)/100)/100)"
        while (/%/.test(expr)) {
            expr = expr.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
        }

        // - Fix implicit multiplication:
        expr = expr
            .replace(/(\d|\))\s*\(/g, '$1*(')            // Add * between number or closing ) and opening (: e.g. 2( → 2*( or )( → )*(
            .replace(/\)\s*(\d)/g, ')*$1');              // Add * between closing ) and number: e.g. )5 → )*5

        // - Discount style for +/– not in a * or / chain: turns 100+10% → 100+(100*10/100)
        expr = expr.replace(
            /(\d+(?:\.\d+)?)(\s*[+\-]\s*)\(\s*([\d.]+)\s*\/\s*100\s*\)(?!\s*[*\/])/g,
            (_, left, op, pct) => `${left}${op}(${left}*${pct}/100)`
        );

        return expr;
    }

    


    async evaluate(expression) {
        // Validation for errors before evaluation
        const expr = this.preprocess(expression);

        // Validation: catch obvious errors
        if (this.validator.hasDivisionByZero(expr)) {
            throw new Error("Can't divide by 0");
        }
        if (this.validator.endsWithOperator(expr)) {
            throw new Error('Incomplete expression');
        }
        if (this.validator.hasUnmatchedParentheses(expr)) {
            throw new Error('Unmatched parentheses');
        }
        if (this.validator.hasInvalidPercentUsage(expr)) {
            throw new Error('Misplaced percent sign');
        }

        // EVALUATION
        const rawResult = this.math.evaluate(expr);

        // Final check for invalid result
        const nativeResult = Number(rawResult);
        if (!isFinite(nativeResult)) {
            throw new Error('Infinity');
        }
        if (isNaN(nativeResult)) {
            throw new Error('Undefined result');
        }

        // Format the result with auto notation for display
        return this.math.format(rawResult, {
            notation: 'auto',
            precision: 12,
            lowerExp: -12,
            upperExp: 12
        })
    }
}