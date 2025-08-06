// jest.config.cjs

/** @type {import('jest').Config} */
module.exports = {
    projects: [
        {
            displayName: 'backend-logic',
            preset: 'ts-jest',
            testEnvironment: 'node',
            testMatch: [
                '<rootDir>/TESTS/backend-logic/**/*.test.ts',
                '<rootDir>/TESTS/api/**/*.test.ts'
            ],
            transform: {
                '^.+\\.tsx?$': ['ts-jest', {
                    tsconfig: '<rootDir>/BACKEND/tsconfig.json',
                }],
            },
        },
        {
            displayName: 'frontend-logic',
            preset: 'ts-jest',
            testEnvironment: 'jsdom',
            testMatch: ['<rootDir>/TESTS/frontend-logic/**/*.test.ts'],

            transform: {
                '^.+\\.tsx?$': ['ts-jest', {
                    tsconfig: '<rootDir>/tsconfig.json',
                }],
            },

            moduleFileExtensions: ['ts', 'js', 'json'],

            moduleNameMapper: {
                // Rewrite the config-api helper import
                // e.g. import { getEvaluateUrl } from '../config-api.js'
                '^\\.\\./config-api\\.js$':
                    '<rootDir>/ts/config-api.ts',

                // Rewrite imports of core modules in ts/modules
                // e.g. import State from './State.js' → <rootDir>/ts/modules/State.ts
                '^\\./(formatter|State|Evaluator|DisplayControl|KeyboardHandler|ThemeSwitch|InputHandler|HistoryPanel)\\.js$':
                    '<rootDir>/ts/modules/$1.ts',

                // Rewrite any deep‑relative import of ts/modules files
                // e.g. import State from '../../../../ts/modules/State.js'
                '^(?:\\.\\./)*ts/modules/(formatter|State|Evaluator|DisplayControl|KeyboardHandler|ThemeSwitch|InputHandler|HistoryPanel)\\.js$':
                    '<rootDir>/ts/modules/$1.ts'
            }
        }
    ]
};
