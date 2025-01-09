// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import prettier from "eslint-plugin-prettier/recommended";

export default withNuxt([
  {
    ignores: [".vscode/*"],
  },
  {
    files: ["**/*.ts", "**/*.vue", "*.mjs"],
    ...prettier,
  },
  {
    files: ["**/*.vue", "**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "prettier/prettier": [
        "error",
        {
          htmlWhitespaceSensitivity: "ignore",
        },
      ],
    },
  },
]);
