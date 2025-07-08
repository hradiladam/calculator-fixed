// BACKEND/calculator.js

// —— CALCULATOR ENDPOINT ——
// Encapsulates evaluation logic and formatting

import { create, all } from 'mathjs';
import Validator from '../utils/Validator.js';
import { preprocess } from '../utils/preprocessor.js'

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

    evaluate(expression) {
        // Validation for errors before evaluation
        const expr = preprocess(expression);

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
            precision: 12,     // Typical real-world display
            lowerExp: -6,      // Switch for tiny values
            upperExp: 9        // switch for billions and above
        })
    }
}