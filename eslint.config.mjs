import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable the exhaustive-deps rule
      "react-hooks/exhaustive-deps": "off",
      "typescript-eslint/no-empty-object-type": "off",

      // Add your other rules here
      "no-unused-vars": "warn",
      semi: ["error", "always"],
      // Other rules can be added as needed

      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
    },
  },
];

export default eslintConfig;
