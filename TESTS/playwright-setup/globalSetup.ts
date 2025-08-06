// TESTS/playwright/globalSetup.ts
// — Global setup to wake up the backend before running E2E Playwright tests —

import { getEvaluateUrl } from '../../ts/config-api';  // Adjust path if needed for actual project root

console.log('globalSetup.ts loaded');

const globalSetup = async (): Promise<void> => {
    console.log('Running backend warmup…');
    console.time('Backend warmup time');

    try {
        const response = await fetch(getEvaluateUrl(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ expression: '1+1' }),  // Safe expression to trigger cold-start
        });

        console.timeEnd('Backend warmup time');

        if (response.ok) {
            console.log('Backend is awake and responsive.');
        } else {
            console.warn(`Backend responded with status: ${response.status}`);
        }

    } catch (error) {
        console.error('Failed to warm up backend:', error);
    }
};

export default globalSetup;
