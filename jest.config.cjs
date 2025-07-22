module.exports = {
    projects: [
        {
        displayName: 'backend',
        preset: 'ts-jest',
        testEnvironment: 'node',
        testMatch: ['<rootDir>/TESTS/jest-tests/backend/**/*.test.ts'],
        globals: {
            'ts-jest': {
            tsconfig: '<rootDir>/BACKEND/tsconfig.json'
            }
        }
        },
        {
        displayName: 'frontend',
        preset: 'ts-jest',
        testEnvironment: 'jsdom',
        testMatch: ['<rootDir>/TESTS/jest-tests/frontend/**/*.test.ts'],
        globals: {
            'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json'
            }
        }
        }
    ]
};