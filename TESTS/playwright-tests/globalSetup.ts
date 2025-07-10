// TESTS/playwright-tests/globalSetup.ts
// ---GLOBAL SETUP TO FIRE UP BACKEND LOCCATED IN COLD STORAGE---

console.log('[DEBUG] globalSetup.ts loaded');

const globalSetup = async (): Promise<void> => {
    console.log('[DEBUG] Running backend warmup...');
    console.time('Backend warmup time');

    try {
        const response = await fetch('https://calculator-ihdr.onrender.com/evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ expression: '1+1' }),
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

