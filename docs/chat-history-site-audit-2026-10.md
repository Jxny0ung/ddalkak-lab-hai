# DDALKAK LAB — Historical chat audit & site quality pass (2026-10)

## Source and scope

This review compares the user's supplied **626-line text export** of the original
“Visual Studio Code” conversation (ending during local project setup),
the earlier **739-line Recommendation A markdown**, and the actual public GitHub
repository at the time of review.

**Important limits**
- The 626-line export is not a complete evidence-backed export of all subsequent
  UI iterations, fixes, PR comments or media attachments. It includes placeholders
  where the original conversation had screenshots, not the original image bytes.
- We deliberately **did not commit** the raw chat export, identifiable Windows
  paths, screenshots, private conversations, or audio to this public repo.
- This document records requirements and independently observed implementation,
  not private chat content or claims of current local VS Code filesystem access.

## Confirmed foundational requirements from the early transcript

1. **Distinct project** from Areopagitica: DDALKAK is an undergraduate,
   interdisciplinary Business × Media & Communication × HAI research and
   experimentation site. Earlier Python/ETH crawler installation instructions
   were a misinterpretation of the user's first question, not this site's stack.
2. **Developer workflow:** VS Code, official Codex extension, Node/npm, Next.js
   App Router and TypeScript, GitHub version control and Vercel deployment.
   The code in this repository and verified deployments are now the source of
   truth, **not** earlier assistant descriptions of unfinished local steps.
3. **Research-first informational needs:** Home, Research, Methods, Projects,
   Archive, Team and Contact. Real people, official affiliation and contact
   details may be published only when verified and consented.
4. **Extensibility:** documented protocols, research methods, reproducible
   logs, experiment prototypes, relevant AI tools and optional future APIs.
5. **Development standards:** strong visual design, separate research/prototype
   claims, responsive design, honest statuses and clear GitHub workflow.
6. **Later explicit Option A:** original interactive DDALKAK CORE, HAI Lab,
   and an independent Agent Company architecture illustration. These remain
   bounded within the student-first product information architecture.

## Audit findings and concrete fixes

| Severity | Observed behavior before review | Resolution |
|---|---|---|
| P0: HAI functionality | Global `Permissions-Policy` denied `microphone=()` even on `/lab`; therefore browser microphone usage could be blocked regardless of consent. | Retain blanket denial, override `/lab` with `microphone=(self)`, and add a live HTTP header assertion to CI. Browser still asks consent. |
| P1: HAI privacy/lifecycle | If permission resolved after cancellation or component unmount, an async stream could remain; error after permission success also lacked complete cleanup. | Request invalidation, early track stop and AudioContext cleanup. |
| P1: claim integrity | The **manual demo** reported two claps as if recognized by a microphone. | Explicit manual visual-demo status; no false clap count. |
| P1: research discoverability | Primary navbar omitted Research and Methods although both existed. | Expose both, indicate active page, maintain compact mobile navigation. |
| P2: empty state | Category Data had 0 items but rendered an empty grid without explanation. | Informative empty state and valid onward links. |
| P2: scholarly continuity | Student-first homepage did not strongly connect to research questions, Methods and Registry. | Small, explicit three-link research bridge without displacing actual projects. |
| P2: team/contact claims | No verified team directory or published email; generic “Join” could be mistaken for active recruitment. | Honest About section and **public** GitHub Issues feedback path with PII warning. No invented membership/recruitment. |
| P2: public affiliation clarity | Footer could be read as an official university site. | Explicit independent student project descriptor instead of institution brand claim. |
| P1: verification depth | CI only linted and built source; did not verify route status or microphone header behavior. | Post-build smoke suite checks 18 real paths, 404 behavior, key content and restrictive permissions. Use `npm ci`. |

## Research platform & design decisions preserved

- Primary visitor flow: **Explore → Rebuild → Improve → Share**.
- HAI Lab: double-clap detection after voluntary microphone permission;
  browser-local audio features only, no recordings or uploaded raw audio.
- Agent Company: architecture proposal; no live multi-agent/MCP execution.
- Project demo status labels are grounded in the code; example KPI is mock data.
- The original signature CSS ReactorCore stays; no copied film imagery.
- The UI remains white/gray editorial for student learning, cyan/orange isolated
  to HAI-specific visual elements and current light research bridge.
- All public methods/registry/archive pages are preserved for academic rigor.

## Testing and deployment

```sh
npm ci
npm run lint
npm run build
npm run smoke
```

The smoke suite starts Next.js in production mode on a local ephemeral port,
fetches key public routes, checks the zero-result category, checks HAI vs
non-HAI microphone permissions, validates the unknown-project 404 and stops
the server. CI runs these checks on every PR and main-branch push.

Passing lint/build/smoke does **not** prove WCAG compliance, real microphone
performance, physical-device UX, Firefox/Safari behavior, content correctness
from outside the repository, or actual model/API operation. Those require
separate manual/browser/device review.

## Next priorities (do not claim as already delivered)

1. Real mobile and keyboard exploration at 390/768/1280px, including active
   microphone permission, cancel and denied scenarios on an HTTPS origin.
2. Cross-browser speech/audio permission checks; confirm OS-level microphone
   interruption and cleanup on Safari iOS and Chrome Android.
3. Privacy/ethics process for participant studies and contributor content.
4. A verified team roster, recruitment/participation policy and contact method
   **only after** owners provide consent and official details.
5. Content workflow for real student project submissions and experiment
   records with author/version/source/status/evidence fields.
6. Only then consider read-only MCP agent integrations and any consented
   user-action tooling; implement approval gates and auditable logs first.

## Chat deletion warning

This file and `docs/recommendation-a-master.md` preserve actionable decisions,
not every old conversation line. Chat deletion should be considered only after
backing up the original exports and any embedded attachments separately.
