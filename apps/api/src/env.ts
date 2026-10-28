import { config } from 'dotenv';
import { z } from 'zod';

// Carrega o apps/api/.env (se existir) para dentro de process.env.
config({ quiet: true });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3333),
  DATABASE_URL: z.url(),
  DIRECT_URL: z.url(),
  DATABASE_URL_TEST: z.url(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Variáveis de ambiente inválidas ou ausentes:');
  console.error(z.prettifyError(parsed.error));
  console.error('Confira o arquivo apps/api/.env (modelo em apps/api/.env.example).');
  process.exit(1);
}

export const env = parsed.data;
