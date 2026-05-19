---
id: "extension"
title: "The Browser Enchantment"
subtitle: "Bind a spell to Chrome, Firefox & Edge"
school: "Illusion"
rarity: "rare"
difficulty: 2
castTime: "20–40 min"
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

# Bootstrapping
1. `pnpm dlx wxt@latest init` — pick React + TypeScript.
2. Verify `pnpm dev` opens a Chrome profile with the extension loaded.
3. Add Tailwind per WXT's official guide. In content scripts, mount React into a shadow root.

# Architecture (WXT entrypoints)
- `entrypoints/popup/` — the toolbar popup. Small. One job.
- `entrypoints/options/` — full settings page. Persists to `storage.sync`.
- `entrypoints/background.ts` — service worker. ALL cross-context messaging routes through here.
- `entrypoints/content/` — content scripts. Match patterns explicit, never `<all_urls>` unless truly needed.
- Shared code in `utils/` and `components/`.

# Messaging & storage
- Use WXT's `@wxt-dev/storage` wrapper around `browser.storage` with typed schemas. Never raw `browser.storage.*`.
- Use `webext-bridge` or WXT's messaging for popup ↔ background ↔ content. Define message types in a single `messages.ts`.
- Validate every incoming message with zod. Treat content scripts as untrusted.

# UX rules
- The popup opens to USEFUL state in <100ms. If you need to load anything, render a skeleton first.
- Options page has a "Reset to defaults" button.
- Content script injections wait for `document.idle` unless they truly need earlier.
- Every permission in the manifest has a comment explaining why it's needed.

# Distribution
- WXT can build for Chrome, Firefox, and Edge from one source — set up all three in `wxt.config.ts`.
- Add release workflow that produces signed .zip for the Chrome Web Store and a Firefox .xpi.
- If the extension needs auth, sync, billing, AI calls, webhooks, or a companion API, default to Cloudflare Workers with KV/D1/R2 as appropriate. Do not put secrets in the extension.

# Now build me:
[DESCRIBE THE EXTENSION — e.g. "an extension that highlights every dollar amount on a page and shows it in my preferred currency"]

Begin by listing the entrypoints you need and the permissions. Then implement one entrypoint at a time.

# Finish with next steps
End your response with a concise "Next steps" section that tells the user exactly what to run, what to configure in each browser store, what to review, what to deploy to Cloudflare if applicable, and what to build next.
