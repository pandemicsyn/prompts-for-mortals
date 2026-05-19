# prompts-for-mortals

Prompts for Mere Mortals is an Astro site that packages the supplied grimoire design as an interactive prompt catalog.

## Development

```sh
pnpm install
pnpm run dev
```

The local site runs at `http://localhost:4321/`.

## Prompt Content

Incantations are Astro Content Collection entries, one prompt per Markdown file:

```text
src/content/incantations/static.md
src/content/incantations/web.md
src/content/incantations/api.md
```

Add or edit prompts by changing those files. Frontmatter is validated in `src/content.config.ts`; the Markdown body becomes the copyable prompt text.

## Checks

```sh
pnpm run check
pnpm run build
```

## Cloudflare Workers

This project uses `@astrojs/cloudflare` with `output: "server"` and a `wrangler.jsonc` worker config.

```sh
pnpm run deploy
```

Before deploying to `promptsformortals.com`, add the domain to the Cloudflare account and attach the route/custom domain to the Worker.
