---
name: revisar-pdfs
description: >-
  Reviews each Minha Espanha PDF visually and structurally, one agent per PDF,
  in parallel. Use when the user asks to revisar PDFs, diagramação, page breaks,
  layout de apostila/guia/checklist em PDF, or to generate a revised PDF version.
---

# Revisar PDFs

Delegate to the project subagent **revisor-pdf** (`.cursor/agents/revisor-pdf.md`). Launch **one subagent per PDF** (guia or checklist). Run them **in parallel** in a single turn — never review PDFs one-by-one if simultaneous agents are possible.

## Inventory

1. Glob `content/guias/*.mdx` → `/guias/[slug]/pdf`
2. Glob `content/checklists/*.json` → `/checklists/[slug]/pdf`
3. Skip `content/apostilas/`

If the user names slugs, only those.

## Orchestrator rules

- Confirm `next dev` is already on `http://localhost:3000`. Do not start a second server.
- **You** own `src/lib/apostila-pdf.tsx`. Child agents must **not** edit it (parallel race). Apply renderer fixes yourself from `tmp/pdf-review/*-notes.md` after the batch, then ask agents to regenerate or regenerate yourself.
- After creating the agent type, launch with `subagent_type: "revisor-pdf"` (or `generalPurpose` with the same prompt if the type is not yet registered).
- Each prompt must pin **exactly one** slug, content path, PDF URL, and the mandatory cycle below.

## Mandatory cycle (pass verbatim to each agent)

Analisar PDF → identificar problemas → corrigir → gerar PDF → revisar novamente → corrigir novamente se necessário → entregar versão final.

Each agent must:

1. Abrir e analisar o PDF completo, página por página.
2. Verificar visualmente a quebra de página.
3. Identificar problemas de layout, espaçamento e organização.
4. Identificar conteúdo quebrado de forma inadequada entre páginas.
5. Identificar títulos, subtítulos, listas ou blocos que ficaram isolados.
6. Verificar páginas excessivamente vazias ou sobrecarregadas.
7. Verificar tabelas, imagens, caixas de destaque e outros elementos visuais.
8. Corrigir os problemas encontrados.
9. Gerar uma versão revisada do PDF.
10. Fazer uma segunda verificação no PDF corrigido para garantir que a alteração não criou novos problemas.

## What to look for (pass verbatim)

Preste atenção especial a:

* Título no final da página sem conteúdo suficiente abaixo.
* Subtítulo separado do parágrafo que explica aquele assunto.
* Parágrafos com apenas uma ou duas linhas em uma nova página.
* Listas divididas de maneira visualmente ruim.
* Caixas de informação ou alertas cortados entre páginas.
* Tabelas quebradas de forma inadequada.
* Imagens separadas da explicação relacionada.
* Grandes espaços vazios desnecessários.
* Páginas excessivamente cheias.
* Quebras que interrompem o raciocínio do texto.
* Cabeçalhos e rodapés desalinhados ou sobrepostos.
* Elementos cortados, sobrepostos ou fora das margens.
* Inconsistências de espaçamento entre páginas.
* Página final contendo apenas uma pequena quantidade de conteúdo quando seria possível reorganizar melhor.

## Quality criterion (pass verbatim)

O objetivo não é simplesmente reduzir o número de páginas.

O objetivo é fazer cada PDF parecer **um guia profissional, cuidadosamente diagramado e revisado manualmente**.

Priorize:

**legibilidade → continuidade do conteúdo → organização visual → aproveitamento do espaço.**

Não force blocos para caber em uma página se isso prejudicar a leitura. Da mesma forma, não crie páginas extras sem necessidade.

## How agents generate pages

```
curl.exe -sL "http://localhost:3000/guias/[slug]/pdf" -o "tmp/pdf-review/[slug]/minha-espanha-[slug].pdf"
python scripts/pdf-pages.py "tmp/pdf-review/[slug]/minha-espanha-[slug].pdf"
```

Then **read every `page-XX.png`**. Checklists use `/checklists/[slug]/pdf`.

## After the parallel batch

1. Read `tmp/pdf-review/*-notes.md`.
2. Apply shared renderer fixes once in `src/lib/apostila-pdf.tsx`.
3. Regenerating all affected PDFs and spot-check page images (especially first, a mid page with a table/callout, and last page).
4. Do not commit unless asked.
