# DDALKAK LAB — Master Project Specification / Recommendation A

**Status:** integrated implementation specification · 2026-10-10  
**Source:** user-supplied 739-line markdown, “DDALKAK LAB / HAI Research Platform” (2026-10-09).  
**Related:** `docs/signature-motion-design.md`, `docs/site-architecture.md`, `AGENTS.md`.

> **Important:** This document consolidates only the source shared here, relevant verified repository state, and confirmed decisions. It is **not** a verbatim export of every historical ChatGPT conversation.

## 1. Decision hierarchy

1. **Recommendation A (selected by the user):** signature original **DDALKAK CORE**, dedicated **HAI Lab**, separate **Agent Company** concept; Iron Man arc-reactor is inspiration only and no franchise material is copied.
2. **Latest student-centered platform decision (2026-10-09):** real student Projects → Learn remain the principal purpose and user journey. Do not replace the website with a science-fiction marketing splash page.
3. **Research continuity:** `/research`, `/methods`, `/archive`, `/registry`, `/handbook`, `/system` remain accessible, with evidence vs prototype vs proposal clearly labeled.
4. **Integrity:** never fabricate experiments, members, affiliations, API calls, outcomes, data, or achievements.

If an older recommendation conflicts with an explicitly newer decision, preserve the user-facing intent of A but adapt its implementation to the newer constraint. In particular: white/off-white, ink and restrained **blue** govern the learning platform; orange/cyan and dark UI appear in bounded HAI/CORE/Agent modules.

## 2. Brand and research identity (A source §§A–B)

- Research framing: **Business × Media & Communication × Human–AI Interaction**.
- Keywords: Research Engine, Editorial Futurism, Experimental Intelligence, Platform, Network, Core and Signal.
- Mood: academic, futuristic, precise and experimental, with restrained cinematic tension.
- Original energy-core motif:
  - inner core = research question;
  - rotating rings = methodology;
  - external panel = evidence, experiments, collaboration and reproducibility;
  - energy glow = human/AI interaction.
- Never use a Marvel screenshot, branded Iron Man props, copied reactor geometry, official characters or protected visual assets.
- Strong Korean sans-serif headings, restrained English micro-labels and `word-break: keep-all`.

## 3. Site information architecture

### Primary student journey (current)
`Home → Projects → Project detail / Try it yourself → Learn → Share`

### Preserved A-track research journey
`Home / DDALKAK CORE → HAI Lab → Agent Company → Research / Methods → Archive`

- **Home:** first-impression CORE hero and actual student work.
- **Projects:** real demos vs planned ideas vs research prototypes, with learning steps, limitations and errors.
- **Learn:** Tutorials, Prompts, API Guides, Resources.
- **HAI Lab:** original double-clap Web Audio prototype after user consent and a manual fallback. Original DDALKAK CORE visual, animation and prototype architecture.
- **Agent Company:** five **proposed modular roles** on homepage (Research, Archive, Synthesis, Monitoring, Design) and retained animated experimental company scene on `/lab`. Both are illustrations of planned orchestration, **not working MCP agents**.
- **Research:** Human–AI Interaction; Media, Information & Trust; Platform Incentives & Management; Computational Communication.
- **Methods:** experiments/surveys, content analysis, computational text analysis, behavioral research, usability, mixed methods.
- **Archive:** notes, replicable protocols, revisions and research records. Do not claim an archive entry exists without a file.

## 4. Recommendation A verification matrix

