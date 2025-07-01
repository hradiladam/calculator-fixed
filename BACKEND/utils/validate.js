//BACKEND/utils/validate.js

// —— HELPER VALIDATION FUNCTIONS ——
export const operatorChars = '+\\-*/×÷';  // must escape dash (-)

export const hasUnmatchedParentheses = (expr) => {
    const open = (expr.match(/\(/g) || []).length;
    const close = (expr.match(/\)/g) || []).length;
    return open !== close;
};

// Checks if the expression ends with an operator
export const endsWithOperator = (expr) => {
    const regex = new RegExp(`[${operatorChars}]\\s*$`);
    return regex.test(expr);
};

// Checks for invalid percent placement, e.g. directly after an operator or opening parenthesis
export const hasInvalidPercentUsage = (expr) => {
    const regex = new RegExp(`[${operatorChars}(]\\s*%`);
    return regex.test(expr);
};

// Detects obvious division-by-zero patterns like "÷ 0" or "/ 0"
export const hasDivisionByZero = (expr) => {
    return /\/\s*0+(?![.\d])/.test(expr);
};