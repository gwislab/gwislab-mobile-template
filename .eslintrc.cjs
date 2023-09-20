/* eslint-disable no-undef */
module.exports = {
  parser: "@typescript-eslint/parser",
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "react",
    "import",
    "@typescript-eslint",
    "react-native",
    "react-hooks",
    "prettier"
  ],
  rules: {
    "prettier/prettier": 0,
    // "prettier/prettier": [
    //   "error",
    //   {
    //     singleQuote: false,
    //     printWidth: 90,
    //     tabWidth: 2,
    //     semi: true,
    //     trailingComma: "none",
    //     bracketSpacing: true,
    //     jsxBracketSameLine: false,
    //     arrowParens: "always",
    //     offsetTernaryExpressions: false,
    //     endOfLine: "auto"
    //   },
    //   {
    //     usePrettierrc: false
    //   }
    // ],
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true,
        offsetTernaryExpressions: true,
        ignoreComments: true,
        ObjectExpression: 1
      }
    ],
    "linebreak-style": [0, "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "multiline-ternary": 0,
    "react/display-name": 0,
    "react/prop-types": 0,
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "max-len": [
      "error",
      {
        code: 90,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true
      }
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before"
          }
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        }
      }
    ],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/ban-ts-comment": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
