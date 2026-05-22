---
target: /Users/pandemicsyn/projects/prompts-for-mortals/src/pages/index.astro
total_score: 24
p0_count: 0
p1_count: 2
timestamp: 2026-05-22T13-37-37Z
slug: src-pages-index-astro
---
**Design Health Score**

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Card copy/open actions show loading text, but async failures are ambiguous and card copy status is not announced. |
| 2 | Match System / Real World | 3 | The grimoire metaphor is coherent, but "spells", "schools", and rarity language can obscure the practical job for first-time visitors. |
| 3 | User Control and Freedom | 3 | Search clear, filters, modal escape, and focus restoration are present. No clear recovery path exists when prompt fetch fails. |
| 4 | Consistency and Standards | 3 | Component grammar is cohesive. Card metadata and modal metadata use slightly different labeling systems. |
| 5 | Error Prevention | 2 | Fetch and clipboard failure states exist but are conflated. Users can misread a failed details load as a copy failure. |
| 6 | Recognition Rather Than Recall | 3 | Filters, search, and visible actions are discoverable. Stack tags are truncated on cards, so some technical choice recognition is pushed into details. |
| 7 | Flexibility and Efficiency | 2 | Search and direct copy are efficient. No keyboard accelerators or quick-copy affordance beyond repeated card buttons. |
| 8 | Aesthetic and Minimalist Design | 3 | Strong art direction and better card variety. Ornament, rarity UI, tags, and stat dots still compete for attention. |
| 9 | Error Recovery | 1 | No user-facing recovery copy for failed prompt loads beyond button text changes. Empty search is basic but acceptable. |
| 10 | Help and Documentation | 2 | The footer and modal instructions help. The main catalog does not explain how to choose between similar prompts. |
| **Total** | | **24/40** | **Acceptable: strong concept, but core UX feedback and decision hierarchy need work.** |

**Anti-Patterns Verdict**

LLM assessment: This does not read like default AI SaaS output. The grimoire direction, type choices, rarity system, parchment modal, and copy voice are distinctive. The risk is second-order template behavior inside the chosen fantasy lane: every card has an icon disc, rarity badge, school label, difficulty dots, stack chips, and two buttons. The interface avoids the old identical-card grid problem structurally, but the internal card grammar still repeats heavily.

Deterministic scan: `npx impeccable detect --json src/pages src/components` returned `[]`. No automated Impeccable findings were reported.

Visual overlays: skipped. The Browser plugin was not exposed in this turn and Playwright was not installed in the node runtime. I used source review, the live dev server HTML, and detector output instead.

**Overall Impression**

The site has a clear point of view and no longer feels like a generic card catalog. The biggest opportunity is to make the user journey less ornamental and more decisive: choose a prompt, understand why it fits, copy it, and know what happened.

**What's Working**

- The lazy prompt loading is a good UX and performance tradeoff. The initial catalog stays light while copy/details still fetch the full prompt on demand.
- The modal has meaningful focus handling, Escape support, body scroll lock, and focus restoration.
- The brand voice is specific. The interface is memorable in a category that is usually just utilitarian prompt lists.

**Priority Issues**

**[P1] Failed details load is reported as "Copy failed"**
Why it matters: if `handleOpen` fails, it sets `copyFailedId`, which changes the card copy button to "Copy failed" even though the user clicked "View details". That breaks trust because the UI diagnoses the wrong action.
Fix: split action state by operation. Track `openFailedId` separately from `copyFailedId`, show inline card feedback such as "Details unavailable. Retry", and keep the relevant button in the failed state.
Suggested command: harden

**[P1] Primary path is visually diluted**
Why it matters: users arrive to copy a prompt, but the first fold spends attention on title ceremony, a non-clickable "Browse the prompt library" line, a starter panel, filters, rarity labels, difficulty dots, and two CTAs per card. The path is present, not sharp.
Fix: turn the hero's catalog cue into a real anchor button, make "Copy prompt" visually dominant only once per card, and reduce first-view metadata to outcome plus stack. Move rarity/difficulty deeper unless it changes user choice.
Suggested command: distill

**[P2] Card metadata is still too dense**
Why it matters: each card asks the user to parse school, rarity, starter label, difficulty, cast time, title, subtitle, summary, tags, and two actions. That is a moderate cognitive load for a catalog of only eight prompts.
Fix: keep title, one-line outcome, stack, and primary action on cards. Move school, rarity, difficulty, and cast time to details or make them quieter.
Suggested command: layout

**[P2] Card copy success is visual-only for assistive tech**
Why it matters: the modal has an `aria-live` copy status, but card-level copy only changes button text. Screen reader users may not get a reliable status announcement when copy succeeds or fails.
Fix: add a single visually hidden `aria-live="polite"` status near the catalog that announces "Copied The Eternal Page prompt" or "Could not copy The Eternal Page prompt".
Suggested command: harden

**[P3] The "How to Cast" help appears too late**
Why it matters: the clearest usage instructions live inside the modal after the long prompt text. First-time users may copy before understanding the bracket replacement and review step.
Fix: surface a one-line "Replace the bracketed request, then review the diff" note near the catalog intro or under the primary copy action.
Suggested command: clarify

**Persona Red Flags**

Jordan, first-timer: The first action is not obvious within five seconds because "Browse the prompt library" looks like a label, not an action. The fantasy labels are charming but require translation before practical selection.

Sam, accessibility-dependent user: Focus handling is good in the modal, but card copy status lacks a live region. Visual tags are hidden from assistive tech with a full stack label, which is fine, but action outcomes need the same treatment.

Casey, distracted mobile user: Mobile tap targets are mostly strong, but each card stacks two full-width actions. The user must repeatedly decide between copy and details without a stronger recommendation about when details matter.

**Minor Observations**

- The search empty state is clear but could offer a one-click reset.
- The footer "Return to catalog" is useful, but the primary journey should not depend on reaching the footer.
- The current theme is strong; avoid adding more ornament until hierarchy is sharper.

**Questions to Consider**

- What if the catalog card only answered "What can I build?" and "Copy this"?
- Does rarity help users choose, or does it mostly decorate the system?
- Should first-time visitors be routed to The Eternal Page with stronger confidence, or should all prompts compete equally?
