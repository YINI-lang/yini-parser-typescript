// eslint.config.js
// With the flat config
const js = require('@eslint/js')
const tseslint = require('@typescript-eslint/eslint-plugin')
const tsparser = require('@typescript-eslint/parser')
const prettier = require('eslint-config-prettier')

module.exports = [
    js.configs.recommended,
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                project: './tsconfig.json',
            },
            // Add these lines:
            globals: {
                console: 'readonly',
                process: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
                require: 'readonly',
                Buffer: 'readonly',
                // add more Node.js globals if you use them
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            // Your custom rules here
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'no-undef': 'off',
            'no-unused-expressions': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            curly: ['error', 'all'], // Enforces braces around all if, else, for, while, and do.
        },
    },
    prettier,
]
