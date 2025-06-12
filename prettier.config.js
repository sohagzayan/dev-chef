module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 4, // <-- THIS controls indentation
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',

  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  importOrder: ['^react$', '^next', '<THIRD_PARTY_MODULES>', '^@/.*', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
