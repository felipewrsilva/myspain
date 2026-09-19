# Continuity

Living briefing for this workspace. Read at the start of every turn. Update only on meaningful deltas.

## Goal

Maintain MySpain content/site work with a durable agent briefing and shared cross-project agent operating rules.

## [PLANS]

- 2026-09-19T11:59Z [USER] Establish core agent file structure for all projects (global rules + per-repo `.agent/` + bootstrap skill).

## [DECISIONS]

- 2026-09-19T11:59Z [USER] Always-apply agent ops live in `~/.cursor/rules/agent-*.mdc` so every project inherits them.
- 2026-09-19T11:59Z [USER] Per-repo continuity is `.agent/CONTINUITY.md` (canonical briefing across compaction).
- 2026-09-19T11:59Z [ASSUMPTION] Repo-specific container details belong in `AGENTS.md`; this repo has no Dockerfile/compose yet (UNCONFIRMED until added).

## [PROGRESS]

- 2026-09-19T11:59Z [TOOL] Created global rules: accuracy-sourcing, autonomy-safety, container-first, continuity, baseline-workflow, definition-of-done.
- 2026-09-19T11:59Z [TOOL] Created personal skill `agent-core-bootstrap` with CONTINUITY/AGENTS/README templates.
- 2026-09-19T11:59Z [TOOL] Initialized this file and `.agent/README.md`; appended container stub to `AGENTS.md`.

## [DISCOVERIES]

- 2026-09-19T11:59Z [CODE] `AGENTS.md` is partly auto-managed by Next.js (`<!-- BEGIN:nextjs-agent-rules -->`). Preserve that block; append agent-container section outside it.
- 2026-09-19T11:59Z [CODE] No Dockerfile/compose/Makefile container workflow in this repo yet.

## [OUTCOMES]

- 2026-09-19T12:00Z [TOOL] Core agent structure installed for all projects (global rules + bootstrap skill) and seeded in this repo (`.agent/`, AGENTS container stub). No container workflow created yet (none existed; not required until tooling install).
