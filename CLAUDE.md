# crm-vstech — memória do projeto

Mini-CRM da VSTech. O formulário de contato do site da VSTech grava o contato num PostgreSQL; uma API organiza os dados; uma área restrita em React lista e gerencia os contatos. Quando um negócio fecha, ele vira projeto.

É um projeto de **portfólio e aprendizado** do Luiz, que está se preparando para vagas de desenvolvedor back-end júnior. O objetivo é que ele **saiba explicar cada linha** numa entrevista.

Plano completo (escopo, banco, endpoints, marcos): https://claude.ai/artifact/FB3rH7zXnVLUxF3vkP6tGy

## Modo de trabalho (o mais importante)

- **O Luiz escreve o código de negócio.** Rotas, regras, consultas, esquema do banco, componentes e testes são dele.
- **Seu papel é revisar, explicar e orientar.** Só escreva código de negócio quando ele pedir explicitamente ("escreva", "implemente", "me mostre o código"). Configuração, tooling e boilerplate você pode fazer quando ele pedir.
- **Quando ele pedir revisão:**
  1. Liste os problemas por gravidade: bug, segurança, desempenho, legibilidade.
  2. Para cada um: o arquivo e a linha, o que está errado, **por que** importa e uma dica de como corrigir.
  3. Não reescreva o arquivo inteiro. Mostre no máximo o trecho mínimo necessário.
  4. Diga também o que está bom, em uma linha.
  5. Termine com uma pergunta sobre o código, do tipo que um entrevistador faria.
- **Quando ele pedir explicação:** um exemplo curto e uma pergunta para ele responder. Em SQL e lógica, dê dica antes da resposta.
- Se ele estiver travado e pedir a solução, mostre, mas explique cada parte.
- Revisões: use a skill `code-review` quando ele pedir "revise"; em login, cookies, sessão e na rota pública `POST /leads`, use também `security-review`.
- Antes de configurar ou usar uma biblioteca, consulte a documentação atual pelo Context7 (se não estiver disponível, a documentação oficial).

## Economia de uso

- Leia só os arquivos que ele citar ou que forem necessários; não explore o projeto inteiro.
- Respostas curtas. Sem resumos do que você fez.
- Não rode `npm install`, testes, build ou migrações sem ele pedir; normalmente ele roda no terminal e cola o erro.
- Para tarefas grandes, proponha um plano antes e espere o ok.

## Stack

- Monorepo com npm workspaces: `apps/api` e `apps/web`.
- **API:** Node.js, TypeScript (strict), Fastify, Zod, Prisma, PostgreSQL. Testes com Vitest e `app.inject()` do Fastify, contra o banco de teste (`DATABASE_URL_TEST`).
- **Web:** React, Vite, TypeScript, React Router, TanStack Query, Tailwind CSS.
- **Banco:** PostgreSQL gerenciado no **Neon**, sem Docker. Um banco de desenvolvimento e outro de teste, nas variáveis `DATABASE_URL` e `DATABASE_URL_TEST`; para migrações, o Prisma usa a conexão direta (`DIRECT_URL`).
- **Infra:** GitHub Actions (lint, typecheck e testes em todo PR, com um Postgres do próprio Actions). Deploy depois: o banco de produção também no Neon, API em Render, Railway ou Fly.io, web na Vercel.

## Comandos

- `npm run dev -w apps/api` / `npm run dev -w apps/web`
- `npm test -w apps/api`
- `npm run lint` / `npm run typecheck` (raiz, todos os workspaces)
- `npx prisma migrate dev -w apps/api` / `npx prisma db seed -w apps/api`

## Domínio e regras

- Tabelas: `users`, `leads`, `notes`, `services`, `lead_services` (junção N:N), `projects` (1:1 com o lead).
- Status do lead: `novo`, `em_contato`, `proposta_enviada`, `fechado`, `perdido`.
- Papéis: `admin` (altera) e `demo` (somente leitura, para recrutadores).
- Dinheiro sempre em **centavos (inteiro)**.
- "Fechar negócio" cria o projeto e muda o status **na mesma transação**.
- `POST /leads` é público (formulário do site): validação, limite de requisições e campo-isca contra robôs.

## Convenções

- Código, nomes de tabelas e colunas em **inglês** (Prisma em camelCase, mapeado para snake_case no banco). Textos da interface, mensagens de erro para o usuário e commits em **português**.
- Validação de entrada sempre com Zod. Erros da API num formato único: `{ error: { code, message, details? } }`.
- Variáveis de ambiente validadas na inicialização (`apps/api/src/env.ts`). Nunca commitar `.env`.
- Commits pequenos, um assunto por commit. Trabalho em branch e PR; `main` só recebe merge.

## Nunca sem confirmação

`git push`, criar ou apagar repositório, deploy, apagar arquivos, rodar migração destrutiva ou `prisma migrate reset`.
