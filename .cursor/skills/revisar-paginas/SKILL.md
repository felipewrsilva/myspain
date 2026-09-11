---
name: revisar-paginas
description: >-
  Reviews and enriches Minha Espanha content pages (guias, checklists) with
  practical PT-BR detail, official .gob.es links, unique YouTube embeds, and
  Unsplash images. Use when the user asks to revisar páginas, melhorar
  conteúdo, add mídia/vídeos/fotos, enriquecer guias, or run the revisor-paginas
  agent.
---

# Revisar páginas

Delegate to the project subagent **revisor-paginas** (`.cursor/agents/revisor-paginas.md`). Launch **one subagent per guia or checklist** (or a batch of at most 3 related slugs) so each page gets a full pass.

If the user names slugs, only those. Otherwise glob `content/guias/*.mdx` and `content/checklists/*.json` and work through the list. Skip `content/apostilas/`.

## Before editing

1. `rg "<YouTube id=" content` — collect IDs already used (must stay unique).
2. Read the target file and `content/covers.ts`.
3. Research current official pages (`.gob.es` / consulado) and PT-BR YouTube via oEmbed.

## After editing

Load `/guias/[slug]` or `/checklists/[slug]` and confirm embeds and new sections render. Do not commit unless asked.

Full editorial rules live in the subagent prompt: PT-BR, Spain-only, no duplicate videos, no Unsplash reuse, no selling third parties, explain Spanish terms on first use.
