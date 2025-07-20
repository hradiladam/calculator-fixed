// TESTS/jest-tests/backend/unit/preprocessor.test.ts
// —— UNIT TESTS FOR preprocessor.ts ——
// These tests verify correct transformation of expressions for math.js

import { preprocess } from '../../../../BACKEND/utils/preprocessor';

describe('preprocess', () => {
    // Test normalization of display operators to standard math symbols
    test('normalizes × and ÷ to * and /', () => {
        expect(preprocess('3×4÷2')).toBe('3*4/2');
    });

    // Test expansion of "E + Y%" → E*(1+Y/100)
    // This models percentage addition as a discount-style operation
    test('expands percentage addition', () => {
        expect(preprocess('100 + 20%')).toBe('(100*(1+20/100))');
    });

    // Test expansion of "E - Y%" → E * (1 - Y/100)
    // This models percentage subtraction as a discount-style operation
    test('expands percentage subtraction', () => {
        expect(preprocess('100 - 20%')).toBe('(100*(1-20/100))');
    });

    // Test: Nested percentage additions are expanded in multiple passes.
    // For example: ((100 + 20%) + 10%) 
    // First expands to: (100 * (1 + 20/100)) 
    // Then that result is treated as a new base and expanded again with 10%: 
    // Final result: ((100 * (1 + 20/100)) * (1 + 10/100))
    test('expands nested percent additions', () => {
        expect(preprocess('((100 + 20%) + 10%)')).toBe('((((100*(1+20/100)))*(1+10/100)))');
    });

    // Test conversion of isolated percentages (e.g., "25%" → "25/100")
    test('converts standalone percent to /100', () => {
        expect(preprocess('25%')).toBe('(25/100)');
        expect(preprocess('(40)%')).toBe('((40)/100)');
    });


    // Test implicit multiplication: 2(3+1) → 2*(3+1), (a)(b) → (a)*(b), etc.
    // Test implicit multiplication: 2(3+1) → 2*(3+1), (a)(b) → (a)*(b), etc.
    test('restores implicit multiplication', () => {
        expect(preprocess('2(3+1)')).toBe('2*(3+1)');
        expect(preprocess('(2+1)(4+5)')).toBe('(2+1)*(4+5)');
        expect(preprocess('(2+1)4')).toBe('(2+1)*4');
    });


    // Test combined behavior: nested percent, implicit multiplication, operator normalization
    test('handles mixed complex case', () => {
        const input = '((100+20%)(5+5%)+30%)';
        const output = '((((100*(1+20/100)))*((5*(1+5/100)))*(1+30/100)))';
        expect(preprocess(input)).toBe(output);
    });
})

// npx jest --selectProjects backend --testPathPatterns=preprocessor.test.ts
