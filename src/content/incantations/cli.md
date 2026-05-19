---
id: "cli"
title: "The Command-Line Blade"
subtitle: "Forge a fast, beautiful CLI tool"
school: "Enchantment"
rarity: "rare"
difficulty: 2
castTime: "15–30 min"
icon: "cli"
reagents: ["Bun or Node 20+", "A terminal you love"]
effect: "A single-binary CLI with subcommands, gorgeous output, and `--help` that doesn't suck."
stack: ["Bun", "Commander", "Clack prompts", "Picocolors", "Zod"]
summary: "Bun compiles your TS into a single binary. Clack gives you the prompts that ship with Astro. You will look like a wizard."
---
You are building a command-line tool. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Bun 1.1+ as runtime, package manager, AND bundler (`bun build --compile` produces a single binary)
- TypeScript, strict
- Commander.js for argument parsing (NOT yargs, NOT raw process.argv)
- @clack/prompts for any interactive input — NOT inquirer
- picocolors for color (NOT chalk, it's 14x larger)
- zod for validating config files and API responses

# Supply-chain defaults
- Use Bun's package manager.
- Add and commit `bunfig.toml` before installing dependencies:
  ```toml
  [install]
  minimumReleaseAge = 259200
  ```
- Three days is the default age gate for direct and transitive package resolution. Do not add `minimumReleaseAgeExcludes` entries unless the user explicitly accepts the supply-chain tradeoff.

# Bootstrapping
1. `bun init -y`
2. Create `bunfig.toml` with `[install] minimumReleaseAge = 259200`.
3. Add deps: `bun add commander @clack/prompts picocolors zod`
4. Set `"bin": { "your-cli": "./dist/cli.js" }` in package.json.
5. Add a build script: `bun build src/cli.ts --compile --outfile dist/your-cli`

# Quality gates
- Install quality tooling before feature work: `bun add -D oxlint oxfmt typescript`.
- Add package scripts: `typecheck` = `tsc --noEmit`, `lint` = `oxlint`, `lint:fix` = `oxlint --fix`, `fmt` = `oxfmt`, `fmt:check` = `oxfmt --check`, `test` = `bun test`, `check` = `bun run typecheck && bun run lint && bun run fmt:check && bun run test`.
- Keep `build` explicit and make it produce a local binary from the TypeScript entrypoint.
- Run `bun run check` and the compiled binary's `--help` before saying the work is done.

# Architecture
- Entry: `src/cli.ts` ONLY wires the program. Each subcommand is its own file in `src/commands/`.
- Each command exports `{ register(program) }` and a pure `run(opts)` function. The pure function is what you unit test.
- Config lives in `~/.config/<toolname>/config.json`, validated with zod on every read.
- Cache anything network-fetched in `~/.cache/<toolname>/`. Respect `--no-cache`.

# Output conventions
- A consistent log helper: `log.info`, `log.warn`, `log.error`, `log.success` with picocolors prefixes (`ℹ`, `⚠`, `✖`, `✓`).
- Long operations use `@clack/prompts` spinners. Never raw console.log spam.
- Tables via a tiny helper, NOT a 50KB table library.
- Respect `NO_COLOR` and detect TTY — pipe to a file should produce clean text.
- `--json` flag on every command that produces data, for scripting.

# Quality
- Every command has `--help` with examples (`program.addHelpText('after', '...')`).
- Exit codes: 0 success, 1 user error, 2 system error. Always.
- A `--verbose` flag that pipes through to a single debug() helper.

# Distribution
- GitHub Actions matrix builds for darwin-arm64, darwin-x64, linux-x64, win-x64.
- Publish to npm AND attach binaries to a GitHub release.
- A one-liner install script: `curl -fsSL https://your.site/install.sh | bash`.
- If the CLI needs an update manifest, docs site, telemetry intake, license check, sync API, or hosted install script, default to Cloudflare Workers. Use R2 for downloadable artifacts and Pages only when the hosted surface is static-only.

# Now build me:
[DESCRIBE THE TOOL — e.g. "a CLI that takes a Postgres URL and outputs a markdown summary of every table, with row counts"]

Start with the command list and flag surface, get me to approve, then implement.

# Finish with next steps
End your response with a concise "Next steps" section that tells the user exactly what to run, what to configure, what to review, what to publish or deploy, and what to build next.
