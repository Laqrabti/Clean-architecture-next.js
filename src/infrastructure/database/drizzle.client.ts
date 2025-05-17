// src/infrastructure/database/drizzle.client.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../config/env'; // Make sure you have this config file
import * as schema from './schema';

// Create the PostgreSQL client
const client = postgres(env.DATABASE_URL);

// Initialize Drizzle ORM with the schema
export const db = drizzle(client, { 
  schema,
  logger: true // Optional: Enable query logging
});