import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import nPlugin from 'eslint-plugin-n';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

const importOrderRules = {
  'simple-import-sort/imports': [
    'error',
    {
      groups: [['^\\u0000'], ['^node:'], ['^@?\\w'], ['^@repo/', '^@test/'], ['^\\.']],
    },
  ],
  'simple-import-sort/exports': 'error',
};

export default defineConfig(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.turbo/**',
      '**/playwright-report/**',
      '**/test-results/**',
      'mock-ui/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...importOrderRules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['apps/patient/**/*.{ts,tsx}', 'apps/admin/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
    },
  },
  {
    files: [
      'apps/server/**/*.{ts,tsx}',
      'packages/shared/**/*.{ts,tsx}',
      'e2e/**/*.{ts,tsx}',
      'scripts/**/*.{ts,tsx}',
    ],
    plugins: {
      n: nPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    settings: {
      node: {
        version: '>=24.0.0',
      },
    },
    rules: {
      ...nPlugin.configs['flat/recommended'].rules,
      'n/no-missing-import': 'off',
      'n/no-unpublished-import': 'off',
      'n/no-process-exit': 'off',
    },
  },
  eslintConfigPrettier,
);
