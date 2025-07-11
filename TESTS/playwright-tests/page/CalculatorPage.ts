// TESTS/playwright-tests/page/CalculatorPage.ts

// —— IMPORTS ——
import { Page, Locator } from '@playwright/test'    // @playwright/test is the official Playwright test runner package.


// —— CONSTANTS AND TYPES ——
// All valid button labels infered as string types
const buttonNames = [
    '0','1','2','3','4','5','6','7','8','9','.','+','-','×','÷','=','AC','( )','%','⌫'
] as const;

// Union type from buttonNames: '0' | '1' | '+' | etc.
export type ButtonLabel = (typeof buttonNames)[number];


//  —— PAGE OBJECT MODEL ——
// Page Object Model (POM) for the Calculator app. This class encapsulates all page interactions.
export class CalculatorPage {
    // The main Playwright page object (represents the browser tab)
    readonly page: Page;

    // Locators for display and history elements
    readonly display: Locator;
    readonly recentHistory: Locator;
    readonly result: Locator;
    readonly themeToggle: Locator;
    readonly buttons: Record<ButtonLabel, Locator>;  // Button label → element

    // Constructor is called when the class is instantiated  (The `page` argument is provided by Playwright when the test starts.)
    constructor(page: Page) {
        this.page = page;

        // Set up locators for the display and theme toggle button
        this.display = page.getByRole('region', { name: 'Calculator display' });
        this.recentHistory = page.getByRole('status', { name: 'Recent history' });
        this.result = page.getByRole('status', { name: 'Result' });
        this.themeToggle = page.getByRole('button', { name: 'Toggle dark mode' });

        // Set up buttons
        this.buttons = {} as Record<ButtonLabel, Locator>;

        for (const label of buttonNames) {
            // All buttons use: <button data-value="X" aria-label="X">
            this.buttons[label] = page.locator(`[data-value='${label}']`)
        }
    }

    // Navigate to the calculator app
    goto = async () => {
        await this.page.goto('https://hradiladam.github.io/calculator/');
    }

    // Press a button
    press = async (label: ButtonLabel): Promise<void> => {
        const button = this.buttons[label];
        if (!button) {
            throw new Error(`No button found for label: '${label}'`);
        }
        await button.click();
    }

    // Simulate a ful lsequence of button presses like 100+30% 
    pressSequence = async (sequence: string): Promise<void> => {
        for (const char of sequence) {
            const button = this.buttons[char as ButtonLabel];
            if (!button) {
                console.error(`DEBUG: No button mapped for '${char}'`);
                throw new Error(`No button found for character: '${char}'`);
            }
            await button.click();
        }
    }

    // Get result text from result display
    getResult = async (): Promise<string> => {
        const result  = await this.result.textContent();
        if (result ) {
            return result .trim();
        }
        return '';
    }

    // Get recent history text from display
    getHistory = async (): Promise<string> => {
        const history  = await this.recentHistory.textContent();
        if (history ) {
            return history .trim();
        }
        return ''; 
    }

    // Click the theme toggle button
    switchTheme = async (): Promise<void> => {
        await this.themeToggle.click()
    }
}