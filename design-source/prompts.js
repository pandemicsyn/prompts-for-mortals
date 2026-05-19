// The Grand Compendium of Incantations
// Each prompt is opinionated — chosen so a mere mortal can summon working software on the first cast.

window.INCANTATIONS = [
  {
    id: "desktop",
    title: "The Desktop Familiar",
    subtitle: "Summon a native app for Mac, Windows & Linux",
    school: "Conjuration",
    rarity: "epic",
    difficulty: 3,
    castTime: "20–40 min",
    icon: "desktop",
    reagents: ["Rust toolchain", "Node 20+", "pnpm"],
    effect: "A signed, installable desktop app with a real window, system tray, native menus, and a React UI inside.",
    stack: ["Tauri 2", "React", "Vite", "TypeScript", "Tailwind"],
    summary: "Tauri ships a 5MB binary that bundles a Rust core with your web UI. Strictly superior to Electron when you care about size, speed, or signing.",
    prompt: `You are building a cross-platform desktop application. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Tauri 2 (Rust backend, webview frontend) — NOT Electron
- Vite + React 18 + TypeScript for the UI
- Tailwind CSS for styling, with a small token-based design system
- pnpm as the package manager
- Biome for lint+format (NOT eslint+prettier)

# Bootstrapping
1. Run \`pnpm create tauri-app@latest\` and pick: React, TypeScript, Vite, pnpm.
2. Add Tailwind v4 via \`@tailwindcss/vite\`. Configure dark mode via \`class\` on <html>.
3. Set up Biome with \`pnpm dlx @biomejs/biome init\`.
4. Add a \`pnpm tauri dev\` script and verify the window opens.

# Architecture
- Frontend lives in \`src/\`. Rust commands live in \`src-tauri/src/commands/\`.
- Every Rust → JS bridge call MUST go through a typed wrapper in \`src/lib/ipc.ts\`. Never call \`invoke()\` from a component directly.
- Persist app state with \`tauri-plugin-store\` (NOT localStorage). Wrap it in a typed \`useStore(key, defaultValue)\` hook.
- Use \`tauri-plugin-window-state\` so the window remembers its size/position.

# UI conventions
- Native-feeling: use \`-webkit-app-region: drag\` on the title bar, custom traffic lights on macOS, ChromeOS-style minimize/maximize on Windows.
- Respect \`prefers-color-scheme\` on first launch, then let the user override.
- Keyboard shortcuts via \`tauri-plugin-global-shortcut\`; register them in a single \`shortcuts.ts\` registry.

# Build & ship
- Configure code signing in \`tauri.conf.json\` for macOS (Developer ID) and Windows (Authenticode). Leave placeholder env vars.
- Add a GitHub Actions workflow that builds for all three platforms and uploads artifacts.
- Configure auto-updates via \`tauri-plugin-updater\` pointing at a placeholder JSON endpoint.

# Now build me:
[DESCRIBE THE APP HERE — e.g. "a markdown scratchpad with full-text search across all notes"]

Stop and ask questions if any of the above conflicts with what I want. Otherwise produce the full project tree, then implement the features end-to-end. Show me \`pnpm tauri dev\` running before adding polish.`
  },
  {
    id: "mobile",
    title: "The Pocket Companion",
    subtitle: "Conjure an iOS + Android app from a single spell",
    school: "Transmutation",
    rarity: "epic",
    difficulty: 3,
    castTime: "30–60 min",
    icon: "mobile",
    reagents: ["Node 20+", "Expo Go on your phone", "Patience"],
    effect: "A real native app on your phone in minutes — no Xcode, no Android Studio required to start.",
    stack: ["Expo SDK 51", "React Native", "Expo Router", "NativeWind", "TypeScript"],
    summary: "Expo is the only sane way to start a mobile app in 2026. File-based routing, OTA updates, EAS builds, and you scan a QR code to see it on your phone.",
    prompt: `You are building a mobile app for iOS and Android using Expo. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Expo SDK 51+ with the new architecture enabled
- Expo Router v3 (file-based routing) — NOT React Navigation directly
- NativeWind v4 for styling (Tailwind for RN) — NOT StyleSheet.create
- TypeScript, strict mode
- Zustand for global state, TanStack Query for server state
- expo-sqlite + Drizzle ORM for local persistence

# Bootstrapping
1. \`pnpm create expo-app@latest --template default\`
2. Add NativeWind v4 following the official Expo Router instructions exactly.
3. Set up Expo Router with a \`(tabs)\` group and a stack for modals.
4. Configure path aliases (\`@/\` → \`./src/\`) in both tsconfig and babel.

# Architecture
- \`app/\` is routes only. Components live in \`src/components/\`. Business logic in \`src/lib/\`.
- Every screen uses \`SafeAreaView\` from \`react-native-safe-area-context\`.
- Use \`expo-haptics\` on every primary action — it makes the app feel real for ~3 lines of code.
- Persist Zustand stores to \`expo-secure-store\` (for auth) or AsyncStorage (everything else).
- Forms: \`react-hook-form\` + \`zod\`. No exceptions.

# UI conventions
- Lean into the platform. Use platform-specific components (\`Platform.select\`) for tab bars, headers, action sheets.
- Animations via Reanimated 3, NEVER the JS-thread Animated API.
- All taps go through \`Pressable\` with a subtle opacity/scale transition. No \`TouchableOpacity\`.
- Loading states: skeleton screens, never spinners on a blank page.

# Shipping
- Configure EAS Build (\`eas build:configure\`) and add a \`development\`, \`preview\`, and \`production\` profile.
- Set up EAS Update for OTA updates. Default channel = preview.
- Add app icons + splash via \`expo-splash-screen\` and a single 1024x1024 source.

# Now build me:
[DESCRIBE THE APP — e.g. "a habit tracker with streaks, daily reminder notifications, and Apple Health integration"]

Begin by listing the screens, then the data model, then implement. Show me a working build on Expo Go before adding native modules.`
  },
  {
    id: "web",
    title: "The Web of Pixels",
    subtitle: "Weave a full-stack web app with auth, db, and payments",
    school: "Evocation",
    rarity: "legendary",
    difficulty: 4,
    castTime: "1–2 hours",
    icon: "web",
    reagents: ["Node 20+", "A Postgres URL", "Stripe & Resend keys"],
    effect: "A production-grade Next.js app: auth, database, billing, transactional email, deployed on Vercel.",
    stack: ["Next.js 15", "Drizzle", "Better Auth", "shadcn/ui", "Stripe", "Resend"],
    summary: "The stack that ships. Skip the indecision — these picks compose cleanly and have docs that don't lie.",
    prompt: `You are building a full-stack web application. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Next.js 15 with App Router and Server Actions — NOT Pages Router, NOT a separate API
- TypeScript, strict mode
- Tailwind CSS + shadcn/ui (copy components in, don't install a kit)
- Drizzle ORM + Postgres (Neon or Supabase) — NOT Prisma
- Better Auth for authentication — NOT NextAuth/Auth.js
- Stripe for payments (subscriptions via Customer Portal)
- Resend + React Email for transactional mail
- Hosted on Vercel; Postgres on Neon

# Bootstrapping
1. \`pnpm create next-app@latest --typescript --tailwind --app --src-dir --import-alias "@/*"\`
2. Add shadcn: \`pnpm dlx shadcn@latest init\` — pick neutral, CSS variables, RSC=yes.
3. Install Drizzle: \`pnpm add drizzle-orm postgres\` + \`pnpm add -D drizzle-kit\`. Schema in \`src/db/schema.ts\`.
4. Install Better Auth following its Next.js + Drizzle quickstart. Wire it BEFORE building any pages.

# Architecture
- Routes in \`src/app/\`. Group authed pages under \`(app)/\` with a layout that calls \`auth.api.getSession\` server-side and redirects if missing.
- Marketing pages under \`(marketing)/\` with a distinct layout.
- Server Actions live next to the page that uses them in an \`actions.ts\` file. Validate input with \`zod\`. Always return a \`{ ok, data?, error? }\` shape.
- DB queries live in \`src/db/queries/\`. Components never import \`db\` directly.
- Use \`useFormState\` + \`useFormStatus\` for forms; no react-hook-form on the server side.

# UI conventions
- Default to RSC. Add \`"use client"\` only when you need state, effects, or browser APIs.
- Loading: \`loading.tsx\` files with skeletons that match the final layout.
- Errors: \`error.tsx\` with a friendly retry button. NEVER a raw stack trace.
- Toasts via \`sonner\`. Modals via shadcn \`Dialog\`. Never \`alert()\`.

# Production checklist
- Env vars typed via \`@t3-oss/env-nextjs\`. App refuses to start if any are missing.
- Rate limit auth + payment routes with Upstash Ratelimit.
- Set up \`pnpm db:generate\` and \`pnpm db:migrate\` scripts. Migrations checked into git.
- Add a \`/api/health\` route and a Vercel cron that pings it.

# Now build me:
[DESCRIBE THE APP — e.g. "a SaaS that lets teams share password-protected dashboards with their clients, with per-seat pricing"]

Begin with the schema, then auth, then one full vertical slice (UI + action + query) end-to-end before adding more.`
  },
  {
    id: "cli",
    title: "The Command-Line Blade",
    subtitle: "Forge a fast, beautiful CLI tool",
    school: "Enchantment",
    rarity: "rare",
    difficulty: 2,
    castTime: "15–30 min",
    icon: "cli",
    reagents: ["Bun or Node 20+", "A terminal you love"],
    effect: "A single-binary CLI with subcommands, gorgeous output, and \`--help\` that doesn't suck.",
    stack: ["Bun", "Commander", "Clack prompts", "Picocolors", "Zod"],
    summary: "Bun compiles your TS into a single binary. Clack gives you the prompts that ship with Astro. You will look like a wizard.",
    prompt: `You are building a command-line tool. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Bun 1.1+ as runtime, package manager, AND bundler (\`bun build --compile\` produces a single binary)
- TypeScript, strict
- Commander.js for argument parsing (NOT yargs, NOT raw process.argv)
- @clack/prompts for any interactive input — NOT inquirer
- picocolors for color (NOT chalk, it's 14x larger)
- zod for validating config files and API responses

# Bootstrapping
1. \`bun init -y\`
2. Add deps: \`bun add commander @clack/prompts picocolors zod\`
3. Set \`"bin": { "your-cli": "./dist/cli.js" }\` in package.json.
4. Add a build script: \`bun build src/cli.ts --compile --outfile dist/your-cli\`

# Architecture
- Entry: \`src/cli.ts\` ONLY wires the program. Each subcommand is its own file in \`src/commands/\`.
- Each command exports \`{ register(program) }\` and a pure \`run(opts)\` function. The pure function is what you unit test.
- Config lives in \`~/.config/<toolname>/config.json\`, validated with zod on every read.
- Cache anything network-fetched in \`~/.cache/<toolname>/\`. Respect \`--no-cache\`.

# Output conventions
- A consistent log helper: \`log.info\`, \`log.warn\`, \`log.error\`, \`log.success\` with picocolors prefixes (\`ℹ\`, \`⚠\`, \`✖\`, \`✓\`).
- Long operations use \`@clack/prompts\` spinners. Never raw console.log spam.
- Tables via a tiny helper, NOT a 50KB table library.
- Respect \`NO_COLOR\` and detect TTY — pipe to a file should produce clean text.
- \`--json\` flag on every command that produces data, for scripting.

# Quality
- Every command has \`--help\` with examples (\`program.addHelpText('after', '...')\`).
- Exit codes: 0 success, 1 user error, 2 system error. Always.
- A \`--verbose\` flag that pipes through to a single debug() helper.

# Distribution
- GitHub Actions matrix builds for darwin-arm64, darwin-x64, linux-x64, win-x64.
- Publish to npm AND attach binaries to a GitHub release.
- A one-liner install script: \`curl -fsSL https://your.site/install.sh | bash\`.

# Now build me:
[DESCRIBE THE TOOL — e.g. "a CLI that takes a Postgres URL and outputs a markdown summary of every table, with row counts"]

Start with the command list and flag surface, get me to approve, then implement.`
  },
  {
    id: "extension",
    title: "The Browser Enchantment",
    subtitle: "Bind a spell to Chrome, Firefox & Edge",
    school: "Illusion",
    rarity: "rare",
    difficulty: 2,
    castTime: "20–40 min",
    icon: "extension",
    reagents: ["Node 20+", "Chrome or Firefox"],
    effect: "A browser extension with a popup, content scripts, and an options page — that works in every browser.",
    stack: ["WXT", "React", "TypeScript", "Tailwind"],
    summary: "WXT is to extensions what Next.js is to web apps. File-based entrypoints, hot reload, MV3 by default, cross-browser builds.",
    prompt: `You are building a browser extension. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- WXT (wxt.dev) as the framework — NOT Plasmo, NOT raw manifest.json
- React 18 + TypeScript for any UI surface
- Tailwind CSS, scoped via shadow DOM in content scripts so it doesn't leak
- Manifest V3
- pnpm

# Bootstrapping
1. \`pnpm dlx wxt@latest init\` — pick React + TypeScript.
2. Verify \`pnpm dev\` opens a Chrome profile with the extension loaded.
3. Add Tailwind per WXT's official guide. In content scripts, mount React into a shadow root.

# Architecture (WXT entrypoints)
- \`entrypoints/popup/\` — the toolbar popup. Small. One job.
- \`entrypoints/options/\` — full settings page. Persists to \`storage.sync\`.
- \`entrypoints/background.ts\` — service worker. ALL cross-context messaging routes through here.
- \`entrypoints/content/\` — content scripts. Match patterns explicit, never \`<all_urls>\` unless truly needed.
- Shared code in \`utils/\` and \`components/\`.

# Messaging & storage
- Use WXT's \`@wxt-dev/storage\` wrapper around \`browser.storage\` with typed schemas. Never raw \`browser.storage.*\`.
- Use \`webext-bridge\` or WXT's messaging for popup ↔ background ↔ content. Define message types in a single \`messages.ts\`.
- Validate every incoming message with zod. Treat content scripts as untrusted.

# UX rules
- The popup opens to USEFUL state in <100ms. If you need to load anything, render a skeleton first.
- Options page has a "Reset to defaults" button.
- Content script injections wait for \`document.idle\` unless they truly need earlier.
- Every permission in the manifest has a comment explaining why it's needed.

# Distribution
- WXT can build for Chrome, Firefox, and Edge from one source — set up all three in \`wxt.config.ts\`.
- Add release workflow that produces signed .zip for the Chrome Web Store and a Firefox .xpi.

# Now build me:
[DESCRIBE THE EXTENSION — e.g. "an extension that highlights every dollar amount on a page and shows it in my preferred currency"]

Begin by listing the entrypoints you need and the permissions. Then implement one entrypoint at a time.`
  },
  {
    id: "bot",
    title: "The Messenger Spirit",
    subtitle: "Bind a bot to Discord or Slack",
    school: "Necromancy",
    rarity: "rare",
    difficulty: 2,
    castTime: "20–40 min",
    icon: "bot",
    reagents: ["Cloudflare account", "Discord developer app"],
    effect: "A serverless bot that responds to slash commands and runs free-forever on the edge.",
    stack: ["discord-interactions", "Cloudflare Workers", "Hono", "D1"],
    summary: "Discord's HTTP interactions model means your bot is just a function. Put it on Workers, pay $0, sleep soundly.",
    prompt: `You are building a Discord bot using HTTP interactions on Cloudflare Workers. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Cloudflare Workers (NOT a long-running Node process, NOT discord.js gateway)
- Hono as the router
- discord-interactions for signature verification + types
- Cloudflare D1 for persistence (if needed), KV for ephemeral state
- TypeScript, strict
- Wrangler for deploy

# Why HTTP interactions
The websocket gateway requires an always-on process. HTTP interactions let Discord POST to your Worker URL. Free, instant cold-start, no scaling drama.

# Bootstrapping
1. \`pnpm create cloudflare@latest -- --type=hello-world --ts\`
2. Add deps: \`pnpm add hono discord-interactions\`
3. In Discord Developer Portal: create app, copy PUBLIC_KEY, APPLICATION_ID, BOT_TOKEN. Put PUBLIC_KEY and APP_ID as Worker secrets via \`wrangler secret put\`.
4. Set the "Interactions Endpoint URL" to your Worker URL. Discord will verify it.

# Architecture
- \`src/index.ts\` — Hono app with one POST route. Verify signature with \`verifyKey\` from discord-interactions. If verification fails, return 401.
- \`src/commands/\` — one file per slash command, each exporting \`{ definition, handler }\`.
- \`src/register.ts\` — a script that PUTs the command definitions to Discord's REST API. Run manually after editing commands.
- \`src/lib/respond.ts\` — typed helpers for ephemeral replies, embeds, components.

# Conventions
- Every command handler returns within 3 seconds OR defers (\`type: 5\`) and uses a followup via \`waitUntil\`.
- Validate command options before doing anything else.
- Errors → ephemeral reply with a friendly message + log to Workers logs.
- Use Discord components (buttons, selects, modals) instead of multi-message flows.

# Now build me:
[DESCRIBE THE BOT — e.g. "a bot with /standup that DMs each team member at 9am and posts the summary in #standups"]

Start by listing the slash commands and their options. Then implement \`register.ts\` and one command end-to-end before adding the rest.`
  },
  {
    id: "static",
    title: "The Eternal Page",
    subtitle: "Inscribe a blazing-fast site or blog",
    school: "Abjuration",
    rarity: "common",
    difficulty: 1,
    castTime: "10–20 min",
    icon: "static",
    reagents: ["Node 20+", "Markdown"],
    effect: "A statically-generated site with MDX, RSS, sitemap, and a perfect Lighthouse score.",
    stack: ["Astro", "Tailwind", "MDX", "Astro Content"],
    summary: "Astro ships zero JS by default. For a marketing site or blog, nothing else comes close.",
    prompt: `You are building a static site or blog. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Astro 4+ — NOT Next.js, NOT Gatsby, NOT Jekyll
- Tailwind CSS via the official integration
- MDX for content (\`@astrojs/mdx\`)
- Astro Content Collections with typed schemas (zod)
- Deployed to Cloudflare Pages or Vercel (static output)

# Bootstrapping
1. \`pnpm create astro@latest\` — pick "Empty", TypeScript strict.
2. \`pnpm astro add tailwind mdx sitemap\`
3. Set \`output: 'static'\` in astro.config.mjs.

# Architecture
- \`src/content/\` with collections like \`posts\`, \`pages\`, \`projects\`. Each has a schema in \`src/content/config.ts\`.
- \`src/layouts/\` for shared shells. ONE base layout + thin specializations.
- \`src/components/\` — \`.astro\` by default. Only use a framework component for genuine interactivity, with the right \`client:*\` directive.
- Per-route dynamic logic happens in the frontmatter of \`.astro\` files. Server work only — no client JS unless it's earning its place.

# Content rules
- Every post has: \`title\`, \`description\`, \`pubDate\`, \`updatedDate?\`, \`tags\`, \`draft?\`, \`heroImage?\`. Enforced via zod.
- Drafts are filtered out in production but shown in dev.
- Generate an RSS feed at \`/rss.xml\` via \`@astrojs/rss\`.
- Sitemap automatic via the integration.

# Performance
- Images via \`<Image>\` from \`astro:assets\`. NEVER \`<img>\` with a raw path.
- Fonts: self-host via \`fontsource\` packages, NOT Google Fonts CDN.
- View Transitions enabled (\`<ViewTransitions />\` in the base layout).
- Target: Lighthouse 100/100/100/100 on the homepage. If it drops, that's a bug.

# Now build me:
[DESCRIBE THE SITE — e.g. "a personal blog with an /essays section and a /notes section that I update from my phone"]

Begin with content collection schemas. Then base layout. Then one example post and one example page rendered end-to-end.`
  },
  {
    id: "api",
    title: "The Server Keep",
    subtitle: "Erect a fast API at the edge",
    school: "Abjuration",
    rarity: "epic",
    difficulty: 3,
    castTime: "30–60 min",
    icon: "api",
    reagents: ["Cloudflare account", "A database"],
    effect: "A typed, validated, rate-limited HTTP API deployed worldwide on the edge for free.",
    stack: ["Hono", "Cloudflare Workers", "Drizzle", "D1 or Neon", "Zod"],
    summary: "Hono is what Express wishes it were. Tiny, fast, and you can run it on Workers, Bun, Node, or Deno without changes.",
    prompt: `You are building an HTTP API. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Hono as the framework (works on Workers, Bun, Node — pick Workers unless told otherwise)
- Cloudflare Workers + Wrangler for deploy
- Drizzle ORM
- Database: Cloudflare D1 for low-volume, Neon Postgres for anything serious
- Zod for ALL input validation via \`@hono/zod-validator\`
- TypeScript, strict
- pnpm

# Bootstrapping
1. \`pnpm create cloudflare@latest -- --type=hello-world --ts\`
2. \`pnpm add hono @hono/zod-validator zod drizzle-orm\`
3. For D1: \`wrangler d1 create <name>\`, paste binding into wrangler.toml.
4. Drizzle config: \`drizzle.config.ts\` pointed at \`src/db/schema.ts\`.

# Architecture
- \`src/index.ts\` — composes the app. Imports route modules and mounts them.
- \`src/routes/<resource>.ts\` — one file per resource. Exports a \`Hono\` sub-app.
- \`src/db/schema.ts\` — Drizzle schema. \`src/db/queries/\` — typed query functions.
- \`src/middleware/\` — auth, rate limiting, logging.
- Every route handler does: validate → authorize → query → respond. No business logic in handlers — extract to \`src/services/\`.

# API conventions
- JSON only. Error shape: \`{ error: { code, message, details? } }\`. Codes are SCREAMING_SNAKE strings.
- Versioning via path: \`/v1/...\`. Never break v1.
- Pagination: cursor-based, \`?cursor=...&limit=20\`. Response includes \`{ data, nextCursor }\`.
- Auth via \`Authorization: Bearer <token>\`. Validate in middleware, attach \`c.set('user', user)\`.
- Rate limit with Cloudflare's built-in rate limiting binding. Different limits per route group.

# OpenAPI
- Use \`@hono/zod-openapi\` so every route is documented from its zod schemas. Mount \`/docs\` with a Scalar or Swagger UI.

# Operational
- Structured JSON logs via a tiny logger middleware. Include request id (\`crypto.randomUUID()\`) on every log line and in response headers.
- \`/health\` returns \`{ ok: true, version }\`. Used by uptime checks.
- Migrations via Drizzle Kit, checked into git, run via \`wrangler d1 migrations apply\`.

# Now build me:
[DESCRIBE THE API — e.g. "an API for a habit tracker — users, habits, completions, streaks — with API keys for third-party access"]

Begin with the resource list and the schema. Get sign-off, then implement one resource end-to-end with tests before moving on.`
  }
];
