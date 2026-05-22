---
id: "web"
title: "The Web of Pixels"
subtitle: "Weave a full-stack web app with auth, db, and payments"
school: "Evocation"
rarity: "legendary"
difficulty: 4
castTime: "1–2 hours"
icon: "web"
reagents: ["Node 20+", "D1 or PlanetScale", "Stripe & Resend keys"]
effect: "A production-grade TanStack Start app: auth, database, billing, transactional email, deployed on Cloudflare Workers."
stack: ["TanStack Start", "Cloudflare Workers", "Drizzle", "Better Auth", "Stripe", "Resend"]
summary: "TanStack Start gives you full-stack React without betting the app on a single host. Workers, D1, PlanetScale, and Drizzle keep the deployment honest."
---
You are building a full-stack web application. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- TanStack Start with React and TanStack Router — NOT Next.js, NOT Remix, NOT a separate API
- TypeScript, strict mode
- Tailwind CSS + shadcn/ui (copy components in, don't install a kit)
- Drizzle ORM — NOT Prisma
- Better Auth for authentication — NOT NextAuth/Auth.js
- Stripe for payments (subscriptions via Customer Portal)
- Resend + React Email for transactional mail
- Hosted on Cloudflare Workers. Use Pages only when the app is truly static and has no server behavior.
- Database: Cloudflare D1 by default; PlanetScale for production relational workloads that need managed scale, branching, or MySQL compatibility. Do not use Neon.

# Supply-chain defaults
- Use pnpm for JavaScript dependencies.
- Before any `pnpm create`, `pnpm dlx`, or `pnpm add` resolves packages, make sure the target project or parent workspace has `pnpm-workspace.yaml` with `minimumReleaseAge: 4320`. Three days is the default age gate for direct and transitive package resolution.
- Do not add `minimumReleaseAgeExclude` entries unless the user explicitly accepts the supply-chain tradeoff.

# Bootstrapping
1. Create the project directory and add `pnpm-workspace.yaml` with `minimumReleaseAge: 4320`.
2. `pnpm create cloudflare@latest <app-name> --framework=tanstack-start`
3. Add shadcn/ui using the Vite/TanStack-compatible setup — pick neutral and CSS variables.
4. Install Drizzle and the chosen database driver. For D1: `pnpm add drizzle-orm` + `pnpm add -D drizzle-kit`. For PlanetScale: `pnpm add drizzle-orm @planetscale/database` + `pnpm add -D drizzle-kit`.
5. Install Better Auth with the Drizzle adapter and TanStack Start cookie plugin. Wire it BEFORE building any pages.
6. Configure Wrangler for Workers deployment, including `nodejs_compat` or `nodejs_als` if Better Auth needs AsyncLocalStorage support. The deploy script should build the app and run `wrangler deploy`.

# Quality gates
- Install quality tooling before feature work: `pnpm add -D oxlint oxfmt vitest typescript`.
- Add package scripts: `typecheck` = `tsc --noEmit`, `lint` = `oxlint`, `lint:fix` = `oxlint --fix`, `fmt` = `oxfmt`, `fmt:check` = `oxfmt --check`, `test` = `vitest run`, `test:watch` = `vitest`, `check` = `pnpm run typecheck && pnpm run lint && pnpm run fmt:check && pnpm run test`.
- Keep `build`, `preview`, and `deploy` scripts explicit. `deploy` should build TanStack Start, then run `wrangler deploy`.
- Run `pnpm run check` and `pnpm run build` before saying the work is done.

# Architecture
- Routes in `src/routes/`. Group authed app routes under a clear path/layout boundary that checks the Better Auth session server-side and redirects if missing.
- Marketing pages live in their own route group or layout boundary with no app chrome.
- Server functions live next to the route that uses them in an `actions.ts` or `server.ts` file. Validate input with `zod`. Always return a `{ ok, data?, error? }` shape.
- DB queries live in `src/db/queries/`. Components never import `db` directly.
- Database modules are split by driver: D1 uses Drizzle SQLite tables and Worker bindings; PlanetScale uses Drizzle MySQL tables and `@planetscale/database`.
- Better Auth lives in `src/lib/auth.ts` and uses `drizzleAdapter(db, { provider: "sqlite" })` for D1 or `provider: "mysql"` for PlanetScale. Add `tanstackStartCookies()` as the final Better Auth plugin.

# UI conventions
- Prefer server functions for mutations and loaders for route data. Keep client state local unless it must be shared.
- Pending states use skeletons or disabled controls that match the final layout.
- Errors render friendly recovery UI. NEVER a raw stack trace.
- Toasts via `sonner`. Modals via shadcn `Dialog`. Never `alert()`.

# Production checklist
- Env vars typed via `@t3-oss/env-core`. App refuses to start if any required binding or secret is missing.
- Rate limit auth + payment routes with Cloudflare rate limiting/WAF where available, or Upstash Ratelimit if the app needs an app-level fallback.
- Set up `pnpm db:generate` and `pnpm db:migrate` scripts. For D1, migrations apply through Wrangler. For PlanetScale, migrations target the PlanetScale branch workflow. Migrations are checked into git.
- Add a `/api/health` route and a Cloudflare scheduled Worker/cron trigger or external uptime check that pings it.

# Now build me:
[DESCRIBE THE APP — e.g. "a SaaS that lets teams share password-protected dashboards with their clients, with per-seat pricing"]

Begin with the schema, then auth, then one full vertical slice (UI + action + query) end-to-end before adding more.

# Finish with next steps
End your response with a concise "Next steps" section that tells the user exactly what to run, what to configure, what to review, what to deploy to Cloudflare, and what to build next.
