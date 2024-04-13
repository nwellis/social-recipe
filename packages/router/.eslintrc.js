/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@acme/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: ["**/*.test.ts"],
};