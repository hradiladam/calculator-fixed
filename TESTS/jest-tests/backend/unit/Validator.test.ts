// TESTS/backend/jest-tests/Validator.test.ts
//  —— UNIT TESTS FOR Validator.ts ——
// These tests verify all validation methods used before evaluating math expressions.

import Validator from '../../../../BACKEND/utils/Validator';


describe('Validator', () => {
    let validator: Validator;

    // Create a fresh validator instance before each test
    beforeEach(() => {
        validator = new Validator;
    });

    // Test the unmatched parentheses validator
    describe('hasUnmatchedParentheses', () => {
         // Should return true when there's an unmatched opening parenthesis
        test('returns true for unmatched open paren', () => {
            expect(validator.hasUnmatchedParentheses('(1 + 2')).toBe(true);
        });

        // Should return false for a properly closed parenthesis pair
        test('returns false for matched parentheses', () => {
            expect(validator.hasUnmatchedParentheses('(1 + 2)')).toBe(false);
        });
    });

    // Test the logic that checks if the expression ends with an operator
    describe('endsWithOperator', () => {
        // Should return true if expression ends with an operator
        test('returns true if expression ends with operator', () => {
            expect(validator.endsWithOperator('5+')).toBe(true);
            expect(validator.endsWithOperator('3/')).toBe(true);
        });

        // Should return false if expression ends with a valid operand
        test('returns false if expression ends properly', () => {
            expect(validator.endsWithOperator('1+1')).toBe(false);
        });
    });

    // Test of invalid percent placement
    describe('hasInvalidePercentUsage', () => {
        // Test that results in an error if % follows an operator -> returns true
        test('returns true for % directly after aoperator', () => {
            expect(validator.hasInvalidPercentUsage('1+%')).toBe(true);
        });

        // Should return true when percent sign directly follows an open parenthesis
        test('returns true for percent directly after open paren', () => {
            expect(validator.hasInvalidPercentUsage('(%20 + 5)')).toBe(true);
        });

        // Should return false for valid percent usage
        test('returns false for valid percent use', () => {
            expect(validator.hasInvalidPercentUsage('5 + 20%')).toBe(false);
        });
    });
    
    // Test detection of divide-by-zero
    describe('', () => {
        // Should return true for any division by zero
        test('returns true for direct division by 0', () => {
            expect(validator.hasDivisionByZero('10 / 0')).toBe(true);
            expect(validator.hasDivisionByZero('10/000')).toBe(true);
        });

        // Should return false for valid non-zero division
        test('returns false for safe divisions', () => {
            expect(validator.hasDivisionByZero('10 / 2')).toBe(false);
            expect(validator.hasDivisionByZero('10 / 0.5')).toBe(false);
        });
    });
});


// npx jest --selectProjects backend --testPathPatterns=Validator.test.ts







