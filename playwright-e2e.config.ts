// TESTS/playwright-setup/e2e.config.ts
// — Playwright config for full end-to-end tests (backend + frontend) —

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './TESTS/e2e',  // E2E test folder relative to this config

    timeout: 60_000,
    expect: {
        timeout: 5_000,
    },
    fullyParallel: true,

    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },
        baseURL: 'https://hradiladam.github.io/calculator/',

        // Enable debugging artifacts only on failure
        screenshot: 'only-on-failure',
        video: 'on-first-retry',
        trace: 'on-first-retry',

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

    globalSetup: './TESTS/playwright-setup/globalSetup.ts',
});
