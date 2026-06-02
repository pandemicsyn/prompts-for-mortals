---
id: "desktop"
title: "The Desktop Familiar"
subtitle: "Summon a native app for Mac, Windows & Linux"
school: "Conjuration"
rarity: "epic"
difficulty: 3
userLevel: "Practitioner"
icon: "desktop"
reagents: ["Rust toolchain", "Node 20+", "pnpm"]
effect: "A signed, installable desktop app with a real window, system tray, native menus, and a React UI inside."
stack: ["Tauri 2", "React", "Vite", "TypeScript", "Tailwind"]
summary: "Tauri ships a tiny binary with a Rust core and your web UI. Pick it when size, speed, and signing matter more than Electron's plugin ecosystem."
---
You are building a cross-platform desktop application. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Tauri 2 (Rust backend, webview frontend) — NOT Electron
- Vite + React 18 + TypeScript for the UI
- Tailwind CSS for styling, with a small token-based design system
- pnpm as the package manager
- Biome for lint+format (NOT eslint+prettier)

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
2. From that parent directory, run `pnpm create tauri-app@latest <app-name>` and pick: React, TypeScript, Vite, pnpm.
3. Add Tailwind v4 via `@tailwindcss/vite`. Configure dark mode via `class` on <html>.
4. Set up Biome with `pnpm dlx @biomejs/biome init`.
5. Add required Tauri plugins: `pnpm tauri add store window-state global-shortcut updater`.
6. Add the matching plugin permissions to `src-tauri/capabilities/default.json`.
7. Add a `pnpm tauri dev` script and verify the window opens.

# Quality gates
- Use Biome here because this stack explicitly chose it. Do not add ESLint or Prettier.
- Add package scripts: `typecheck` = `tsc --noEmit`, `lint` = `biome lint .`, `lint:fix` = `biome lint --write .`, `fmt` = `biome format --write .`, `fmt:check` = `biome ci .`, `check` = `pnpm run typecheck && pnpm run lint && pnpm run fmt:check`.
- Add Rust checks: `cargo fmt --manifest-path src-tauri/Cargo.toml --check`, `cargo clippy --manifest-path src-tauri/Cargo.toml -- -D warnings`, and `cargo test --manifest-path src-tauri/Cargo.toml`.
- Run the JS checks, Rust checks, and `pnpm tauri build` or a clearly scoped dev build before saying the work is done.

# Architecture
- Frontend lives in `src/`. Rust commands live in `src-tauri/src/commands/`.
- Every Rust → JS bridge call MUST go through a typed wrapper in `src/lib/ipc.ts`. Never call `invoke()` from a component directly.
- Persist app state with `tauri-plugin-store` (NOT localStorage). Wrap it in a typed `useStore(key, defaultValue)` hook.
- Use `tauri-plugin-window-state` so the window remembers its size/position.

# UI conventions
- Native-feeling: use `-webkit-app-region: drag` on the title bar, custom traffic lights on macOS, ChromeOS-style minimize/maximize on Windows.
- Respect `prefers-color-scheme` on first launch, then let the user override.
- Keyboard shortcuts via `tauri-plugin-global-shortcut`; register them in a single `shortcuts.ts` registry.

# Build & ship
- Configure code signing in `tauri.conf.json` for macOS (Developer ID) and Windows (Authenticode). Leave placeholder env vars.
- Add a GitHub Actions workflow that builds for all three platforms and uploads artifacts.
- Configure auto-updates via `tauri-plugin-updater` pointing at a placeholder JSON endpoint.
- If the app needs a sync API, updater manifest, download page, landing site, hosted install script, or asset delivery, default to Cloudflare Workers. Use R2 for files and Pages only for a purely static site when Workers would add no value.

# Now build me:
[DESCRIBE THE APP HERE — e.g. "a markdown scratchpad with full-text search across all notes"]

Stop and ask questions if any of the above conflicts with what I want. Otherwise produce the full project tree, then implement the features end-to-end. Show me `pnpm tauri dev` running before adding polish.

# Finish with next steps
End your response with a concise "Next steps" section that tells the user exactly what to run, what to configure, what to review, and what to build next.
