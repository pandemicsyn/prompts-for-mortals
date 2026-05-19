# prompts-for-mortals

Prompts for Mere Mortals is an Astro site that packages the supplied grimoire design as an interactive prompt catalog.

## Development

```sh
pnpm install
pnpm run dev
```

The local site runs at `http://localhost:4321/`.

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
