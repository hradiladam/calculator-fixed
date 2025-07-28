// jest.config.js
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
            },
            moduleFileExtensions: ['ts', 'js', 'json'],
            moduleNameMapper: {
                // Rewrite imports of core modules in ts/modules
                // e.g. import State from './State.js' → <rootDir>/ts/modules/State.ts
                '^\\./(formatter|State|Evaluator|DisplayControl|KeyboardHandler|ThemeSwitch|InputHandler)\\.js$':
                '<rootDir>/ts/modules/$1.ts',

                // Rewrite the config-api helper import
                // e.g. import { getEvaluateUrl } from '../config-api.js'
                '^\\.\\./config-api\\.js$':
                '<rootDir>/ts/config-api.ts',

                // Rewrite any deep‑relative import of ts/modules files
                // e.g. import State from '../../../../ts/modules/State.js'
                '^(?:\\.\\./)*ts/modules/(formatter|State|Evaluator|DisplayControl|KeyboardHandler|ThemeSwitch|InputHandler)\\.js$':
                '<rootDir>/ts/modules/$1.ts'
            }
        }
    ]
};