| Original recommendation | Confirmed disposition | Implementation or limitation |
|---|---|---|
| Distinct original DDALKAK CORE | Implemented | `src/components/reactor-core.tsx` |
| CORE as homepage hero signature | Added in this A integration | `src/components/core-hero-visual.tsx` |
| Center glow, layered rings, rotating HUD | Implemented original CSS | `src/app/visual-system.css` |
| Hover energy feedback | Added in this A integration | `src/app/recommendation-a.css` |
| Clickable expanded nodes | Adapted: user-selectable conceptual research nodes and explanation, **not live AI execution** | `src/components/core-hero-visual.tsx` |
| Manual CORE activation and animation pause | Implemented | Hero visual and existing `CoreMotionShowcase` |
| Independent HAI Lab preview | Implemented as homepage section linking to dedicated route | `src/components/core-motion-showcase.tsx`; `/lab` |
| Two-clap HAI experiment | Preserved existing prototype | `src/components/hai-clap-console.tsx` |
| Agent Company as independent section | Added in this A integration | `src/components/agent-company-overview.tsx` |
| Five original research role modules | Added as **planned architecture**, not running agents | Research / Archive / Synthesis / Monitoring / Design |
| Existing animated tiny-agent company scene | Retained as older research visualization, not deleted | `src/components/ai-company-scene.tsx` |
| Existing Research / Methods / Archive | Preserved through separate routes | `src/app/research`, `src/app/methods`, `src/app/archive` |
| Scroll-sticky, contracting and morphing CORE | **Not implemented** | Deferred: risk of distraction, extra motion and mobile accessibility requirements |
| Real multi-agent execution / MCP Gateway | **Not implemented** | Must pass user permissions, model/tool integration and audit verification |
| Production CMS / shared student submissions | **Not implemented** | Requires authorization, moderation, privacy and persistence architecture |
| Prompted cinematic image assets | **Not generated or imported** | Existing original CSS reactor deliberately reused instead |
| Fully custom research panel redesign | **Partially represented** | Dedicated research pages remain; not replaced just for the landing page |

## 5. Interaction and accessibility requirements

- All state changes must be actual click/keyboard behavior rather than cosmetic fake controls.
- New hero concept nodes change explanatory copy; activation changes CSS state and reactor speed.
- Motion has a pause control and honors the user's `prefers-reduced-motion` preference.
- Heading and status remain readable without animation or glow.
- Never start microphone input without explicit consent; hero never uses microphone.
- Do not represent simulated console updates as real evidence or actions.
- Minimize runtime dependencies; avoid unnecessary GSAP, WebGL, parallax or scroll hijacking.
- Confirm 390px mobile, desktop, contrast, keyboard focus, no horizontal overflow and reduced-motion.

## 6. Design implementation choices

- **Hero:** original dark energy-core panel within restrained neutral homepage; hero copy continues to emphasize learning by building.
- **Student projects:** actual project demos remain immediately after purpose and intro.
- **HAI Lab:** original active state/energy response, click-to-activate and pause.
- **Agent Company:** editorial off-white module board, dark hub, five light research role cards, warm orange micro-accent.
- **Outer site:** white/off-white paper, ink text, muted gray, blue for action buttons.
- Do not turn the entire public site into a game interface, neon SaaS theme, AI marketing page or unverified product demo.

## 7. Source-backed follow-up work

- Test interactive CORE and all buttons on real browsers and mobile devices; CI/build alone is insufficient.
- Verify HAI Lab double-clap and manual fallback through consent-based physical-device testing.
- Future: moderated student contributions, verified learning logs, research registry and reusable content layer.
- Future: MCP architecture only with read-only proof-of-concept first, explicit approval gate, verifier and audit log.
- Consider optional motion refactors only if user testing shows benefits, not for spectacle.

## 8. Before deleting a historical ChatGPT thread

- **Do not mistake this specification for a complete conversation export.** It covers the A-track attachment and currently accessible code/documentation, not every past prompt or screenshot.
- Keep the original 739-line markdown attachment in the present conversation or export it separately. The old thread may contain other feedback, attached images, meeting notes, configuration or decision history not captured here.
- Verify that the particular material you need is preserved in `docs/`, a local backup, or another accessible source before deleting any chat.
- Deleting a conversation does not automatically erase all related context or data copies; manage those separately in account settings if deletion for privacy is the goal.
