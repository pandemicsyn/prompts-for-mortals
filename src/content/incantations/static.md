---
id: "static"
title: "The Eternal Page"
subtitle: "Inscribe a blazing-fast site or blog"
school: "Abjuration"
rarity: "common"
difficulty: 1
castTime: "10–20 min"
icon: "static"
reagents: ["Node 20+", "Markdown"]
effect: "A statically-generated site with MDX, RSS, sitemap, Cloudflare deployment, and a perfect Lighthouse score."
stack: ["Astro", "Tailwind", "MDX", "Astro Content"]
summary: "Astro ships zero JS by default. For a marketing site or blog, nothing else comes close."
---
You are building a static site or blog. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Astro 6+ — NOT Next.js, NOT Gatsby, NOT Jekyll
- Tailwind CSS v4 via the official Vite plugin — NOT the deprecated `@astrojs/tailwind` integration
- MDX for content (`@astrojs/mdx`)
- Astro Content Collections with typed schemas (zod)
- Deployed to Cloudflare Workers by default via `@astrojs/cloudflare` and Wrangler. Use Cloudflare Pages only for a purely static site when the user explicitly wants static hosting.

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
2. `pnpm create astro@latest <app-name> -- --template minimal --typescript strict --install --no-git`
3. Inspect generated Astro package versions against the age gate. If `astro@latest` is too fresh, pin the newest allowed Astro version and run `pnpm install` from the workspace root.
4. Add MDX and sitemap only with compatible age-allowed versions. For example: `pnpm add @astrojs/mdx@<allowed> @astrojs/sitemap@<allowed>`.
5. Add Tailwind v4 with age-allowed versions of `tailwindcss` and `@tailwindcss/vite`, import `@import "tailwindcss";` in the global CSS entry, and add `tailwindcss()` to `vite.plugins` in `astro.config.mjs`.
6. Add `@astrojs/cloudflare` only when there is a compatible age-allowed version for the selected Astro version, set `output: 'server'`, and configure Wrangler for Workers deployment.
7. If the user explicitly requests static-only hosting, document the tradeoff and switch to `output: 'static'` with Cloudflare Pages.

# Quality gates
- Install quality tooling before feature work: `pnpm add -D oxlint oxfmt prettier prettier-plugin-astro @astrojs/check typescript`.
- Add package scripts: `typecheck` = `astro check`, `lint` = `oxlint`, `lint:fix` = `oxlint --fix`, `fmt` = `oxfmt && prettier --write "**/*.astro"`, `fmt:check` = `oxfmt --check && prettier --check "**/*.astro"`, `check` = `pnpm run typecheck && pnpm run lint && pnpm run fmt:check`.
- Use Oxfmt for supported JS/TS/JSON/CSS/Markdown/MDX files and Prettier only for `.astro` component formatting.
- Keep `build` and `deploy` scripts explicit. `deploy` should build first, then run `wrangler deploy`.
- Run `pnpm run check` and `pnpm run build` before saying the work is done.

# Architecture
- `src/content/` with collections like `posts`, `pages`, `projects`. Each has a schema in `src/content.config.ts`.
- `src/layouts/` for shared shells. ONE base layout + thin specializations.
- `src/components/` — `.astro` by default. Only use a framework component for genuine interactivity, with the right `client:*` directive.
- Per-route dynamic logic happens in the frontmatter of `.astro` files. Server work only — no client JS unless it's earning its place.

# Content rules
- Every post has: `title`, `description`, `pubDate`, `updatedDate?`, `tags`, `draft?`, `heroImage?`. Enforced via zod.
- Drafts are filtered out in production but shown in dev.
- Generate an RSS feed at `/rss.xml` via `@astrojs/rss`.
- Sitemap automatic via the integration.

# Performance
- Images via `<Image>` from `astro:assets`. NEVER `<img>` with a raw path.
- Fonts: self-host via `fontsource` packages, NOT Google Fonts CDN.
- View Transitions enabled (`<ViewTransitions />` in the base layout).
- Target: Lighthouse 100/100/100/100 on the homepage. If it drops, that's a bug.

# Now build me:
[DESCRIBE THE SITE — e.g. "a personal blog with an /essays section and a /notes section that I update from my phone"]

Begin with content collection schemas. Then base layout. Then one example post and one example page rendered end-to-end.

# Finish with next steps
End your response with a concise "Next steps" section that tells the user exactly what to run, what to configure in Cloudflare, what content to add next, what to review, and what to deploy.
