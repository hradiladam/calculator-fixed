// TESTS/playwright-setup/ui.config.ts
// — Playwright config for lightweight UI interaction tests (no backend dependency) —

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './TESTS/ui',  // UI test folder relative to this config

    timeout: 30_000,  // Global timeout for a single test
    expect: {
        timeout: 5_000,  // Timeout for individual `expect()` calls
    },
    fullyParallel: true,  // Run tests in parallel by default

    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },  // Standard desktop viewport
        baseURL: 'https://hradiladam.github.io/calculator/',  // Allows `page.goto('/')` to work

        // Enable debugging artifacts only on failure
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',

        actionTimeout: 5_000,
        navigationTimeout: 10_000,
    },

    projects: [
        {
            name: 'Chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'WebKit',
            use: { ...devices['Desktop Safari'] },
        },
    ],

    // No globalSetup for UI-only tests
});
