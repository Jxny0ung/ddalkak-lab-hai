# DDALKAK LAB — Signature Motion & Design Provenance

## Design decision · 2026-10

The main site stays a **student-first, editorial Projects → Learn experience**.
Its white/gray palette, clear typography, evidence labels and small blue accent
remain the default; cinematic energy visuals are bounded to the A-track CORE hero,
HAI Lab preview and modular Agent Company area, not applied across the entire site.

## Recommendation A update · 2026-10-10

The user-supplied recommendation makes **DDALKAK CORE the homepage hero symbol**, alongside independent **HAI Lab** and **Agent Company** sections. This adds a second contained CORE interaction at the top without turning the entire student platform into an animated neon scene. The homepage agent module diagram is a research architecture concept, not running automation.

Read [`recommendation-a-master.md`](recommendation-a-master.md) for the full decision record, the precise implementation matrix and what is still only proposed.

## What this version deliberately reuses

- **Original ReactorCore component:** counter-rotating rings, radial segments,
  scanning sweep, active/idle states and reduced-motion styles. Source:
  `src/components/reactor-core.tsx`, `src/app/visual-system.css`.
- **Original HAI prototype:** double-clap detection remains exclusively on `/lab`
  and only after explicit microphone permission.
- **AI Company concept:** Scout/Analyst/Builder/Operator and the MCP Gateway
  visualization remain on `/lab` as future architecture, not live agents.
- **Student workflow:** Explore → Rebuild → Improve → Share remains primary.

## Patterns adapted from public references

These are *design principles*, not copied artwork or source-code imports.

- Apple-like product/editorial clarity: wide margins, clear hierarchy, one
  visible primary action. No ornamental AI-themed gradients site-wide.
- [Glow Card React](https://github.com/kea0811/glow-card-react): restraint,
  state feedback, reduced-motion behavior, minimal runtime dependencies.
  We did **not** import the package or copy its implementation.
- [Sona UI](https://github.com/Dinil-Thilakarathne/sona-ui):
  accessible, purposeful animation and real keyboard-operable controls.
  We did **not** import the package or copy its implementation.
- [MDN: prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion):
  nonessential motion stops when the user's OS asks for reduced motion.

## Current interaction contract

Homepage `CoreMotionShowcase`:
- It is **clearly labeled a local visual demo**.
- The activation button changes React state and the core's animation speed.
  No microphone input, AI inference, MCP access or external action is implied.
- The motion pause button freezes decorative animations without hiding state.
- A direct link leads to the actual consent-based `/lab` experience.
- Interactive controls have descriptive labels, focus indicators and minimum
  43px pointer-target height; state changes are in an ARIA live region.
- Small screens stack copy and the stage; no scroll-driven parallax is required.

## Explicit exclusions

- No image files, frame captures, 3D meshes, logos or exact asset geometry
  extracted from an Iron Man/Marvel film or other copyrighted franchises.
  The DDALKAK CORE is original code inspired only by a general sci-fi energy
  reactor design vocabulary.
- No background audio, automatic microphone activation, fake AI responses,
  fake KPI or claimed real-world agents.
- No heavy Three.js/GSAP bundle, extensive glassmorphism, or flashing lights.

## Review checklist

1. `npm ci`, `npm run lint`, `npm run build`.
2. On the homepage, click "코어 반응 보기" and check "VISUAL ACTIVE".
3. Click "반응 초기화" and check "STANDBY".
4. Toggle "모션 일시정지" and "모션 재생"; state remains operable.
5. Enable OS reduced motion: no rotating or pulsing decorative motion.
6. Check keyboard focus and button behavior.
7. Check 390px phone, tablet and desktop for clipping or overflow.
8. Check `/lab`: manual mode, microphone consent, and existing AI Company.
9. Confirm GitHub Actions and Vercel Preview pass before merge.

This is a design/integration note, not evidence of a finished usability study.
