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


    // Preprocesses an expression string by normalizing operators,expanding percentage arithmetic and implicit multiplication.
    preprocess(expr) {
    // Step 1: Normalize × and ÷
    expr = expr.replace(/×/g, '*').replace(/÷/g, '/');

    // Step 2: Apply "E ± Y%" → E*(1±Y/100), recursively,
    // but only if the Y% isn't immediately followed by * or /
    let prev;
    const pctExpand = /(\([^%]*\)%|\d+(?:\.\d+)?%|\d+(?:\.\d+)?|\([^%]*\))\s*([+\-])\s*(\d+(?:\.\d+)?)%(?!\s*[*\/])/g;
    do {
        prev = expr;
        expr = expr.replace(pctExpand, (_, base, op, pct) => {
        if (base.endsWith('%')) {
            const val = base.slice(0, -1);
            return `(${val}/100*(1${op}${pct}/100))`;
        }
        return `(${base}*(1${op}${pct}/100))`;
        });
    } while (expr !== prev);

    // Step 3: Convert any remaining "N%" or "(... )%" into division by 100
    do {
        prev = expr;
        expr = expr
        .replace(/(\([^()]*\))%/g, '($1/100)')
        .replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
    } while (expr !== prev);

    // Step 4: Restore implicit multiplication: 2(3) → 2*(3), etc.
    expr = expr
        .replace(/(\d|\))\s*\(/g, '$1*(')
        .replace(/\)\s*(\d)/g, ')*$1')
        .replace(/\)\s*\(/g, ')*(');

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
            precision: 12,     // Typical real-world display
            lowerExp: -6,      // Switch for tiny values
            upperExp: 9        // switch for billions and above
        })
    }
}