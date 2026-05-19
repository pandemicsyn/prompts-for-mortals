---
id: "bot"
title: "The Messenger Spirit"
subtitle: "Bind a bot to Discord or Slack"
school: "Necromancy"
rarity: "rare"
difficulty: 2
castTime: "20–40 min"
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

# Why HTTP interactions
The websocket gateway requires an always-on process. HTTP interactions let Discord POST to your Worker URL. Free, instant cold-start, no scaling drama.

# Bootstrapping
1. `pnpm create cloudflare@latest -- --type=hello-world --ts`
2. Add deps: `pnpm add hono discord-interactions`
3. In Discord Developer Portal: create app, copy PUBLIC_KEY, APPLICATION_ID, BOT_TOKEN. Put PUBLIC_KEY and APP_ID as Worker secrets via `wrangler secret put`.
4. Set the "Interactions Endpoint URL" to your Worker URL. Discord will verify it.

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
End your response with a concise "Next steps" section that tells the user exactly what to run, which Cloudflare secrets/resources to configure, what to set in the Discord or Slack app console, what to review, and what to build next.
