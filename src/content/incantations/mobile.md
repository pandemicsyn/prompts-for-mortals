---
id: "mobile"
title: "The Pocket Companion"
subtitle: "Conjure an iOS + Android app from a single spell"
school: "Transmutation"
rarity: "epic"
difficulty: 3
castTime: "30–60 min"
icon: "mobile"
reagents: ["Node LTS", "Expo account", "A phone or simulator"]
effect: "A real native app on your phone fast — Expo Go when compatible, a development build when native modules demand it."
stack: ["Expo SDK 56", "React Native 0.85", "React 19.2.3", "Expo Router", "TypeScript"]
summary: "Expo is the only sane way to start a mobile app in 2026. File-based routing, OTA updates, EAS builds, and a clean path from QR-code prototype to native build."
---
You are building a mobile app for iOS and Android using Expo. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Expo SDK 56 when native builds are acceptable. Use SDK 55 only when Expo Go on a physical device is the user's explicit priority during the SDK 56 transition.
- React Native 0.85 and React 19.2.3 through Expo SDK 56; do not manually chase React Native versions outside Expo's supported matrix.
- Expo Router (file-based routing) — NOT direct `@react-navigation/*` imports in application code.
- NativeWind v4 for styling if the app needs Tailwind-style utilities. Otherwise use plain React Native styles or Expo UI primitives when they fit better.
- TypeScript, strict mode
- Zustand for global state, TanStack Query for server state
- expo-sqlite + Drizzle ORM for local persistence
- Do not add Reanimated by default. Add it only when the requested app needs gesture-heavy or complex UI-thread animation.

# Supply-chain defaults
- Use pnpm for JavaScript dependencies.
- Before any `pnpm create`, `pnpm dlx`, or `pnpm add` resolves packages, make sure the target project or parent workspace has `pnpm-workspace.yaml` with `minimumReleaseAge: 4320`. Three days is the default age gate for direct and transitive package resolution.
- Do not add `minimumReleaseAgeExclude` entries unless the user explicitly accepts the supply-chain tradeoff.

# Bootstrapping
1. Create the project directory and add `pnpm-workspace.yaml` with `minimumReleaseAge: 4320`.
2. For SDK 56: `pnpm create expo-app@latest --template default@sdk-56`. For Expo Go-first SDK 55 work: `pnpm create expo-app@latest --template default@sdk-55`.
3. Run `pnpm exec expo install --fix` after dependency changes so Expo aligns package versions to the selected SDK.
4. Add NativeWind v4 only if the project will use it, following the official Expo Router instructions exactly.
5. Set up Expo Router with a `(tabs)` group and a stack for modals.
6. Configure path aliases (`@/` → `./src/`) in both tsconfig and Metro/Babel config as required by the selected template.

# Quality gates
- Install quality tooling before feature work: `pnpm add -D oxlint oxfmt vitest typescript`.
- Add package scripts: `typecheck` = `tsc --noEmit`, `lint` = `oxlint`, `lint:fix` = `oxlint --fix`, `fmt` = `oxfmt`, `fmt:check` = `oxfmt --check`, `test` = `vitest run`, `test:watch` = `vitest`, `check` = `pnpm run typecheck && pnpm run lint && pnpm run fmt:check && pnpm run test`.
- Keep an Expo health script such as `doctor` = `expo-doctor` when the project includes native dependencies.
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
