module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'unused-imports',
    'tailwindcss',
    'prettier',
  ],
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Prettier strict
    'prettier/prettier': 'error',

    // TypeScript strict unused vars (ignore _ convention)
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // Remove unused imports automatically
    'unused-imports/no-unused-imports': 'error',

    // Next.js (React 18+ doesn't need react import anymore)
    'react/react-in-jsx-scope': 'off',

    // Import sorting good practice
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external', 'internal', 'parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // Tailwind plugin partial support for Tailwind 4
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'off',

    // Accessibility
    'jsx-a11y/alt-text': 'warn',

    // ✅ Hydration relaxation rules:
    'react/no-danger-with-children': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {},
    },
  },
};
