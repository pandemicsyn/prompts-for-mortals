---
id: "api"
title: "The Server Keep"
subtitle: "Erect a fast API at the edge"
school: "Abjuration"
rarity: "epic"
difficulty: 3
castTime: "30–60 min"
icon: "api"
reagents: ["Cloudflare account", "A database"]
effect: "A typed, validated, rate-limited HTTP API deployed worldwide on the edge for free."
stack: ["Hono", "Cloudflare Workers", "Drizzle", "D1 or Neon", "Zod"]
summary: "Hono is what Express wishes it were. Tiny, fast, and you can run it on Workers, Bun, Node, or Deno without changes."
---
You are building an HTTP API. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Hono as the framework (works on Workers, Bun, Node — pick Workers unless told otherwise)
- Cloudflare Workers + Wrangler for deploy
- Drizzle ORM
- Database: Cloudflare D1 for low-volume, Neon Postgres for anything serious
- Zod for ALL input validation via `@hono/zod-validator`
- TypeScript, strict
- pnpm

# Bootstrapping
1. `pnpm create cloudflare@latest -- --type=hello-world --ts`
2. `pnpm add hono @hono/zod-validator zod drizzle-orm`
3. For D1: `wrangler d1 create <name>`, paste binding into wrangler.toml.
4. Drizzle config: `drizzle.config.ts` pointed at `src/db/schema.ts`.

# Architecture
- `src/index.ts` — composes the app. Imports route modules and mounts them.
- `src/routes/<resource>.ts` — one file per resource. Exports a `Hono` sub-app.
- `src/db/schema.ts` — Drizzle schema. `src/db/queries/` — typed query functions.
- `src/middleware/` — auth, rate limiting, logging.
- Every route handler does: validate → authorize → query → respond. No business logic in handlers — extract to `src/services/`.

# API conventions
- JSON only. Error shape: `{ error: { code, message, details? } }`. Codes are SCREAMING_SNAKE strings.
- Versioning via path: `/v1/...`. Never break v1.
- Pagination: cursor-based, `?cursor=...&limit=20`. Response includes `{ data, nextCursor }`.
- Auth via `Authorization: Bearer <token>`. Validate in middleware, attach `c.set('user', user)`.
- Rate limit with Cloudflare's built-in rate limiting binding. Different limits per route group.

# OpenAPI
- Use `@hono/zod-openapi` so every route is documented from its zod schemas. Mount `/docs` with a Scalar or Swagger UI.

# Operational
- Structured JSON logs via a tiny logger middleware. Include request id (`crypto.randomUUID()`) on every log line and in response headers.
- `/health` returns `{ ok: true, version }`. Used by uptime checks.
- Migrations via Drizzle Kit, checked into git, run via `wrangler d1 migrations apply`.

# Now build me:
[DESCRIBE THE API — e.g. "an API for a habit tracker — users, habits, completions, streaks — with API keys for third-party access"]

Begin with the resource list and the schema. Get sign-off, then implement one resource end-to-end with tests before moving on.

# Finish with next steps
End your response with a concise "Next steps" section that tells the user exactly what to run, which Cloudflare bindings/secrets to configure, what to test, what to deploy, and what to build next.
