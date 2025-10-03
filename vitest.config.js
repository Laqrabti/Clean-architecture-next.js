// vitest.config.js
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Use 'include' to explicitly define which files are unit tests
    include: ['app/__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    // Use 'exclude' to ensure Playwright files are ignored
    exclude: ['tests/e2e/**/*', 'node_modules/**/*'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './test-setup.ts',
  },
});