---
id: "extension"
title: "The Browser Enchantment"
subtitle: "Bind a spell to Chrome, Firefox & Edge"
school: "Illusion"
rarity: "rare"
difficulty: 2
userLevel: "Apprentice"
icon: "extension"
reagents: ["Node 20+", "Chrome or Firefox"]
effect: "A browser extension with a popup, content scripts, and an options page — that works in every browser."
stack: ["WXT", "React", "TypeScript", "Tailwind"]
summary: "WXT is to extensions what Next.js is to web apps. File-based entrypoints, hot reload, MV3 by default, cross-browser builds."
---
You are building a browser extension. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- WXT (wxt.dev) as the framework — NOT Plasmo, NOT raw manifest.json
- React 18 + TypeScript for any UI surface
- Tailwind CSS, scoped via shadow DOM in content scripts so it doesn't leak
- Manifest V3
- pnpm

# Supply-chain defaults
- Use pnpm for JavaScript dependencies.
- Before any `pnpm create`, `pnpm dlx`, or `pnpm add` resolves packages, create the parent `pnpm-workspace.yaml` from inside the directory where the command will run:
  ```yaml
  packages:
    - <app-name>
  minimumReleaseAge: 4320
  resolutionMode: highest
  ```
- NEVER add `minimumReleaseAgeExclude`. If a required package is too fresh, pin to the newest compatible version that is at least three days old. If no compatible package set exists yet, stop and say the stack needs to wait for packages to age into policy.
- To find the newest allowed version, run `pnpm view <package> time --json` and choose the newest stable version older than the three-day cutoff.

# Bootstrapping
1. Create the parent project directory and add the `pnpm-workspace.yaml` above with `<app-name>` set to the app directory you will scaffold.
2. From that parent directory, run `pnpm dlx wxt@latest init` — pick React + TypeScript and create the app under `<app-name>`.
3. Verify `pnpm dev` opens a Chrome profile with the extension loaded.
4. Add Tailwind per WXT's official guide. In content scripts, mount React into a shadow root.

# Quality gates
- Install quality tooling before feature work: `pnpm add -D oxlint oxfmt vitest typescript`.
- Add package scripts: `typecheck` = `tsc --noEmit`, `lint` = `oxlint`, `lint:fix` = `oxlint --fix`, `fmt` = `oxfmt`, `fmt:check` = `oxfmt --check`, `test` = `vitest run`, `test:watch` = `vitest`, `check` = `pnpm run typecheck && pnpm run lint && pnpm run fmt:check && pnpm run test`.
- Run `pnpm run check` and `pnpm wxt build` before saying the work is done.
- Manually verify at least one Chromium profile load and, when Firefox support is in scope, one Firefox build.

# Architecture (WXT entrypoints)
- `entrypoints/popup/` — the toolbar popup. Small. One job.
- `entrypoints/options/` — full settings page. Persists to `storage.sync`.
- `entrypoints/background.ts` — service worker. ALL cross-context messaging routes through here.
- `entrypoints/content/` — content scripts. Match patterns explicit, never `<all_urls>` unless truly needed.
- Shared code in `utils/` and `components/`.

# Messaging & storage
- Use WXT's built-in storage wrapper from `#imports` with typed storage items. Never raw `browser.storage.*`.
- Use `webext-bridge` or WXT's messaging for popup ↔ background ↔ content. Define message types in a single `messages.ts`.
- Validate every incoming message with zod. Treat content scripts as untrusted.

# UX rules
- The popup opens to USEFUL state in <100ms. If you need to load anything, render a skeleton first.
- Options page has a "Reset to defaults" button.
- Content script injections use `runAt: "document_idle"` unless they truly need earlier.
- Every permission in the manifest has a comment explaining why it's needed.

# Distribution
- WXT can build for Chrome, Firefox, and Edge from one source — set up all three in `wxt.config.ts`.
- Add release workflow that produces signed .zip for the Chrome Web Store and a Firefox .xpi.
- If the extension needs auth, sync, billing, AI calls, webhooks, or a companion API, default to Cloudflare Workers with KV/D1/R2 as appropriate. Do not put secrets in the extension.

# First ask me what to build
Before creating files, ask what I want this browser extension to do in plain English.

Also ask:
- Which browsers matter first: Chrome, Firefox, Edge, or all three.
- Whether I plan to publish it to browser stores or keep it private.
- What page content it needs to read, annotate, block, replace, or modify.
- Which surfaces it needs: popup, options page, background script, content script, side panel, or devtools panel.
- Whether it needs accounts, payments, synced settings, AI calls, webhooks, or a companion API.

Ask only follow-up questions that unblock you. You are the engineering expert: make reasonable product and implementation decisions when the answer is obvious or low-risk. Once you have enough detail, summarize the entrypoints and permissions. Then implement one entrypoint at a time.

# Finish with next steps
End your response with a concise "Next steps" section that tells the user exactly what to run, what to configure in each browser store, what to review, what to deploy to Cloudflare if applicable, and what to build next.
