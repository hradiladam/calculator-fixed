// jest.config.cjs

const tsTransform = { '^.+\\.ts$': 'ts-jest' };

module.exports = {
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
