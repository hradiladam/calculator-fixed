//BACKEND/utils/validator.js

// —— HELPER VALIDATION FUNCTIONS ——
// Helper methods to validate expressions before evaluation
export default class Validator {
    // all operator symbols, dash escaped for regex
    static operatorChars = '+\\-*/×÷';

    // Return true if '(' and ')' count dont match
    hasUnmatchedParentheses(expr) {
        const open = (expr.match(/\(/g) || []).length;
        const close = (expr.match(/\)/g) || []).length;
        return open !== close;
    }

    // return true if expression ends with an operator
    endsWithOperator(expr) {
        const regex = new RegExp(`[${Validator.operatorChars}]\\s*$`);
        return regex.test(expr);
    }

    // return true if '%' appears right after operator or '('
    hasInvalidPercentUsage(expr) {
        const regex = new RegExp(`[${Validator.operatorChars}(]\\s*%`);
        return regex.test(expr);
    }

    // return true if there's a direct "/0" division
    hasDivisionByZero(expr) {
        return /\/\s*0+(?![.\d])/.test(expr);
    }
}