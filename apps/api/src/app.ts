import Fastify, { type FastifyServerOptions } from 'fastify';

// Monta o app sem chamar listen(): o server.ts sobe a porta e os testes usam app.inject().
export function buildApp(options: FastifyServerOptions = {}) {
  const app = Fastify(options);

  app.get('/health', async () => {
    return { status: 'ok' };
  });

  return app;
}
