// src/infrastructure/database/drizzle.config.ts
import { config } from 'dotenv';
import path from 'path';
import { defineConfig } from 'drizzle-kit';

// Load .env.local from project root (3 levels up from config file)
config({ path: path.resolve(__dirname, '../../../.env.local') });

console.log('ENV PATH:', path.resolve(__dirname, '../../../.env.local'));
console.log('DATABASE_URL:', process.env.DATABASE_URL);

export default defineConfig({
  schema: './src/infrastructure/database/schema.ts',
  out: './src/infrastructure/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  verbose: true
});
