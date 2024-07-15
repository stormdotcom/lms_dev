module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:node/recommended'
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'no-console': 'warn', // Warn for console.log statements
        'no-unused-vars': 'warn', // Warn for unused variables
        'no-undef': 'error', // Error for variables that are not defined
    }
};
