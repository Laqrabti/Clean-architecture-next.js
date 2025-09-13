// eslint.config.mjs
import next from '@next/eslint-plugin-next'

export default [
  {
    // Apply Next.js recommended rules
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
  },
  {
    // Your custom rules
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]