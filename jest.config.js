/*
 * NOTE:

 * NOT NOT use:
 *    export default { ... }  // (!) This is an ES Module!
 * 
 * Since we are using CommonJS currently, it must be:
 *    module.exports = { ... }
 */
/** @type {import('jest').Config} */
module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testPathIgnorePatterns: [
        '/dist/',
        '/node_modules/',
        '/src/grammar/generated/',
    ],
    testEnvironment: 'node',
    coverageProvider: 'v8',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/grammar/generated/**',
        '!**/*.d.ts',
    ],
    coverageReporters: ['text', 'html', 'lcov'],
    coveragePathIgnorePatterns: [
        '/dist/',
        '/node_modules/',
        '/src/grammar/generated/',
    ],
    // Optional thresholds
    coverageThreshold: {
        // global: { branches: 80, functions: 85, lines: 85, statements: 85 },
    },
}
