---
target: /Users/pandemicsyn/projects/prompts-for-mortals/src/pages/index.astro
total_score: 23
p0_count: 0
p1_count: 3
timestamp: 2026-05-16T18-56-39Z
slug: src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Copy action has feedback, but filter/search state and modal focus state are weak |
| 2 | Match System / Real World | 3 | Strong grimoire metaphor, but some labels feel like costume instead of guidance |
| 3 | User Control and Freedom | 2 | Escape/click-out exists, but modal flow dominates and focus restoration is absent |
| 4 | Consistency and Standards | 3 | Visual system is consistent, but cards and labels repeat too mechanically |
| 5 | Error Prevention | 2 | Low-risk surface, but clipboard failure and search clearing are underdesigned |
| 6 | Recognition Rather Than Recall | 3 | Options are visible; card affordance is clear enough |
| 7 | Flexibility and Efficiency of Use | 2 | No shortcuts, direct linking, or non-modal fast path for power users |
| 8 | Aesthetic and Minimalist Design | 2 | Distinctive, but visually noisy and heavily ornamental |
| 9 | Error Recovery | 2 | Empty search exists, but failure states are thin |
| 10 | Help and Documentation | 2 | Modal instructions help, but guidance is not contextual before choosing |
| **Total** | | **23/40** | **Acceptable, significant improvements needed** |

## Anti-Patterns Verdict

The page does not read as default SaaS AI slop. It has a coherent fantasy-codex identity, self-hosted type, and a memorable tone. The risk is theatrical overcommitment: every layer says "grimoire" at once. Repeated tiny labels, identical cards, modal-first disclosure, star/rune ornament, rarity tags, and scroll treatment make the concept feel less edited than it should.

The deterministic scan returned no findings: `[]`.

Browser overlay injection was not available as a user-visible tab in this turn, so no Human overlay was left open. Production preview and screenshots were used for visual inspection.

## Overall Impression

The first impression is strong: a prompt library with a real identity. The biggest opportunity is editorial restraint. Make the page feel like a curated object, not a theme applied evenly to every component.

## What's Working

1. The fantasy catalog metaphor is immediately legible and more memorable than a plain prompt grid.
2. The rarity and school system gives prompts a useful scanning structure.
3. Progressive disclosure keeps long prompt text out of the card grid until requested.

## Priority Issues

### [P1] The page repeats the same theatrical grammar everywhere

Why it matters: The brand idea is strong, but the repeated labels, dividers, caps, stars, rarity pills, rune corners, and modal scroll all compete. Users stop reading the hierarchy and start reading the decoration.

Fix: Pick one or two signature motifs and demote the rest. Keep the hero ceremonial; make the catalog more usable and quieter.

Suggested command: `impeccable quieter catalog ornamentation`

### [P1] The card grid is visually identical and makes prompts feel interchangeable

Why it matters: A curated collection should guide choice. Eight same-shaped cards with similar internal structure make the user scan every card instead of recognizing which prompt fits their task.

Fix: Add stronger grouping by use case, feature one recommended starter, or make rarity/school filtering more editorial. Reduce repeated card chrome.

Suggested command: `impeccable layout prompt catalog hierarchy`

### [P1] Modal-first disclosure slows the core action

Why it matters: The primary job is "find prompt, copy prompt." Opening a full scroll modal for every prompt adds ceremony between intent and action. It is memorable once, then friction.

Fix: Keep rich detail available, but expose a faster copy or preview path from the card. Let the modal be "read full scroll," not the only route to copy.

Suggested command: `impeccable shape prompt reveal flow`

### [P2] The tone risks parody in utility moments

Why it matters: The site needs people to trust and use the prompts. Lines like "arcane familiars," "Reveal Incantation," "No scrolls found," and the final warranty joke are fun, but utility labels should become clearer as the user gets closer to action.

Fix: Keep brand copy in the hero and section framing; use clearer action labels in controls and empty states.

Suggested command: `impeccable clarify action copy`

### [P2] The visual system is not yet a durable brand system

Why it matters: Tokens exist, but colors and treatments are scattered through CSS and inline styles. That makes future refinement hard and keeps the design from feeling fully intentional.

Fix: Extract roles for ink, parchment, metal, rarity, focus, surface, and action states. Then normalize controls against them.

Suggested command: `impeccable extract design tokens`

## Cognitive Load

Failure count: 2 of 8, moderate.

Failures: minimal choices and visual noise floor. The user sees five filter choices, search, eight cards, rarity, school, difficulty, cast time, stack tags, and reveal CTAs in one sweep. Progressive disclosure is good, but the grid itself is still dense.

## Persona Red Flags

### Jordan, First-Timer

Jordan understands the premise, but may hesitate on "school," "rarity," and "incantation" before realizing these are filters and copyable prompts. The first action is visible, but the utility meaning is hidden under theme language.

### Casey, Distracted Mobile User

Casey gets a memorable page, but key tap targets are small and the primary copy action is buried behind a full modal. Returning after interruption means re-finding the same prompt manually.

### Sam, Accessibility-Dependent User

Sam can reach buttons, but the modal lacks dialog semantics and focus management. The search field has placeholder-only labeling, and several states are visual-first.

## Minor Observations

- The footer joke is on-brand but weak as an ending; the page could end with a useful action.
- "Contribute" points to generic GitHub, which damages trust.
- The H1 text collapses in text extraction as `PromptsFOR · MEREMortals`; visually fine, semantically awkward.
- The about section repeats the premise after the user has already seen it in the hero.

## Questions to Consider

1. What should the catalog optimize for: delight, fastest copy, or teaching users how to prompt well?
2. Should the fantasy language stay everywhere, or should it taper off as the user moves from browsing to copying?
3. What would make one prompt feel clearly recommended for a first-time visitor?
