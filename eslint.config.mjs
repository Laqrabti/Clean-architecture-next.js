// eslint.config.mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// these two lines let us resolve -> node-style __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// wrap the old “extends” so it works in flat mode
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // pull in Next.js’s recommended rules for Core Web Vitals + TS support
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // here you can add flat‑config style rule objects if you like:
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // e.g. turn off console.logs
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
