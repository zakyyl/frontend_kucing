/* eslint-env node */
/* eslint-disable no-undef */
module.exports = {
    root: true,
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:jest/recommended' 
    ],
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        alias: {
          map: [
            ['@', './src']
          ],
          extensions: ['.js', '.jsx', '.json']
        }
      }
    },
    rules: {
      'import/no-unresolved': 'off',
      'no-unused-vars': 'warn'
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    env: {
      browser: true,
      es2021: true,
      node: true,
      jest: true
    }
};