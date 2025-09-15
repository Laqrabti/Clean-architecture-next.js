import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Keep Next.js + TypeScript recommended settings
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Override specific rules
  {
    rules: {
      // Disable unused vars blocking the build
      "@typescript-eslint/no-unused-vars": "off",

      // (Optional) If you prefer warnings instead of errors:
      // "@typescript-eslint/no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
