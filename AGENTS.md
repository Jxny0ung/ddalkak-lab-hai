# 모두의 딸깍 연구소 — Codex / Contributor Instructions

## Product mission
A Human–AI Interaction (HAI) research-and-making platform. The exact introduction is **사람과 AI의 상호작용을 직접 탐구합니다.** Activities may expand with new questions; do not restrict the lab to named degree subjects or a fixed set of programs.

The primary visitor journey is **Home → Projects → Project detail → Try it yourself → Learn → Share**. Prioritize actual student work, transparent build notes and useful learning resources over technology spectacle.

## User-approved broadened HAI mission (2026-10-16)

- Primary brand is **모두의 딸깍 연구소**. Center the public identity on Human–AI Interaction without a Business Administration × Media & Communication tagline. Do not make unsupported claims about the disappearance of academic disciplines.
- Preserve the selected logo source with blue wordmark: `public/brand/ddalkak-wordmark.webp`, `public/brand/ddalkak-symbol.webp`, browser icon `src/app/icon.svg`. Header live text stays readable.
- Current public areas include `/work/eth` AI-assisted ETH paper (**no unsupported detail**), `/reading` AI book reviews (**0 posts until actually written**), `/games` playable **Factory Command 3D**, `/prompts` prompt archive (**implementation only; do NOT publish real prompts**). These are current activities, not limits on future work.
- No fabricated paper results, review content, prompt texts, gameplay claims or official Toyota affiliation.
- See `docs/hai-factory-3d-upgrade-2026-10.md` for the current build and `docs/hai-lab-programs-2026-10.md` for historical provenance. Keep existing Projects/Learn and the consent-based `/lab` prototype accessible.

## Public information architecture
- Home: purpose, selected projects, Explore / Rebuild / Improve / Share
- Projects: browse and filter real demos / accurately labeled planned concepts, with process and limits
- Learn: tutorials, prompts, API safety, source and research records
- Lab: existing HAI consent-based browser prototype and Agent Company architecture
- About: independent student project, principles, participation guidance
- Existing research/methodology/registry/archive/system pages remain accessible and must not be deleted casually.

## Content integrity
Do not invent publications, experiments, memberships, dates, recruitment periods, partnerships, user counts, API integrations or project outcomes.
Distinguish: functioning local demo, concept, research prototype and verified result.
For troubleshooting, do not claim hypothetical examples are real historical incidents; label them educational scenarios.
Do not present synthetic KPI values as actual business data.
Respect confidentiality, consent and personal-data rules.

## Design
- Korean-first, quiet product-editorial identity: #fff, #f7f7f5, #111, gray, sparse #2563eb.
- Preserve visible student project interfaces; avoid gratuitous gradients, neon, glass effects, bouncing and excessive animations.
- 1280px max content width, responsive 390px phones, accessible headings/navigation/forms and keyboard focus.
- The current homepage uses `InteractionStudy`: a controllable human/AI geometry visual. Do not restore the superseded reactor-style homepage hero. Preserve the original ReactorCore component for the separate `/lab` experience.
- Explain simulated visual feedback vs real microphone/agent execution, offer pause controls, and honor reduced motion. Never imply the homepage visual runs live AI inference.
- Agent Company role modules (Research, Archive, Synthesis, Monitoring, Design) are proposed concepts, not autonomous MCP workers. Keep the existing `/lab` scene without implying live execution.
- `docs/recommendation-a-master.md` records a historical design decision; the current homepage and HAI identity follow the later user feedback above.
- Main platform styles live in src/app/student-platform.css (sl- namespace); older research UI uses existing styles.

## Interview feedback scope

- The evaluated university undergraduate lab homepage is **not** the DDALKAK LAB project; apply generally useful UX practices but never transfer its roster, awards, certifications, publications or implied institutional approval.
- Keep the approved DDALKAK brand while avoiding oversized hero graphics, compulsory tall spacing, nonfunctional arrows, poor mobile line breaks or divergent typefaces.
- Use the shared `src/components/project-card.tsx` for actual clickable cards; show method, status and evidence before making research claims.
- Each LearningProject also stores `verification`, `outputEvidence`, and `sourcePath`: project details must link to the real file rather than only to a generic repository homepage. Never conflate a visual demo with peer-reviewed evidence.
- `/outputs` is an evidence-index and disclosure policy, not a fabricated CV or credentials feed. Only add verified, consented records with real links.
- Preserve `/research` explanation distinguishing AI as a method versus Human–AI Interaction as the object of study.
- Source of truth: `docs/interview-feedback-adaptation-2026-10.md`.

## Engineering

- The HAI Lab needs a per-route Permissions-Policy exception allowing `microphone=(self)` **only** on `/lab`. Preserve `microphone=()` elsewhere and never bypass explicit consent.
- Microphone getUserMedia requests can resolve after stop/unmount; handle canceled promises, stop tracks and close Web Audio contexts.
- All manual examples must identify themselves as simulation rather than recognized audio or autonomous AI.
- Keep Research and Methods discoverable, use honest empty states and do not fabricate a team, contact email or official university affiliation.
- After building, run `npm run smoke` in addition to lint and build, and verify the permissions header on /lab and /.
- Follow `docs/chat-history-site-audit-2026-10.md` for original requirements and audit decisions.

- Next.js 16 App Router, TypeScript, minimal dependencies.
- Student project content: src/lib/student-content.ts.
- Follow client/server boundaries. No secrets or AI API keys in client code.
- Build confidence: npm run lint, npm run build, check primary routes and at least one mobile width, test functional browser demos.
- New work should use feature branches and PRs. Avoid pushing accidental node_modules, generated outputs, unpublished notes or private records.
- Existing HAI Lab prototype must continue to work with explicit user consent.
- Factory Command: run `npm run test:game` and `npm run test:ui` for gameplay changes. The UI tests use JSDOM plus actual Three.js geometry with a mocked renderer; they do not establish browser/WebGL or physical-device performance.
- Build preparation vendors the pinned Three.js package locally. Do not replace it with unpinned CDN imports. The old `/games/toyota-priority-v06.html` remains available separately.
- Preserve the current faculty profile and undergraduate order: 민현구 교수, then 이준영, 김예빈, 김민아, 엄태연. Use `src/lib/researchers.ts` as the student source of truth.

## Research provenance
The main website is for learning by building; rigorous academic protocols are preserved in /research, /methods, /registry, /handbook, /archive and docs/. Label methods, hypotheses, prototypes, and evidence clearly.
