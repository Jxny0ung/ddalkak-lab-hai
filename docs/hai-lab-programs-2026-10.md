# 모두의 딸깍 연구소 · HAI Umbrella / Four Programs (2026-10-16)

> Historical record of the earlier four-program release. The subsequent user-approved direction centers on **Human–AI Interaction** without a degree-subject tagline or fixed activity limits; the introduction is “사람과 AI의 상호작용을 직접 탐구합니다.” The homepage reactor has been replaced, and the primary game is now `/games/toyota-priority.html` (3D). The v0.6 file remains an archive. See [the current implementation record](hai-factory-3d-upgrade-2026-10.md). Publication restrictions and asset provenance below remain applicable.

## Product decision

**Name:** 모두의 딸깍 연구소 / DDALKAK LAB  
**Framing:** An interdisciplinary undergraduate **Human–AI Interaction** research-and-making platform, independent of a university's formally constituted lab unless verified. Build on the existing student-first Projects/Learn experience, preserve original ReactorCore and consent-based HAI prototypes, and add four substantive areas.

The user proposed that AI increasingly bridges Business Administration and Media & Communication; the site should **connect disciplines**, not claim empirical proof that social-science majors or departments have disappeared.

## Actual publication states

| Area | Public URL | Published state | Grounding / caution |
|---|---|---|---|
| AI-assisted ETH paper/research project | `/work/eth` | Documentation **scaffold**, no article/results | Previous chats confirm the user's project title only; precise ETH definition, question, methods and results not verified; await user's research manuscript |
| AI books and original reviews | `/reading` | **0 published reviews** | Editorial structure exists; no invented titles, authors or opinions |
| AI web games | `/games` | **Runnable v0.6 factory command** | User-created `TOYOTA_PRIORITY_Factory_Command_v0.6_live.html` uploaded, exact game logic preserved, embedded backdrop PNG recompressed to WebP |
| Prompt archive | `/prompts` | **0 published prompts**, infrastructure only | Explicit user constraint: do not publish source prompt texts yet; builder in `/projects/prompt-builder` remains independent |

`/work` links all four areas, `/research` and `/methods` remain the research framework, `/projects` and `/learn` continue the hands-on student journey.

## Approved branding

The user's selected identity has a **mouse/cursor → click ripple → circuit-brain** motif with vivid blue text, visually based on the **third logo icon and second logo text-color treatment**. The exact submitted approved image was cropped and stored at:

- `public/brand/ddalkak-wordmark.webp` (900×662, text + icon)
- `public/brand/ddalkak-symbol.webp` (280×234, icon crop)
- `src/app/icon.svg` (separate simplified hand-made browser favicon, not pixel-identical to the raster source)

Header/footer use icon plus accessible live-text name for legibility, and `/work` shows the approved full mark. No external font dependencies or franchise imagery.

## Game provenance and validation

- Original: `TOYOTA_PRIORITY_Factory_Command_v0.6_live.html`, received in the user's existing ChatGPT files.
- Published file: `public/games/toyota-priority-v06.html`
- Functionality: original inline JS, HTML and CSS retained; only the embedded 1672×941 PNG image was converted to 1280×720 quality-50 WebP, reducing HTML from about **5.27 MB to 0.39 MB**.
- **No official Toyota affiliation or production-result claims.** Include the unofficial educational simulation notice in `/games`.
- Mobile UI, music/audio and device hardware performance have not been newly checked on physical phones; passing build/smoke is not a comprehensive interaction audit.

## Disclosure and publication policy

- ETH and book review **stubs do not represent actual published papers or reviews**.
- Original prompts are intentionally **not publicly populated**. Do not commit actual conversation logs, hidden API keys, private source materials, personal participant data or unpublished research documents.
- A research record requires a concrete question, methodology, data provenance, ethical permissions when applicable, verification and explicit publication permission.
- `/people` member bios remain user-supplied, not assigned ETH/game authorship or verified paper credentials.

## Routine validation

```sh
npm ci
npm run lint
npm run build
npm run smoke
```

The smoke test verifies the brand assets, activity routes, source game file, and 0 published prompt/review items as well as older HAI microphone/security checks. Source/feature confirmation does not imply real-world usability study.
