import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Load Next.js and TypeScript recommended configs
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom rule overrides
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prefer-const": "warn", // or "off" if you don't want to see it
      "@next/next/no-img-element": "warn", // You can turn this off too if needed
    },
  },
];

export default eslintConfig;
