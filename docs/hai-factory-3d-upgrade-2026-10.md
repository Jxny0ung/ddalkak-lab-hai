# HAI site and Factory Command 3D — implementation record

## Direction

The user requested a substantial website and game upgrade using Astra, informed by prior decisions. Preserve the blue DDALKAK branding, Korean-first HAI identity, and the exact introduction “사람과 AI의 상호작용을 직접 탐구합니다.” Current activities remain open-ended. Do not restore the superseded reactor homepage or discipline-specific positioning.

The homepage now connects an interactive human/AI geometry study, the playable factory simulation, current research, reading/build-note archives, research methods and evidence, and people. The geometry visual is explicitly illustrative; it does not perform AI inference. Projects provides search and category filters. The latest faculty and student updates are preserved: 민현구 교수 followed by 이준영, 김예빈, 김민아, 엄태연.

ETH details remain unverified, reviews remain empty, and original prompt texts remain unpublished. Existing research, methods, registry, outputs, Learn and consent-based Lab routes remain available.

## Game architecture

- Primary route: `/games/toyota-priority.html`; introduction: `/games`; previous edition: `/games/toyota-priority-v06.html`.
- `public/games/factory/engine.mjs`: deterministic discrete-event simulation independent of the DOM and renderer. Speed controls change elapsed simulation time, not game rules.
- `public/games/factory/scene.mjs`: real Three.js geometry, orbit camera, selection, workers, machinery, conveyors and staged vehicle forms. A keyboard/touch 4×4 editor remains usable if WebGL is unavailable.
- `public/games/factory/app.mjs`: controls, save/restore, validated JSON import/export, CSV reports, opt-in sounds, pause, reset confirmation and three-round flow.
- `scripts/prepare-game-assets.mjs`: copies pinned Three.js modules, OrbitControls and license from the installed package before build/dev. Generated dependency assets are ignored in git and require no runtime CDN.
- Automatic saves are versioned and local to the current browser. Restored active runs open paused. There is no participant backend, cloud save, multiplayer ranking or AI decision service.

## Applied rules

The supplied game rules v2.1 informed the deterministic implementation. Money is in 만 원, time in seconds. Initial resources are 3,000 and 8 workers; there are three 300-second rounds. Each stage accepts 1–4 workers (maximum 16 total). Stage baselines are 12/20/18/16 seconds; staffing multipliers are 1/.70/.55/.48. Upgrade prices are 700/1,200/1,000/800, multiplying processing time by .75/.60/.70/.75.

Sales are 300 per delivered good vehicle, material costs 120, wages 25 per hired worker per round, hiring costs 300, and end-round finished stock costs 20 per vehicle. Investments retain wage reserves and five vehicles' material cost. Every twentieth completion is defective across the whole run. All five transport legs use Manhattan distance at two seconds per cell. Completed good vehicles still traveling to dispatch at cutoff become stock; unfinished work is scrapped. Carried stock can be sold once against the next round's orders. Unpaid storage remains a payable rather than disappearing.

**Prototype choices disclosed in the game:** three-second material-input interval, ten-job work-in-progress cap, base orders 20/25/30, and a provisional learning index/order bonus. These are not an official relative-ranking formula, a research finding or validated Toyota production data. The site and game include the unofficial educational simulation notice.

## Review and verification

Astra performed bounded, read-only product and code audits. Fixes covered hiring limits, ledger/report consistency, inbound distance, completed-car stock preservation, one-time settlement, snapshot/event integrity, stock-backed next-round starts, selection raycasting and render failure fallback.

Required checks:

```sh
npm ci
npm run test:game
npm run test:ui
npm run lint
npm run build
npm run smoke
```

The 18 engine tests cover round transitions, speed invariance, snapshot continuity, defect cadence, stock conservation, affordability and financial reconciliation. Four UI tests exercise actual event handlers, three rounds, reports, restoration/reset cancellation, corrupted-save recovery, fallback controls and keyboard focus. They use JSDOM and actual Three.js math/geometry, **with a mocked renderer**. The smoke test requests the production build, core routes/assets and microphone permissions headers.

Actual browser/WebGL rendering, screenshots, touch gestures, audio playback and physical-device performance were not verified in this managed environment. CSS includes 390px-responsive layouts; this is not a physical-phone QA claim. No real user study or research outcome is inferred from automated tests.
