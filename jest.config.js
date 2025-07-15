// jest.config.js (ROOT)

const tsTransform = { '^.+\\.ts$': 'ts-jest' };

export default {
    projects: [
        {
            displayName: 'backend',
            testMatch: ['<rootDir>/TESTS/jest-tests/backend/**/*.test.ts'],
            testEnvironment: 'node',
            transform: tsTransform
        },
        {
            displayName: 'frontend',
            testMatch: ['<rootDir>/TESTS/jest-tests/frontend/**/*.test.ts'],
            testEnvironment: 'jsdom',
            transform: tsTransform
        }
    ]
};