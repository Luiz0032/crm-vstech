import { buildApp } from './app.js';
import { env } from './env.js';

const app = buildApp({ logger: true });

try {
  // 0.0.0.0 aceita conexões de fora da máquina (necessário no deploy).
  await app.listen({ port: env.PORT, host: '0.0.0.0' });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
