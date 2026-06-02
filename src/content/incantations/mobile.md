---
id: "mobile"
title: "The Pocket Companion"
subtitle: "Conjure an iOS + Android app from a single spell"
school: "Transmutation"
rarity: "epic"
difficulty: 3
userLevel: "Practitioner"
icon: "mobile"
reagents: ["Node LTS", "Expo account", "A phone or simulator"]
effect: "A real native app on your phone fast — Expo Go when compatible, a development build when native modules demand it."
stack: ["Expo SDK 55", "React Native 0.83", "React 19.2", "Expo Router", "TypeScript"]
summary: "Expo is the fastest practical way to start a serious mobile app in 2026: file-based routing, OTA updates, EAS builds, and a clean path from QR-code prototype to native build."
---
You are building a mobile app for iOS and Android using Expo. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Expo SDK 55 as the strict-age default because it installs under `minimumReleaseAge: 4320`. Use SDK 56 only after all required SDK 56 packages have aged past the three-day gate.
- React Native and React versions come from the selected Expo SDK; do not manually chase React Native versions outside Expo's supported matrix.
- Expo Router (file-based routing) — NOT direct `@react-navigation/*` imports in application code.
- NativeWind v4 for styling if the app needs Tailwind-style utilities. Otherwise use plain React Native styles or Expo UI primitives when they fit better.
- TypeScript, strict mode
- Zustand for global state, TanStack Query for server state
- expo-sqlite + Drizzle ORM for local persistence
- Do not build features around Reanimated unless the requested app needs gesture-heavy or complex UI-thread animation. Some Expo templates include Reanimated/worklets as template dependencies; do not use that as a reason to add animation architecture.

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
2. From that parent directory, run `pnpm create expo-app@latest <app-name> --template default@sdk-55`.
3. If you want SDK 56, first verify every package in the SDK 56 template is older than the three-day cutoff. If any package is too fresh, use SDK 55 or wait; do not bypass the age gate.
4. Run `pnpm exec expo install --fix` after dependency changes so Expo aligns package versions to the selected SDK.
5. Add NativeWind v4 only if the project will use it, following the official Expo Router instructions exactly.
6. Set up Expo Router with a `(tabs)` group and a stack for modals.
7. Configure path aliases (`@/` → `./src/`) in both tsconfig and Metro/Babel config as required by the selected template.

# Quality gates
- Install quality tooling before feature work: `pnpm add -D oxlint oxfmt vitest typescript`.
- Add package scripts: `typecheck` = `tsc --noEmit`, `lint` = `expo lint`, `test` = `vitest run`, `test:watch` = `vitest`, `check` = `pnpm run typecheck && pnpm run lint && pnpm run test`.
- If raw `tsc --noEmit` fails on generated CSS imports, add a small declaration file for `*.css` and `*.module.css`; do not weaken TypeScript strictness.
- Keep an Expo health script such as `doctor` = `expo-doctor` when it is reliable in the project layout. In monorepos, verify any Metro config warning points at an actual app-level config before treating it as a blocker.
- Run `pnpm run check`, `pnpm run doctor`, and verify the app in Expo Go when compatible. If the selected SDK/native module set is not Expo Go-compatible, create and run a development build instead.

# Architecture
- `app/` is routes only. Components live in `src/components/`. Business logic in `src/lib/`.
- Every screen uses `SafeAreaView` from `react-native-safe-area-context`.
- Add `expo-haptics` for primary actions when tactile feedback improves the flow.
- Persist Zustand stores to `expo-secure-store` (for auth) or AsyncStorage (everything else).
- Forms: `react-hook-form` + `zod`. No exceptions.

# UI conventions
- Lean into the platform. Use platform-specific components (`Platform.select`) for tab bars, headers, action sheets.
- Use React Native's built-in Animated API for simple one-off transitions. Add Reanimated only for complex gesture-driven or UI-thread animations.
- All taps go through `Pressable` with a subtle opacity/scale transition. No `TouchableOpacity`.
- Loading states: skeleton screens, never spinners on a blank page.

# Shipping
- Configure EAS Build (`eas build:configure`) and add a `development`, `preview`, and `production` profile.
- Set up EAS Update for OTA updates. Default channel = preview.
- Add app icons + splash via `expo-splash-screen` and a single 1024x1024 source.
- If the app needs an API, webhook, auth callback, image endpoint, or background job, default to Cloudflare Workers with D1/KV/R2/Queues as appropriate unless the user asks for another backend.

# Now build me:
[DESCRIBE THE APP — e.g. "a habit tracker with streaks, daily reminder notifications, and Apple Health integration"]

Begin by listing the screens, then the data model, then implement. Show me the app running in Expo Go when compatible, or in a development build when the SDK/native modules require it.

# Finish with next steps
End your response with a concise "Next steps" section that tells the user exactly what to run, what to configure, what to review, and what to build next.
