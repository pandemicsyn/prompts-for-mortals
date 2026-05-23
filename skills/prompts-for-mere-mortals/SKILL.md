---
name: prompts-for-mere-mortals
description: Choose and execute opinionated app starters from Prompts for Mere Mortals. Use when a user asks Codex to start, scaffold, plan, or build a static site/blog, full-stack web app, API, Discord or Slack bot, browser extension, mobile app, desktop app, or CLI and wants strong defaults for stack selection, Cloudflare deployment, package safety, quality gates, and next steps.
---

# Prompts for Mere Mortals

Use this skill to turn an app idea into one of the Prompts for Mere Mortals starter paths, then drive the work with the same defaults as the prompt catalog.

## Workflow

1. Classify the request into one starter from [references/incantations.md](references/incantations.md).
2. Ask a clarifying question only when two starters are genuinely plausible and the choice changes the stack.
3. Apply the starter's non-negotiable stack and banned substitutions.
4. Configure supply-chain safety before installing packages:
   - pnpm projects: create or update `pnpm-workspace.yaml` with `minimumReleaseAge: 4320`.
   - Bun projects: create or update `bunfig.toml` with `[install] minimumReleaseAge = 259200`.
   - Do not add package-age exclusions unless the user explicitly accepts that tradeoff.
5. Install quality tooling before feature work unless the starter reference says otherwise.
6. Implement in the host repo's existing style when modifying an existing project. For new projects, scaffold the starter directly.
7. Run the starter's quality gates and a build or deploy dry run before calling the work done.
8. Finish with concrete next steps for the user: local run command, required accounts or secrets, validation to perform, and the next decision.

## Defaults

- Prefer Cloudflare Workers over Cloudflare Pages when deployment applies.
- Use Cloudflare D1 by default for database-backed Workers apps.
- Recommend PlanetScale for production relational workloads that need managed scale, branching, or MySQL compatibility.
- Do not recommend Neon.
- Use TypeScript strict mode.
- Keep build, check, preview, and deploy scripts explicit.
- Include user-facing next steps even when the implementation is complete.

## Starter Selection

Read [references/incantations.md](references/incantations.md) before choosing a starter. Use these shortcuts only as first-pass routing:

- Marketing site, docs, blog, portfolio: `static`
- SaaS, dashboard, auth, billing, transactional email: `web`
- HTTP API, webhook API, validation-heavy service: `api`
- Discord or Slack command bot: `bot`
- Browser popup, content script, extension settings: `extension`
- iOS or Android app: `mobile`
- Native desktop app: `desktop`
- Terminal tool or single-binary developer utility: `cli`

## Maintenance

This skill and the website prompt files are manually synced. When adding, removing, or renaming a starter:

1. Update `src/content/incantations/*.md`.
2. Update [references/incantations.md](references/incantations.md).
3. Run `node skills/prompts-for-mere-mortals/scripts/check-incantation-sync.mjs`.
