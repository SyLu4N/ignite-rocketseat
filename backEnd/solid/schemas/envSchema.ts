import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
});
