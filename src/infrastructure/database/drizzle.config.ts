import { config } from 'dotenv';
import path from 'path';
import { defineConfig } from 'drizzle-kit';

// Load .env from project root
config({ path: path.resolve(__dirname, '../../../.env') });

console.log('ENV PATH:', path.resolve(__dirname, '../../../.env'));
console.log('DATABASE_URL:', process.env.DATABASE_URL);

export default defineConfig({
  schema: './src/infrastructure/database/schema.ts',
  out: './src/infrastructure/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
});
