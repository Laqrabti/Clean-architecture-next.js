// eslint.config.mjs
import next from '@next/eslint-plugin-next'

export default [
  {
    ignores: ['**/node_modules/', '.next/'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]