import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Migrações precisam da conexão direta do Neon (sem o pooler).
    url: env('DIRECT_URL'),
  },
});
