// TESTS/playwright-tests/test-scripts/keyboard-input.test.ts

import { test, expect } from '@playwright/test';
import { CalculatorPage } from '../page/CalculatorPage';

let calculator: CalculatorPage;

test.describe('Keyboard Input', () => {
    test.beforeEach(async ({ page }) => {
        calculator = new CalculatorPage(page);
        await calculator.goto();
    });

    test('should allow typing 7×2 and return 14', async () => {
        await calculator.typeExpression('7×2');
        await calculator.page.keyboard.press('Enter');

        // Wait until result is exactly "14"
        await expect.poll(() => calculator.getResult(), { timeout: 2000 }).toBe('14');
    });

    test('should evaluate a complex expression with keyboard input', async () => {
        // Simulate typing: ((1.2+3.8)*2 - 4%) = 9.6 - 0.384 = 9.6
        await calculator.typeExpression('((1.2+3.8)×2-4%)');
        await calculator.page.keyboard.press('Enter');

        // Wait for the result
        await expect.poll(() => calculator.getResult(), { timeout: 2000 }).toBe('9.6');
    });
});

// npx playwright test TESTS/playwright-tests/test-scripts/keyboard-input.test.ts --config=TESTS/playwright-tests/playwright.config.ts
// npx playwright test TESTS/playwright-tests/test-scripts/keyboard-input.test.ts --config=TESTS/playwright-tests/playwright.config.ts --project=Chromium
