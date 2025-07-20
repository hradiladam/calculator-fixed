//BACKEND/utils/Validator.ts

// —— HELPER VALIDATION FUNCTIONS ——
// Helper methods to validate expressions before evaluation


export default class Validator {
    // all operator symbols, dash escaped for regex
    static operatorChars: string = '+\\-*/×÷';

    // Return true if '(' and ')' count dont match
    hasUnmatchedParentheses(expr: string): boolean {
        const open = (expr.match(/\(/g) || []).length;
        const close = (expr.match(/\)/g) || []).length;
        return open !== close;
    }

    // return true if expression ends with an operator
    endsWithOperator(expr: string): boolean {
        const regex = new RegExp(`[${Validator.operatorChars}]\\s*$`);
        return regex.test(expr);
    }

    // return true if '%' appears right after operator or '('
    hasInvalidPercentUsage(expr: string): boolean {
        const regex = new RegExp(`[${Validator.operatorChars}(]\\s*%`);
        return regex.test(expr);
    }

    // return true if there's a direct "/0" division
    hasDivisionByZero(expr: string): boolean {
        return /\/\s*0+(?![.\d])/.test(expr);
    }

    // Return true if expression ends with '%' followed (possibly after spaces) by a '.' at end of string
    hasPercentDotAtEnd(expr: string): boolean {
        return /%\s*\.$/.test(expr);
    }   
}