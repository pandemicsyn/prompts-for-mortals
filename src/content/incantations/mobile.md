---
id: "mobile"
title: "The Pocket Companion"
subtitle: "Conjure an iOS + Android app from a single spell"
school: "Transmutation"
rarity: "epic"
difficulty: 3
castTime: "30–60 min"
icon: "mobile"
reagents: ["Node 20+", "Expo Go on your phone", "Patience"]
effect: "A real native app on your phone in minutes — no Xcode, no Android Studio required to start."
stack: ["Expo SDK 51", "React Native", "Expo Router", "NativeWind", "TypeScript"]
summary: "Expo is the only sane way to start a mobile app in 2026. File-based routing, OTA updates, EAS builds, and you scan a QR code to see it on your phone."
---
You are building a mobile app for iOS and Android using Expo. Follow these constraints EXACTLY:

# Stack (non-negotiable)
- Expo SDK 51+ with the new architecture enabled
- Expo Router v3 (file-based routing) — NOT React Navigation directly
- NativeWind v4 for styling (Tailwind for RN) — NOT StyleSheet.create
- TypeScript, strict mode
- Zustand for global state, TanStack Query for server state
- expo-sqlite + Drizzle ORM for local persistence

# Supply-chain defaults
- Use pnpm for JavaScript dependencies.
- Before any `pnpm create`, `pnpm dlx`, or `pnpm add` resolves packages, make sure the target project or parent workspace has `pnpm-workspace.yaml` with `minimumReleaseAge: 4320`. Three days is the default age gate for direct and transitive package resolution.
- Do not add `minimumReleaseAgeExclude` entries unless the user explicitly accepts the supply-chain tradeoff.

# Bootstrapping
1. Create the project directory and add `pnpm-workspace.yaml` with `minimumReleaseAge: 4320`.
2. `pnpm create expo-app@latest --template default`
3. Add NativeWind v4 following the official Expo Router instructions exactly.
4. Set up Expo Router with a `(tabs)` group and a stack for modals.
5. Configure path aliases (`@/` → `./src/`) in both tsconfig and babel.

# Quality gates
- Install quality tooling before feature work: `pnpm add -D oxlint oxfmt vitest typescript`.
- Add package scripts: `typecheck` = `tsc --noEmit`, `lint` = `oxlint`, `lint:fix` = `oxlint --fix`, `fmt` = `oxfmt`, `fmt:check` = `oxfmt --check`, `test` = `vitest run`, `test:watch` = `vitest`, `check` = `pnpm run typecheck && pnpm run lint && pnpm run fmt:check && pnpm run test`.
- Keep an Expo health script such as `doctor` = `expo-doctor` when the project includes native dependencies.
- Run `pnpm run check` and verify the app in Expo Go before saying the work is done.

# Architecture
- `app/` is routes only. Components live in `src/components/`. Business logic in `src/lib/`.
- Every screen uses `SafeAreaView` from `react-native-safe-area-context`.
- Use `expo-haptics` on every primary action — it makes the app feel real for ~3 lines of code.
- Persist Zustand stores to `expo-secure-store` (for auth) or AsyncStorage (everything else).
- Forms: `react-hook-form` + `zod`. No exceptions.

# UI conventions
- Lean into the platform. Use platform-specific components (`Platform.select`) for tab bars, headers, action sheets.
- Animations via Reanimated 3, NEVER the JS-thread Animated API.
- All taps go through `Pressable` with a subtle opacity/scale transition. No `TouchableOpacity`.
- Loading states: skeleton screens, never spinners on a blank page.

# Shipping
- Configure EAS Build (`eas build:configure`) and add a `development`, `preview`, and `production` profile.
- Set up EAS Update for OTA updates. Default channel = preview.
- Add app icons + splash via `expo-splash-screen` and a single 1024x1024 source.
- If the app needs an API, webhook, auth callback, image endpoint, or background job, default to Cloudflare Workers with D1/KV/R2/Queues as appropriate unless the user asks for another backend.

# Now build me:
[DESCRIBE THE APP — e.g. "a habit tracker with streaks, daily reminder notifications, and Apple Health integration"]

Begin by listing the screens, then the data model, then implement. Show me a working build on Expo Go before adding native modules.

# Finish with next steps
End your response with a concise "Next steps" section that tells the user exactly what to run, what to configure, what to review, and what to build next.
