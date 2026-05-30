---
id: "bot"
title: "The Messenger Spirit"
subtitle: "Bind a bot to Discord slash commands"
school: "Necromancy"
rarity: "rare"
difficulty: 2
userLevel: "Apprentice"
icon: "bot"
reagents: ["Cloudflare account", "Discord developer app"]
effect: "A serverless bot that responds to slash commands and runs free-forever on the edge."
stack: ["discord-interactions", "Cloudflare Workers", "Hono", "D1"]
summary: "Discord's HTTP interactions model means your bot is just a function. Put it on Workers, pay $0, sleep soundly."
---
You are building a Discord bot using HTTP interactions on Cloudflare Workers. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Cloudflare Workers (NOT a long-running Node process, NOT discord.js gateway)
- Hono as the router
- discord-interactions for signature verification + types
- Cloudflare D1 for persistence (if needed), KV for ephemeral state
- TypeScript, strict
- Wrangler for deploy

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

# Why HTTP interactions
The websocket gateway requires an always-on process. HTTP interactions let Discord POST to your Worker URL. Free, instant cold-start, no scaling drama.

# Bootstrapping
1. Create the parent project directory and add the `pnpm-workspace.yaml` above with `<app-name>` set to the app directory you will scaffold.
2. From that parent directory, run `pnpm create cloudflare@latest <app-name> --type=hello-world --lang=ts --no-deploy --no-open --no-git --accept-defaults`.
3. Add deps: `pnpm add hono discord-interactions`
4. In Discord Developer Portal: create app, copy PUBLIC_KEY, APPLICATION_ID, and BOT_TOKEN. Put all three in Worker secrets via `pnpm wrangler secret put DISCORD_PUBLIC_KEY`, `pnpm wrangler secret put DISCORD_APPLICATION_ID`, and `pnpm wrangler secret put DISCORD_BOT_TOKEN`.
5. Set the "Interactions Endpoint URL" to your Worker URL. Discord will verify it.

# Quality gates
- Install quality tooling before feature work: `pnpm add -D oxlint oxfmt vitest typescript @cloudflare/vitest-pool-workers`.
- Add package scripts: `typecheck` = `tsc --noEmit`, `lint` = `oxlint`, `lint:fix` = `oxlint --fix`, `fmt` = `oxfmt`, `fmt:check` = `oxfmt --check`, `test` = `vitest run`, `test:watch` = `vitest`, `check` = `pnpm run typecheck && pnpm run lint && pnpm run fmt:check && pnpm run test`.
- Test signature verification, command dispatch, and deferred replies with Workers-aware tests.
- Run `pnpm run check` and a deploy dry run or production build before saying the work is done.

# Architecture
- `src/index.ts` — Hono app with one POST route. Verify signature with `verifyKey` from discord-interactions. If verification fails, return 401.
- `src/commands/` — one file per slash command, each exporting `{ definition, handler }`.
- `src/register.ts` — a script that PUTs the command definitions to Discord's REST API. Run manually after editing commands.
- `src/lib/respond.ts` — typed helpers for ephemeral replies, embeds, components.

# Conventions
- Every command handler returns within 3 seconds OR defers (`type: 5`) and uses a followup via `waitUntil`.
- Validate command options before doing anything else.
- Errors → ephemeral reply with a friendly message + log to Workers logs.
- Use Discord components (buttons, selects, modals) instead of multi-message flows.

# Now build me:
[DESCRIBE THE BOT — e.g. "a bot with /standup that DMs each team member at 9am and posts the summary in #standups"]

Start by listing the slash commands and their options. Then implement `register.ts` and one command end-to-end before adding the rest.

# Finish with next steps
End your response with a concise "Next steps" section that tells the user exactly what to run, which Cloudflare secrets/resources to configure, what to set in the Discord app console, what to review, and what to build next.
