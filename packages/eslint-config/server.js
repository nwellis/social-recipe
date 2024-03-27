module.exports = {
  extends: ["eslint:recommended"],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "vitest.config.ts",
  ],
  overrides: [
    {
      files: ["**/*.spec.ts(x)?"],
    },
  ],
};
