// TESTS/jest-tests/backend/unit/Calculator.test.ts
// —— UNIT TESTS FOR Calculator.ts ——

// Verifies both correct results and error handling, plus integration with helper modules

import Calculator from '../../../../BACKEND/services/Calculator';
import * as prep from '../../../../BACKEND/utils/preprocessor';
import Validator from '../../../../BACKEND/utils/Validator';

describe('Calculator.evaluate()', () => {
    let calculator: Calculator;

    // Instantiate a fresh Calculator before each test
    beforeEach(() => {
        calculator = new Calculator;
    });

    // BASIC ARITHMETIC OPERATIONS 
    describe('basic operations', () => {
        test('addition: 5 + 3 = 8', () => {
            // Simple addition should return "8"
            expect(calculator.evaluate('5+3')).toBe('8');
        });

        test('subtraction: 5 - 3 = 2', () => {
            // Simple subtraction should return "2"
            expect(calculator.evaluate('5-3')).toBe('2');
        });

        test('multiplication: 5 * 3 = 15', () => {
            // Simple multiplication should return "15"
            expect(calculator.evaluate('5*3')).toBe('15');
        });

        test('division: 10 / 2 = 5', () => {
            // Simple division should return "5"
            expect(calculator.evaluate('10/2')).toBe('5');
        });

        test('mixed operations: 1+2-3*4/2 = -3', () => {
            // 1 + 2 - (3*4)/2 = 3 - 6 = -3
            expect(calculator.evaluate('1+2-3*4/2')).toBe('-3');
        });
    });

    // PERCENTAGE BEHAVIOR
    describe('percentage calculations', () => {
        test('addition: 100 + 20% = 120', () => {
            expect(calculator.evaluate('100+20%')).toBe('120');
        });

        test('subtraction: 100 - 20% = 80', () => {
            expect(calculator.evaluate('100-20%')).toBe('80');
        });

        test('multiplication: 200 * 10% = 20', () => {
            expect(calculator.evaluate('200*10%')).toBe('20');
        });

        test('division: 200 / 10% = 2000', () => {
            expect(calculator.evaluate('200/10%')).toBe('2000');
        });

        test('implicit multiplication with percent: 50%5 = 2.5', () => {
            // 50% of 5 = 0.5 * 5 = 2.5
            expect(calculator.evaluate('50%5')).toBe('2.5');
        });
    });

    // PARENTHESES
    // Parentheses grouping 
    describe('valid parentheses', () => {
        test('simple grouping', () => {
            // Parentheses force addition before multiplication
            expect(calculator.evaluate('(2+3)*4')).toBe('20');
        });

        test('nested grouping', () => {
            // Inner (1+2)=3, then (3*3)=9, plus 4 = 13
            expect(calculator.evaluate('((1+2)*3)+4')).toBe('13');
        });

        test('multiple nested levels', () => {
            // (3+4)=7, 2*7=14, then 1+14=15
            expect(calculator.evaluate('(1+(2*(3+4)))')).toBe('15');
        });
    });

    // Implicit multiplication
    describe('implicit multiplication', () => {
        test('number before parentheses: 5(2+3) = 25', () => {
        // Converts to 5*(2+3)
        expect(calculator.evaluate('5(2+3)')).toBe('25');
        });

        test('closing parentheses before number: (2+3)4 = 20', () => {
        // Converts to (2+3)*4
        expect(calculator.evaluate('(2+3)4')).toBe('20');
        });

        test('parentheses back-to-back: (1+1)(2+2) = 8', () => {
        // Converts to (1+1)*(2+2)
        expect(calculator.evaluate('(1+1)(2+2)')).toBe('8');
        });
    });

    // SCIENTIFIC NOTATION FORMATTING 
    // Verify that very small and very large results are auto‑formatted in exponential notation
    describe('auto‑scientific formatting for extreme values', () => {
        test('formats very small results in scientific notation', () => {
            // 0.00001 * 0.00001 = 0.0000000001 = 1e-10
            expect(calculator.evaluate('0.00001*0.00001')).toBe('1e-10');
        });

        test('formats very large results in scientific notation', () => {
            // 100000 * 100000 = 10000000000 = 1e+10
            expect(calculator.evaluate('100000*100000')).toBe('1e+10');
        });

        // Edge case for lowerExp exponential
        test('preserves decimal notation at the lowerExp threshold', () => {
            // lowerExp = -6, so 1e-6 (0.000001) should NOT switch to exponential 
            // because mathjs auto notation is inclusive at the lower limit
            expect(calculator.evaluate('0.000001')).toBe('0.000001');
        });

        // Edge case for upperExp exponential
        test('preserves decimal notation at the upperExp threshold', () => {
            // upperExp = 9, so 1e9 (1 000 000 000) should switch to exponential
            // because mathjs auto notation is exclusive at the upper limit
            expect(calculator.evaluate('1000000000')).toBe('1e+9');
        });
    });

    // DECIMAL POINT PRECISION AND FORMATTING
    describe('decimal point precision and formatting', () => {
        test('accurate precision', () => {
            // 0.1 + 0.2 results in 0.3 and not 0.03000000000001
            expect(calculator.evaluate('0.1+0.2')).toBe('0.3');
        });

        test('0.1 / 3 produces exactly 12 significant digits', () => {
            // 0.1 / 3 ≈ 0.0333333333333333…
            // With precision=12, we expect 12 digits after the leading zero:
            // "0.033333333333"
            expect(calculator.evaluate('0.1/3')).toBe('0.0333333333333');
        });

        test('rounds numbers with more than 12 significant digits', () => {
            // 2.3456789012345678 has 16 significant digits
            // Should be rounded to 12: "2.34567890123"
            expect(calculator.evaluate('2.3456789012345678')).toBe('2.34567890123');
        });

        test('trims unnecessary trailing zeros', () => {
            // "1.2300" → trailing zeros dropped → "1.23"
            expect(calculator.evaluate('1.2300')).toBe('1.23');
            // "1.0000" → all decimals zero → "1"
            expect(calculator.evaluate('1.0000')).toBe('1');
        });
    });

    // ERROR CONDITIONS
    // Each of these inputs should trigger a specific error thrown by Calculator.evaluate()

    describe('error conditions', () => {
        test('division by zero throws the correct message', () => {
            // Attempting 10 / 0 should throw "Can't divide by 0"
            expect(() => calculator.evaluate('10/0')).toThrow("Can't divide by 0");
        });

        test('incomplete expression ends with operator', () => {
            // Expression ending in '+' is incomplete
            expect(() => calculator.evaluate('5+')).toThrow('Incomplete expression');
        });

        test('unmatched parentheses are detected', () => {
            // Missing closing ')' should throw
            expect(() => calculator.evaluate('(5+5')).toThrow('Unmatched parentheses');
        });

        test('misplaced percent sign throws error', () => {
            // A percent immediately after an operator is invalid
            expect(() => calculator.evaluate('5+%')).toThrow('Misplaced percent sign');
        });

        test('overflow leading to Infinity is caught', () => {
            // Very large multiplication to force Infinity
            const hugeNumber = '1' + '0'.repeat(1000);
            expect(() => 
                calculator.evaluate(`${hugeNumber}*${hugeNumber}`)
            ).toThrow('Infinity');
        });
    });

    // COLLABORATION WITH HELPER MODULES
    // Unit tests verifying that Calculator uses its helpers correctly

    test('calls preprocess exactly once with the raw input', () => {
        // Spy on the preprocess function
        const spy = jest.spyOn(prep, 'preprocess');

        // Run evaluate; it should invoke preprocess('2+2')
        calculator.evaluate('2+2');

        // Assert it was called once with the exact original string
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('2+2');

        spy.mockRestore();
    });

    test('short-circuits on division-by-zero via Validator', () => {
        // Force Validator.hasDivisionByZero() to return true, regardless of input
        const divZeroSpy = jest
            .spyOn(Validator.prototype, 'hasDivisionByZero')
            .mockReturnValue(true);

        // Now pick a “safe” expression (e.g. '1+1') that would normally return 2
        // but because of our spy it must throw the division‑by‑zero error
        expect(() => calculator.evaluate('1+1')).toThrow("Can't divide by 0");

        // Clean up
        divZeroSpy.mockRestore();
    });

    test('short-circuits on incomplete expression via Validator', () => {
        // Spy on endsWithOperator to force it to return true for any input
        const incompleteSpy = jest
            .spyOn(Validator.prototype, 'endsWithOperator')
            .mockReturnValue(true);

        // Use a normally-valid expression "1+1"
        // Because of our spy, endsWithOperator() will report it as incomplete
        expect(() => calculator.evaluate('1+1')).toThrow('Incomplete expression');

        // Clean up the spy
        incompleteSpy.mockRestore();
    });

    test('short-circuits on unmatched parentheses via Validator', () => {
        // Spy on hasUnmatchedParentheses to force it to return true
        const parenSpy = jest
            .spyOn(Validator.prototype, 'hasUnmatchedParentheses')
            .mockReturnValue(true);

        // Use a normally-valid expression "2*3"
        // Our spy makes the validator think parentheses are unmatched
        expect(() => calculator.evaluate('2*3')).toThrow('Unmatched parentheses');

        // Restore original behavior
        parenSpy.mockRestore();
    });

    test('short-circuits on invalid percent usage via Validator', () => {
        // Spy on hasInvalidPercentUsage to force it to return true
        const pctSpy = jest
            .spyOn(Validator.prototype, 'hasInvalidPercentUsage')
            .mockReturnValue(true);

        // Use a normally-valid expression "10+5"
        // Spy causes the Validator to flag a misplaced percent sign
        expect(() => calculator.evaluate('10+5')).toThrow('Misplaced percent sign');

        // Remove the spy so other tests run normally
        pctSpy.mockRestore();
    });
});


// npx jest --selectProjects backend --testPathPatterns=Calculator.test.ts