---
id: "web"
title: "The Web of Pixels"
subtitle: "Weave a full-stack web app with auth, db, and payments"
school: "Evocation"
rarity: "legendary"
difficulty: 4
castTime: "1–2 hours"
icon: "web"
reagents: ["Node 20+", "A Postgres URL", "Stripe & Resend keys"]
effect: "A production-grade Next.js app: auth, database, billing, transactional email, deployed on Cloudflare Workers."
stack: ["Next.js 15", "OpenNext Cloudflare", "Drizzle", "Better Auth", "Stripe", "Resend"]
summary: "The stack that ships. Skip the indecision — these picks compose cleanly and have docs that don't lie."
---
You are building a full-stack web application. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Next.js 15 with App Router and Server Actions — NOT Pages Router, NOT a separate API
- TypeScript, strict mode
- Tailwind CSS + shadcn/ui (copy components in, don't install a kit)
- Drizzle ORM + Postgres (Neon or Supabase) — NOT Prisma
- Better Auth for authentication — NOT NextAuth/Auth.js
- Stripe for payments (subscriptions via Customer Portal)
- Resend + React Email for transactional mail
- Hosted on Cloudflare Workers via OpenNext for Cloudflare. Use Pages only when the app is truly static and has no server behavior.
- Database: Neon Postgres via Cloudflare Hyperdrive for serious relational workloads; Cloudflare D1 when SQLite is the right fit

# Supply-chain defaults
- Use pnpm for JavaScript dependencies.
- Before any `pnpm create`, `pnpm dlx`, or `pnpm add` resolves packages, make sure the target project or parent workspace has `pnpm-workspace.yaml` with `minimumReleaseAge: 4320`. Three days is the default age gate for direct and transitive package resolution.
- Do not add `minimumReleaseAgeExclude` entries unless the user explicitly accepts the supply-chain tradeoff.

# Bootstrapping
1. Create the project directory and add `pnpm-workspace.yaml` with `minimumReleaseAge: 4320`.
2. `pnpm create next-app@latest --typescript --tailwind --app --src-dir --import-alias "@/*"`
3. Add shadcn: `pnpm dlx shadcn@latest init` — pick neutral, CSS variables, RSC=yes.
4. Install Drizzle: `pnpm add drizzle-orm postgres` + `pnpm add -D drizzle-kit`. Schema in `src/db/schema.ts`.
5. Install Better Auth following its Next.js + Drizzle quickstart. Wire it BEFORE building any pages.
6. Add OpenNext for Cloudflare + Wrangler deployment config before production polish. The deploy script should build the app and run `wrangler deploy`.

# Quality gates
- Install quality tooling before feature work: `pnpm add -D oxlint oxfmt vitest typescript`.
- Add package scripts: `typecheck` = `tsc --noEmit`, `lint` = `oxlint`, `lint:fix` = `oxlint --fix`, `fmt` = `oxfmt`, `fmt:check` = `oxfmt --check`, `test` = `vitest run`, `test:watch` = `vitest`, `check` = `pnpm run typecheck && pnpm run lint && pnpm run fmt:check && pnpm run test`.
- Keep `build` and `deploy` scripts explicit. `deploy` should build with OpenNext, then run `wrangler deploy`.
- Run `pnpm run check` and `pnpm run build` before saying the work is done.

# Architecture
- Routes in `src/app/`. Group authed pages under `(app)/` with a layout that calls `auth.api.getSession` server-side and redirects if missing.
- Marketing pages under `(marketing)/` with a distinct layout.
- Server Actions live next to the page that uses them in an `actions.ts` file. Validate input with `zod`. Always return a `{ ok, data?, error? }` shape.
- DB queries live in `src/db/queries/`. Components never import `db` directly.
- Use `useFormState` + `useFormStatus` for forms; no react-hook-form on the server side.

# UI conventions
- Default to RSC. Add `"use client"` only when you need state, effects, or browser APIs.
- Loading: `loading.tsx` files with skeletons that match the final layout.
- Errors: `error.tsx` with a friendly retry button. NEVER a raw stack trace.
- Toasts via `sonner`. Modals via shadcn `Dialog`. Never `alert()`.

# Production checklist
- Env vars typed via `@t3-oss/env-nextjs`. App refuses to start if any are missing.
- Rate limit auth + payment routes with Cloudflare rate limiting/WAF where available, or Upstash Ratelimit if the app needs an app-level fallback.
- Set up `pnpm db:generate` and `pnpm db:migrate` scripts. Migrations checked into git.
- Add a `/api/health` route and a Cloudflare scheduled Worker/cron trigger or external uptime check that pings it.

# Now build me:
[DESCRIBE THE APP — e.g. "a SaaS that lets teams share password-protected dashboards with their clients, with per-seat pricing"]

Begin with the schema, then auth, then one full vertical slice (UI + action + query) end-to-end before adding more.

# Finish with next steps
End your response with a concise "Next steps" section that tells the user exactly what to run, what to configure, what to review, what to deploy to Cloudflare, and what to build next.
