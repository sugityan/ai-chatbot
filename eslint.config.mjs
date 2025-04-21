import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // TypeScriptの推奨ルール
      ...tseslint.configs['recommended'].rules,
      // 追加のカスタムルール
      'no-unused-vars': 'error',
      'no-console': 'warn',
      'no-duplicate-imports': 'error',
    },
  },
  prettierConfig,
];
