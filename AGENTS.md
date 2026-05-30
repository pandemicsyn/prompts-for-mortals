# AGENTS.md

Guidance for coding agents working in this repository.

## Project Shape

Prompts for Mere Mortals is an Astro site deployed to Cloudflare Workers. The public site is an interactive prompt catalog with a React island for filtering, viewing, and copying prompt text.

Key files:

- `src/pages/index.astro`: page shell, metadata, content collection loading.
- `src/components/PromptGrimoire.jsx`: main interactive catalog UI.
- `src/styles/global.css`: global visual system, tokens, component styling.
- `src/content/incantations/*.md`: prompt entries. Frontmatter is catalog metadata; Markdown body is the copyable prompt.
- `src/content.config.ts`: content collection schema.
- `skills/prompts-for-mortals/`: companion Codex skill that mirrors the catalog at a compact reference level.
- `.agents/skills/impeccable/`: local Impeccable design skill used for UI critique, setup, and live iteration.
- `PRODUCT.md`: brand and design strategy context for future UI/design work.

## Common Commands

Use pnpm.

```sh
pnpm install
pnpm run dev
pnpm run check
pnpm run build
pnpm run deploy
```

The dev server runs at `http://localhost:4321/`.

`pnpm run deploy` builds the Astro Worker output and deploys with Wrangler to `promptsformortals.com`.

## Editing Prompts

Add or edit public prompts in `src/content/incantations/*.md`.

When adding, removing, or renaming a starter, keep the companion skill in sync:

1. Update the relevant `src/content/incantations/*.md` file.
2. Update `skills/prompts-for-mortals/references/incantations.md`.
3. If the starter set changes, update `skills/prompts-for-mortals/SKILL.md` if needed.
4. Run:

```sh
node skills/prompts-for-mortals/scripts/check-incantation-sync.mjs
```

Prompt entries should stay opinionated and useful. Avoid vague "best practices" language. Name concrete stack choices, constraints, and review expectations.

## UI And Design Work

Follow the existing grimoire identity unless the task explicitly asks for a departure:

- Chunky outlines, tactile shadows, playful but readable copy.
- OKLCH color tokens in `src/styles/global.css`.
- Display type uses Titan One and Fraunces; body uses Nunito.
- Keep interactions accessible: semantic controls, clear focus states, keyboard support, readable contrast, and reduced-motion handling.

For design refinement, use the local Impeccable skill:

```sh
node .agents/skills/impeccable/scripts/context.mjs
```

Then follow the matching reference under `.agents/skills/impeccable/reference/`. The project register is `brand`.

## Pull Request Expectations

This repo includes `.github/pull_request_template.md`. Prompt PRs should explain:

- What is being added or changed.
- Why the prompt deserves a place in the codex.
- Where the author actually used it.
- What the first cast produced and what needed fixing.

## Generated And Local Files

Do not commit build outputs or local caches:

- `dist/`
- `.astro/`
- `.wrangler/`
- `.tmp-*`
- `node_modules/`
- `Prompts For Mere Mortals-2/`

The old `Prompts For Mere Mortals-2/` directory is a local prototype export and is intentionally ignored.

## Before Finishing

For code or UI changes, run:

```sh
pnpm run check
pnpm run build
```

For prompt catalog changes, also run the incantation sync check.

If deploying, report the Cloudflare Worker version from Wrangler output.
