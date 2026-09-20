# Continuity

Living briefing for this workspace. Read at the start of every turn. Update only on meaningful deltas.

## Goal

Maintain MySpain content/site work with a durable agent briefing and shared cross-project agent operating rules.

## [PLANS]

- 2026-09-19T11:59Z [USER] Establish core agent file structure for all projects (global rules + per-repo `.agent/` + bootstrap skill).
- 2026-09-19T21:26Z [USER] Full UI responsiveness audit and root-cause fixes (mobile-first, no redesign).

## [DECISIONS]

- 2026-09-19T11:59Z [USER] Always-apply agent ops live in `~/.cursor/rules/agent-*.mdc` so every project inherits them.
- 2026-09-19T11:59Z [USER] Per-repo continuity is `.agent/CONTINUITY.md` (canonical briefing across compaction).
- 2026-09-19T11:59Z [ASSUMPTION] Repo-specific container details belong in `AGENTS.md`; this repo has no Dockerfile/compose yet (UNCONFIRMED until added).
- 2026-09-19T12:06Z [USER] Do not create `.agent/README.md`. Layout is only `.agent/CONTINUITY.md` + AGENTS container section.
- 2026-09-19T12:07Z [USER] No bootstrap skill. Core instructions and prompts must not reference `agent-core-bootstrap`.
- 2026-09-19T21:30Z [CODE] MDX tables use `table-fixed` below `sm` and `table-auto` from `sm` up, with cell `break-words`; no forced `min-w-[32rem]`.
- 2026-09-19T21:30Z [CODE] Keep global `overflow-x: clip` as safety net only; root fixes are wrap/`min-w-0`/fluid type and denser grids stacking until `lg` on anúncio.

## [PROGRESS]

- 2026-09-19T11:59Z [TOOL] Created global rules: accuracy-sourcing, autonomy-safety, container-first, continuity, baseline-workflow, definition-of-done.
- 2026-09-19T11:59Z [TOOL] Created personal skill `agent-core-bootstrap` with CONTINUITY/AGENTS/README templates.
- 2026-09-19T11:59Z [TOOL] Initialized this file and `.agent/README.md`; appended container stub to `AGENTS.md`.
- 2026-09-19T21:30Z [TOOL] Responsiveness fixes applied across shell, MDX, contact, guides, anúncio, and shared cards/CTAs.
- 2026-09-19T21:30Z [TOOL] `npm run build` succeeded after fixes. Lint still reports pre-existing `react-hooks/set-state-in-effect` in Header/ChecklistClient/ContinueLinks (unchanged intent).

## [DISCOVERIES]

- 2026-09-19T11:59Z [CODE] `AGENTS.md` is partly auto-managed by Next.js (`<!-- BEGIN:nextjs-agent-rules -->`). Preserve that block; append agent-container section outside it.
- 2026-09-19T11:59Z [CODE] No Dockerfile/compose/Makefile container workflow in this repo yet.
- 2026-09-19T21:28Z [TOOL] Main mobile overflow cause was MDX `min-w-[32rem]` tables; `w-max` alone let long cells expand (~1085px), so mobile uses `table-fixed` instead.
- 2026-09-20T08:42Z [TOOL] Second `next dev` exits if PID already serves `:3000`; reuse existing server.

## [OUTCOMES]

- 2026-09-19T12:00Z [TOOL] Core agent structure installed for all projects (global rules + bootstrap skill) and seeded in this repo (`.agent/`, AGENTS container stub). No container workflow created yet (none existed; not required until tooling install).
- 2026-09-19T12:06Z [TOOL] Removed `.agent/README.md` from this repo.
- 2026-09-19T12:07Z [TOOL] Deleted personal skill `agent-core-bootstrap` and removed all references from core rules and store.
- 2026-09-20T08:42Z [TOOL] Responsiveness audit implemented: fluid tables/text, safer header/footer/contact, anúncio grids stack until `lg`, build green.
