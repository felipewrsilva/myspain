# Minha Espanha

Site estático em Next.js para brasileiros que querem ir ou já estão na Espanha.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Conteúdo

Tudo fica no repositório, em `content/`:

- `guias/*.mdx` — guias (PDF em `/guias/[slug]/pdf`)
- `checklists/*.json` — checklists (PDF em `/checklists/[slug]/pdf`)
- `site.ts` — nome, nav e links do WhatsApp

## Deploy

Conecte o repositório à Vercel e aponte o domínio `minhaespanha.com.br`.
