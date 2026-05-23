# Incantation Reference

Use this file to choose the right starter and apply its compact defaults. The full public prompt bodies live in `src/content/incantations/*.md`; do not duplicate them here.

## Starter Matrix

| id | title | trigger cues | stack | deploy target |
|---|---|---|---|---|
| `static` | The Eternal Page | site, blog, docs, marketing page, portfolio | Astro 6, Tailwind, MDX, Astro Content Collections | Cloudflare Workers by default; Pages only for explicit static-only hosting |
| `web` | The Web of Pixels | SaaS, dashboard, auth, billing, email, full-stack React | TanStack Start, React, TanStack Router, Tailwind, shadcn/ui, Drizzle, Better Auth, Stripe, Resend | Cloudflare Workers |
| `api` | The Server Keep | HTTP API, webhook API, typed routes, validation, rate limiting | Hono, Cloudflare Workers, Drizzle, D1 or PlanetScale, Zod | Cloudflare Workers |
| `bot` | The Messenger Spirit | Discord bot, Slack bot, slash command, interaction endpoint | Hono, Cloudflare Workers, discord-interactions, D1 or KV | Cloudflare Workers |
| `extension` | The Browser Enchantment | Chrome extension, Firefox extension, popup, content script, options page | WXT, React, TypeScript, Tailwind, Manifest V3 | Browser extension packages |
| `mobile` | The Pocket Companion | iOS app, Android app, Expo, React Native | Expo SDK, Expo Router, NativeWind, Zustand, TanStack Query, expo-sqlite, Drizzle | Expo Go and EAS |
| `desktop` | The Desktop Familiar | native desktop app, macOS app, Windows app, Linux app, tray, native menus | Tauri 2, Rust, Vite, React, TypeScript, Tailwind | Tauri build artifacts |
| `cli` | The Command-Line Blade | CLI, terminal tool, command, single binary, developer utility | Bun, TypeScript, Commander, Clack, Picocolors, Zod | Bun compiled binary |

## Shared Defaults

- Prefer Cloudflare Workers over Pages for deployed web/server surfaces.
- Use D1 by default; recommend PlanetScale for production relational workloads that need managed scale, branching, or MySQL compatibility.
- Do not use Neon.
- Use strict TypeScript.
- Add supply-chain age gates before installs: pnpm `minimumReleaseAge: 4320`, Bun `minimumReleaseAge = 259200`.
- Install quality tooling before feature work.
- Add a single `check` script that runs typecheck, lint, format check, and tests.
- Run checks and a build or deploy dry run before completion.
- End with next steps for the user.

## Starter Defaults

### `static`

- Use Astro 6, not Next.js, Gatsby, or Jekyll.
- Add Tailwind, MDX, sitemap, and typed content collections.
- Deploy with `@astrojs/cloudflare`, `output: "server"`, Wrangler, and an explicit `deploy` script.
- Quality tools: `oxlint`, `oxfmt`, Prettier for `.astro`, `@astrojs/check`, TypeScript.

### `web`

- Use TanStack Start, not Next.js or Remix.
- Use Drizzle, not Prisma.
- Use Better Auth, not NextAuth or Auth.js.
- Use Stripe subscriptions through Customer Portal and Resend plus React Email.
- Configure Wrangler for Workers, including compatibility flags needed by auth/runtime dependencies.
- Use D1 first; PlanetScale when production MySQL compatibility or managed branching matters.

### `api`

- Use Hono with `@hono/zod-validator`, Zod, Drizzle, and Workers.
- For D1, create the database with Wrangler and paste the binding into config.
- For PlanetScale, use Drizzle's PlanetScale serverless path.
- Test routes and bindings with Workers-aware tests rather than mocking Cloudflare APIs when possible.

### `bot`

- Use HTTP interactions on Workers, not a long-running gateway process.
- Use `discord-interactions` for Discord signature verification and types.
- Store required app values as Worker secrets.
- Test signature verification, command dispatch, and deferred replies.

### `extension`

- Use WXT, not Plasmo or raw manifest scaffolding.
- Use React and TypeScript for UI surfaces.
- Use scoped Tailwind in content scripts through shadow DOM.
- Keep match patterns explicit; avoid `<all_urls>` unless truly needed.

### `mobile`

- Use Expo SDK with Expo Router, not raw React Navigation setup.
- Use NativeWind, Zustand, TanStack Query, expo-sqlite, and Drizzle.
- Keep `app/` for routes only; put components and business logic under `src/`.
- Include an Expo health script when native dependencies are present.

### `desktop`

- Use Tauri 2, not Electron.
- Use React, Vite, TypeScript, Tailwind, and Rust commands.
- Use Biome for this starter's JS formatting/linting because the website prompt explicitly chooses it.
- Route every Rust-to-JS bridge call through a typed wrapper.
- Add Rust `fmt`, `clippy`, and test checks.

### `cli`

- Use Bun as runtime, package manager, and bundler.
- Use Commander, Clack, Picocolors, and Zod.
- Build to a local compiled binary with `bun build --compile`.
- Run the compiled binary's `--help` before completion.

## Ambiguity Rules

- If the user asks for a marketing site with a contact form, choose `static` unless they need auth, billing, or a database.
- If the user asks for a dashboard with users, teams, billing, or transactional email, choose `web`.
- If the user asks for server endpoints consumed by another client, choose `api`.
- If the user asks for a bot that listens continuously, redirect to HTTP interactions when possible and choose `bot`.
- If the user asks for desktop plus web, ask whether native OS integration or web deployment matters more.
- If the user asks for mobile plus web, ask whether phone-native APIs are required. Choose `mobile` when they are.
