// src/infrastructure/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
