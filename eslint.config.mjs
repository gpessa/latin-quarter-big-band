import eslintConfigNext from "eslint-config-next";

const config = [
  ...eslintConfigNext,
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default config;
