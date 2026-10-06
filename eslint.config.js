const js = require('@eslint/js');
const globals = require('globals');
const prettierConfig = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  js.configs.recommended,
  prettierConfig,
  {
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest, // ✅ Jest globals for tests
      },
      ecmaVersion: 'latest',
      sourceType: 'script',
    },
    rules: {
      // Airbnb-style import rules
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/no-named-as-default': 'warn',

      // Prettier enforcement
      'prettier/prettier': 'error',

      // Custom rules
      'no-console': 'off', // ✅ console.log allowed everywhere
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
