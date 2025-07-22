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

    // ———————————————————————————
    // hasUnmatchedParentheses()
    // ———————————————————————————
    describe('hasUnmatchedParentheses', () => {
        test.each([
            ['(1+2', true, 'unmatched opening parenthesis'],
            ['(1+2)', false, 'properly matched parentheses'],
            ['((1+2)', true, 'nested unmatched open paretheses'],
            ['1 + 2)', true, 'unmatched closing parenthesis'],
        ])('returns %s for "%s" - %s', (input, expected, description) => {
            expect(validator.hasUnmatchedParentheses(input)).toBe(expected);
        });
    });

    // ———————————————————————————
    // endsWithOperator()
    // ———————————————————————————
    describe('endsWithOperator', () => {
        test.each([
            ['1 +', true, 'trailing "+" operator'],
            ['3 * ', true, 'trailing "*" operator with space'],
            ['4 + 5', false, 'complete binary expression'],
        ])('returns %s for "%s" - %s', (input, expected, description) => {
            expect(validator.endsWithOperator(input)).toBe(expected);
        });
    });

    // ———————————————————————————
    // hasInvalidPercentPlacement()
    // ———————————————————————————
    describe('hasInvalidePercentUsage', () => {
        test.each([
            ['1+%', true, 'percent sign directly after operator'],
            ['(%20 + 5)', true, 'percent sign directly after open parenthesis'],
            ['5 + 20%', false, 'valid percent usage after number'],
            ['(100 + 50)%', false, 'valid percent after closing parenthesis'],
        ])('returns %s for "%s" - %s', (input, expected, description) => {
            expect(validator.hasInvalidPercentUsage(input)).toBe(expected);
        });
    });
    
    // ———————————————————————————
    // hasDivisionByZero()  
    // ———————————————————————————
    describe('hasDivisionByZero', () => {
        test.each([
            ['10 / 0', true, 'simple division by zero'],
            ['10/000', true, 'division by zero with multiple zeros'],
            ['100 / 2', false, 'valid integer division'],
            ['5 / 0.5', false, 'valid division by a non-zero decimal'],
        ])('returns %s for "%s" - %s', (input, expected, description) => {
            expect(validator.hasDivisionByZero(input)).toBe(expected);
        });
    });
});


// npx jest --selectProjects backend --testPathPatterns=Validator.test.ts







