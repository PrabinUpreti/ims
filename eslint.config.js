import eslint from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintPluginPrettierRecommended,
  ],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    // eslint basic rules
    'no-implicit-coercion': 'error',
    'no-useless-escape': 'error',
    'consistent-return': 'error',
    'prefer-const': 'error',
    'no-magic-numbers': ['error', { ignore: [-1, 0, 1] }],
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'no-debugger': 'error',
    'no-nested-ternary': 'error',
    curly: ['error', 'all'],

    // typescript rules
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-var-requires': 'error',
    // '@typescript-eslint/explicit-module-boundary-types': ['error'], // TODO: enable later
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['function', 'typeLike'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['class', 'interface'],
        format: ['PascalCase'],
        leadingUnderscore: 'allow',
      },
    ],

    // react rules
    'react-hooks/exhaustive-deps': ['error'],
    'react/no-unused-prop-types': ['error'],
    'react/no-array-index-key': ['error'],
    'react/no-unstable-nested-components': ['error'],
    'react/jsx-key': ['error'],
    'react/jsx-no-bind': ['error', { allowArrowFunctions: true, allowFunctions: true }],
    'react/no-redundant-should-component-update': ['error'],

    // react rules (disabled)
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
})
