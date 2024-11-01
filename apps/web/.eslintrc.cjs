module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '@acme/eslint-config/react-internal.js',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
