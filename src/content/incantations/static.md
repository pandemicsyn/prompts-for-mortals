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
- Tailwind CSS via the official integration
- MDX for content (`@astrojs/mdx`)
- Astro Content Collections with typed schemas (zod)
- Deployed to Cloudflare Workers by default via `@astrojs/cloudflare` and Wrangler. Use Cloudflare Pages only for a purely static site when the user explicitly wants static hosting.

# Bootstrapping
1. `pnpm create astro@latest` — pick "Empty", TypeScript strict.
2. `pnpm astro add tailwind mdx sitemap`
3. Add `@astrojs/cloudflare`, set `output: 'server'`, and configure Wrangler for Workers deployment.
4. If the user explicitly requests static-only hosting, document the tradeoff and switch to `output: 'static'` with Cloudflare Pages.

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
