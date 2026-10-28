# crm-vstech

Mini-CRM da VSTech. O formulário de contato do site da VSTech grava o contato num PostgreSQL; uma API organiza os dados; uma área restrita em React lista e gerencia os contatos. Quando um negócio fecha, ele vira projeto.

## Stack

- **API:** Node.js 24, TypeScript (strict), Fastify, Zod, Prisma ORM 7, PostgreSQL
- **Web:** React, Vite, TypeScript, React Router, TanStack Query, Tailwind CSS
- **Banco:** PostgreSQL gerenciado no [Neon](https://neon.tech)
- **Testes:** Vitest + `app.inject()` do Fastify
- **CI:** GitHub Actions (lint, typecheck, testes e build em todo push e PR)

## Como rodar

Pré-requisitos: Node.js 24 (veja `.nvmrc`) e uma conta no Neon.

1. **Crie os bancos no Neon:** um projeto com um banco de desenvolvimento (`crm_dev`) e um de teste (`crm_test`).
2. **Preencha o `.env`:**
   ```bash
   cp apps/api/.env.example apps/api/.env
   ```
   Cole as connection strings do Neon (botão **Connect** no painel). O próprio `.env.example` explica qual URL vai em cada variável.
3. **Instale as dependências:**
   ```bash
   npm install
   ```
4. **Rode as migrações:**
   ```bash
   cd apps/api
   npx prisma migrate dev
   ```
5. **Suba a API e a web** (em dois terminais):
   ```bash
   npm run dev -w apps/api   # http://localhost:3333/health
   npm run dev -w apps/web   # http://localhost:5173
   ```

Outros comandos (na raiz): `npm run lint`, `npm run typecheck`, `npm test`, `npm run format`.

## Estrutura de pastas

```
crm-vstech/
├── apps/
│   ├── api/                  # API Fastify
│   │   ├── prisma/           # schema.prisma e migrações
│   │   ├── src/
│   │   │   ├── app.ts        # monta o Fastify e registra as rotas
│   │   │   ├── env.ts        # valida as variáveis de ambiente com Zod
│   │   │   └── server.ts     # sobe o servidor na PORT
│   │   ├── test/             # testes com Vitest
│   │   └── prisma.config.ts  # configuração do Prisma CLI
│   └── web/                  # área restrita em React
│       └── src/
│           ├── lib/          # cliente HTTP
│           ├── pages/        # uma página por rota
│           └── router.tsx    # rotas
├── docs/
│   └── decisoes.md           # registro das decisões técnicas
└── .github/workflows/ci.yml  # pipeline de CI
```

## Status

🚧 Em construção. Por enquanto existe só a estrutura do monorepo, a rota `GET /health` e as páginas vazias da web.
