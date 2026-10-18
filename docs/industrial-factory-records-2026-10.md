# Industrial factory and participant records — October 2026

## Scope

The automotive production rules remain unchanged. Whiteout Survival informed the legible world view, selected-facility context and upgrade-cost comparison, while the game retains its original automotive production-management setting. The public website preserves the approved HAI introduction, logo, content and researcher order. Junyoung Lee's personal-site name link from main is preserved.

## Implemented

- Dark cutaway factory hall, perimeter equipment, directional work lighting, conveyor rollers, stage-specific vehicle bodies, machinery and workers animated from actual simulation progress.
- Orbit/pan/zoom and selected-process close view, three graphics presets, shared geometry/materials and instanced conveyor rollers. Unsupported WebGL opens the keyboard/touch layout editor.
- Upgrade preview shows the current staffing-dependent cycle time, improved time, cost and remaining investment capacity before purchase. Other bottlenecks still constrain output.
- Required department and name per run, stable run ID, participant identity locked during a run, separate archived runs, search, JSON progress export/import and CSV results with participant fields.
- Local browser storage only: no server synchronization, central collection, authentication or shared rankings. The UI and game entry page disclose this. Exports contain the participant identity.
- Validated imports, schema/revision checks, protection against older design-file replacement, stale active-tab write detection, corrupt-data recovery copies, and an export route when storage is unavailable. Explicit deletion of archived runs also clears recovery/backup copies that could retain that identity. Browser-local data is not a tamper-proof research record.
- Homepage projected sculptures, cinematic factory concept art, clearer text hierarchy/contrast, project surfaces and researcher thumbnails. Concept art is labeled as such and is not a gameplay screenshot. Actual creation prompts remain unpublished.

## Verification

- `npm run test:game`: 28 tests (18 production-engine + 10 record/storage tests).
- `npm run test:ui`: 9 DOM/Three.js geometry integration tests using JSDOM and a mocked WebGL renderer. Includes three rounds, upgrade confirmation, registration, archived identities, nested pause dialogs, older import rejection and export-before-reset under quota failure.
- `npm run lint`: passes without warnings.
- `npm run build`: clean production build, 28 generated routes.
- `npm run smoke`: routes, module MIME types, local-only disclosure, old playable version, empty archives and microphone permissions (`/lab` self only; other pages denied).
- Managed browser: production-build homepage renders the sculpture; switching to collaboration updates the caption. Participant registration, a welding upgrade (14.0 → 8.4 seconds; 1,200 budget), one accelerated production round and the named record row were observed. The round produced a visible report and record entry.
- Narrow layout: 390px-wide iframe harness (375px content with scrollbar), production HTML/CSS for home and People, functioning static game document. No horizontal overflow in the three documents; mobile participant identity, guide, save and record buttons remain visible. This is layout QA, not a physical-phone performance test. The temporary harness is not published.
- The cloud browser reports `GL_VENDOR = Disabled` and fails WebGL context creation. Real GPU rasterization, camera gestures and device frame rate could not be verified there. Geometry construction and finite coordinates pass integration tests; the browser fallback remains usable. Do not describe this as complete visual/GPU verification.

The preview wrapper translates supervisor host flags for Next. With a completed `.next/BUILD_ID`, the managed preview uses the production build; normal `npm run dev` remains development mode. Rebuild before checking source changes in that preview.

## References consulted

- Whiteout Survival official site and official gallery: https://whiteoutsurvival.centurygames.com/ and https://www.whiteoutsurvival.wiki/official-gallery/
- Linear design refresh: https://linear.app/now/behind-the-latest-design-refresh
- Google DeepMind public site: https://deepmind.google/

These informed hierarchy and visual direction. Third-party game assets were not copied. The original factory concept image was generated for this project and converted to a 1600×900 WebP asset.
