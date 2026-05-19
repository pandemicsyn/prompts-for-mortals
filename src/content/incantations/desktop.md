---
id: "desktop"
title: "The Desktop Familiar"
subtitle: "Summon a native app for Mac, Windows & Linux"
school: "Conjuration"
rarity: "epic"
difficulty: 3
castTime: "20–40 min"
icon: "desktop"
reagents: ["Rust toolchain", "Node 20+", "pnpm"]
effect: "A signed, installable desktop app with a real window, system tray, native menus, and a React UI inside."
stack: ["Tauri 2", "React", "Vite", "TypeScript", "Tailwind"]
summary: "Tauri ships a 5MB binary that bundles a Rust core with your web UI. Strictly superior to Electron when you care about size, speed, or signing."
---
You are building a cross-platform desktop application. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Tauri 2 (Rust backend, webview frontend) — NOT Electron
- Vite + React 18 + TypeScript for the UI
- Tailwind CSS for styling, with a small token-based design system
- pnpm as the package manager
- Biome for lint+format (NOT eslint+prettier)

# Bootstrapping
1. Run `pnpm create tauri-app@latest` and pick: React, TypeScript, Vite, pnpm.
2. Add Tailwind v4 via `@tailwindcss/vite`. Configure dark mode via `class` on <html>.
3. Set up Biome with `pnpm dlx @biomejs/biome init`.
4. Add a `pnpm tauri dev` script and verify the window opens.

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
