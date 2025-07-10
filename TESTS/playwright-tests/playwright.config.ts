// TESTS/playwright-tests/config/playwright.config.ts
// --- PLAYWRIGHT CONFIGURATION

/**
 * This file configures how Playwright runs the tests. A central place to:
 * - Control browser behavior (headless/headful, slow motion, etc.)
 * - Set base URLs
 * - Control timeouts, video, screenshots, and tracing
 * - Define device emulations or multiple browser targets
 */

// Import Playwright's config builder and device descriptors
import { defineConfig, devices } from '@playwright/test';

// Put a config object in ar an argument
export default defineConfig({
    testDir: './test-scripts',            
    timeout: 30 * 1000,             
    expect: {
        timeout: 5000     // Timeout for individual expect calls                  
    },
    fullyParallel: true,

    // Global test behaviour
    use: {
        headless: true,
        viewport: { width: 1280, height: 720 },                 // Standard desktop viewport
        baseURL: 'https://hradiladam.github.io/calculator/',    // allows `page.goto('/')` to work

        // Debugging tools — keep only on test failure
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',

        // Reasonable default timeouts
        actionTimeout: 5000,        // Individual click/fill actions: 5s max
        navigationTimeout: 10000,   // page.goto() and navigation: 10s max
    },

    // All browser engines
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

    globalSetup: './globalSetup.ts',
});