// TESTS/ui/ui-behavior.test.ts
// ——— UI BEHAVIOR & LAYOUT TESTS ———

import { test, expect } from '@playwright/test';
import { CalculatorPage } from '../playwright-setup/page/CalculatorPage';

let calculator: CalculatorPage;

test.describe('UI Behavior & Layout', () => {
    test.beforeEach(async ({ page }) => {
        calculator = new CalculatorPage(page);
        await calculator.goto();
    });

    // Typing a long number should cause the result section of display to scroll right automatically, so the newest digits stay visible on screen.
    test('long input scrolls result section of display display horizontally', async () => {
        const longInput = '1234567890'.repeat(5);
        await calculator.pressSequence(longInput);

        const scrolledPixels = await calculator.result.evaluate(el => el.scrollLeft);
        expect(scrolledPixels).toBeGreaterThan(0);

        const visibleText = await calculator.result.textContent();
        expect(visibleText?.trim().endsWith(longInput.at(-1)!)).toBe(true);
    });

    // Result display text should be right-aligned like standard calculators
    test('display text is right-aligned', async () => {
        await expect(calculator.result).toHaveCSS('text-align', 'right');
    });

    // Error messages → result text should change color to #eb4d45
    test('error messages apply error styling to result display', async () => {
        await calculator.pressSequence('1÷0=');
        await expect.poll(() =>
            calculator.result.evaluate(el => getComputedStyle(el).color)
        ).toBe('rgb(235, 77, 69)');
    });

    // Hovering a default digit button changes its background color
    test('hovering a default digit button changes its background', async () => {
        const btn = calculator.buttons['7'];
        const before = await btn.evaluate(el => getComputedStyle(el).backgroundColor);
        await btn.hover();
        await calculator.page.waitForTimeout(150);
        const after = await btn.evaluate(el => getComputedStyle(el).backgroundColor);
        expect(after).not.toBe(before);
    });

    // Hovering an operator button changes its background color
    test('hovering an operator button changes its background', async () => {
        const btn = calculator.buttons['+'];
        const before = await btn.evaluate(el => getComputedStyle(el).backgroundColor);
        await btn.hover();
        await calculator.page.waitForTimeout(150);
        const after = await btn.evaluate(el => getComputedStyle(el).backgroundColor);
        expect(after).not.toBe(before);
    });

    // Hovering the equals button changes its background image
    test('hovering the equals button changes its background image', async () => {
        const btn = calculator.buttons['='];
        const before = await btn.evaluate(el => getComputedStyle(el).backgroundImage);
        await btn.hover();
        await calculator.page.waitForTimeout(150);
        const after = await btn.evaluate(el => getComputedStyle(el).backgroundImage);
        expect(after).not.toBe(before);
    });

    // Pressing a default digit button applies and removes outline via press-active class
    test('pressing a default digit button shows outline', async () => {
        const btn = calculator.buttons['7'];

        // Apply the class that mimics the :active state
        await btn.evaluate(el => el.classList.add('press-active'));

        // Verify outline becomes solid
        const outlineOn = await btn.evaluate(el => getComputedStyle(el).outlineStyle);
        expect(outlineOn).toBe('solid');

        // Remove the class again
        await btn.evaluate(el => el.classList.remove('press-active'));

        // Verify outline goes back to none
        const outlineOff = await btn.evaluate(el => getComputedStyle(el).outlineStyle);
        expect(outlineOff).toBe('none');
    });

    // Pressing an operator button applies and removes outline via press-active class
    test('pressing an operator button shows outline', async () => {
        const btn = calculator.buttons['+'];

        await btn.evaluate(el => el.classList.add('press-active'));
        const outlineOn = await btn.evaluate(el => getComputedStyle(el).outlineStyle);
        expect(outlineOn).toBe('solid');

        await btn.evaluate(el => el.classList.remove('press-active'));
        const outlineOff = await btn.evaluate(el => getComputedStyle(el).outlineStyle);
        expect(outlineOff).toBe('none');
    });

    // DARK THEME: Hovering digit button changes background
    test('dark theme — hovering a digit button changes its background', async () => {
        await calculator.switchTheme(); // switch to dark
        const btn = calculator.buttons['7'];

        const before = await btn.evaluate(el => getComputedStyle(el).backgroundColor);
        await btn.hover();
        await calculator.page.waitForTimeout(150);
        const after = await btn.evaluate(el => getComputedStyle(el).backgroundColor);

        expect(after).not.toBe(before);
    });

    // DARK THEME: Hovering operator button changes background
    test('dark theme — hovering an operator button changes its background', async () => {
        await calculator.switchTheme();
        const btn = calculator.buttons['+'];

        const before = await btn.evaluate(el => getComputedStyle(el).backgroundColor);
        await btn.hover();
        await calculator.page.waitForTimeout(150);
        const after = await btn.evaluate(el => getComputedStyle(el).backgroundColor);

        expect(after).not.toBe(before);
    });

    // DARK THEME: Hovering equals changes background image
    test('dark theme — hovering the equals button changes its background image', async () => {
        await calculator.switchTheme();
        const btn = calculator.buttons['='];

        const before = await btn.evaluate(el => getComputedStyle(el).backgroundImage);
        await btn.hover();
        await calculator.page.waitForTimeout(150);
        const after = await btn.evaluate(el => getComputedStyle(el).backgroundImage);

        expect(after).not.toBe(before);
    });

    // DARK THEME: Pressing a default digit button shows outline
    test('dark theme — pressing a digit button shows outline', async () => {
        await calculator.switchTheme();
        const btn = calculator.buttons['7'];

        await btn.evaluate(el => el.classList.add('press-active'));
        const outlineOn = await btn.evaluate(el => getComputedStyle(el).outlineStyle);
        expect(outlineOn).toBe('solid');

        await btn.evaluate(el => el.classList.remove('press-active'));
        const outlineOff = await btn.evaluate(el => getComputedStyle(el).outlineStyle);
        expect(outlineOff).toBe('none');
    });

    // DARK THEME: Pressing an operator button shows outline
    test('dark theme — pressing an operator button shows outline', async () => {
        await calculator.switchTheme();
        const btn = calculator.buttons['+'];

        await btn.evaluate(el => el.classList.add('press-active'));
        const outlineOn = await btn.evaluate(el => getComputedStyle(el).outlineStyle);
        expect(outlineOn).toBe('solid');

        await btn.evaluate(el => el.classList.remove('press-active'));
        const outlineOff = await btn.evaluate(el => getComputedStyle(el).outlineStyle);
        expect(outlineOff).toBe('none');
    });

    // DARK THEME: Error message turns result red
    test('dark theme — error messages apply dark mode error styling', async () => {
        await calculator.switchTheme();
        await calculator.pressSequence('1÷0=');

        await expect.poll(() =>
            calculator.result.evaluate(el => getComputedStyle(el).color)
        ).toBe('rgb(236, 111, 111)');
    });
});


// npx playwright test TESTS/ui/ui-behavior.test.ts --config=playwright-ui.config.ts --project=Chromium
