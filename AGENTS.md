# 모두의 딸깍 연구소 — Codex / Contributor Instructions

## Product mission
A student-first platform to discover, rebuild, improve and share generative-AI use cases, with an interdisciplinary foundation in Business Administration × Media & Communication × Human–AI Interaction (HAI).

The primary visitor journey is **Home → Projects → Project detail → Try it yourself → Learn → Share**. Prioritize actual student work, transparent build notes and useful learning resources over technology spectacle.

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
- Selected Recommendation A: DDALKAK CORE is the original signature visual in the homepage hero, with a separate HAI Lab interaction preview and a separate Agent Company architecture section. Projects and Learn remain the primary student mission.
- Both CORE previews are bounded modules, not a full-site neon theme; explain simulated visual feedback vs real microphone/agent execution, offer pause controls, and honor reduced motion.
- Agent Company homepage role modules (Research, Archive, Synthesis, Monitoring, Design) are proposed concepts, not autonomous MCP workers. Preserve the existing /lab scene without implying live execution.
- Ground changes in docs/recommendation-a-master.md and the selected Option A.
- Preserve the original ReactorCore component and the HAI Lab experience instead of copying third-party film props or importing heavy motion dependencies.
- Main platform styles live in src/app/student-platform.css (sl- namespace); older research UI uses existing styles.

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

## Research provenance
The main website is for learning by building; rigorous academic protocols are preserved in /research, /methods, /registry, /handbook, /archive and docs/. Label methods, hypotheses, prototypes, and evidence clearly.
