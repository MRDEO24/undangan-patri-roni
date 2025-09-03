module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'commitlint.config.cjs',
    'jsconfig.json',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react-refresh',
    'unused-imports',
    '@tanstack/query',
  ],
  rules: {
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/prefer-query-object-syntax": "error",
    "@tanstack/query/stable-query-client": "error",
    'quotes': [
      'error',
      'single',
    ],
    'func-style': [
      'error',
      'declaration', { 'allowArrowFunctions': true },
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'no-unused-vars': 'off',
    'no-console': [
      'warn',
      { allow: ["warn", "error"] },
    ],
    "no-else-return": "error",
    'no-extra-semi': 'error',
    'semi': 'warn',
    "no-duplicate-imports": "error",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ],
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
