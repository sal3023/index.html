import globals from "globals";
import pluginJs from "@eslint/js";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,tsx}"] },
  {
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json", "./tsconfig.node.json"],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  tseslintPlugin.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    ignores: ["dist", "server.ts"],
  },
];
