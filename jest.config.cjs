// jest.config.js
module.exports = {
  projects: [
    {
      displayName: 'backend',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/TESTS/jest-tests/backend/**/*.test.ts'],
    },
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/TESTS/jest-tests/frontend/**/*.test.ts'],
    },
  ],
};
