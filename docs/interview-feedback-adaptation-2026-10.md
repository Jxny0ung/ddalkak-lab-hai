# DDALKAK LAB — Two interview feedback adaptation (2026-10)

## Scope and source boundaries

Source: the user's Korean, multi-section synthesis of **two interviews** on
Human–AI Interaction research, undergraduate research activity, and direct
website feedback, provided in chat on 2026-10-10.

**The interviewee evaluated a separate undergraduate university research-lab
website, not DDALKAK LAB.** We adapt general UX, information hierarchy and
research-evidence standards. This is not evidence that the same issues were
observed on DDALKAK LAB, nor does it authorize borrowing another lab's name,
members, credentials, awards, paper records or official university affiliation.

## Decisions applied to DDALKAK LAB

| Interview lesson | Repo observation before changes | This implementation |
|---|---|---|
| Excessive whitespace / oversized graphic | Hero forced >= 740px tall with 95px+108px padding, original CORE visual was bulky | Reduced hero height/padding; copy-led ratio and smaller contained CORE; tighter consistent section gaps |
| Readable type and consistent body line-height ~1.6 | Student UI already used sans and 1.65 but legacy/overlays differ | Consistent student header/body/footer sans, 1.62 line-height, keep-all, balanced headings |
| Restrained colors | Blue accents in student site, cyan/orange bounded to research modules | Keep the original A-track motif only inside CORE/HAI/Agent while reducing visual bulk and shadow |
| Clickable cards and no fake arrows | Project list used real full-card links already; visual preview's pseudo button and Agent Company module arrow could imply actions | Central `ProjectCard` component retains full-card links; removes misleading noninteractive arrows and preview CTA |
| Active navigation indicator | Active `aria-current` already in use from earlier work | Preserve and improve sizing, keyboard focus and mobile navigation |
| Project board hierarchy | Project cards had name/category/status but no question or method in list | Expose clear approach, status, time and detail label; detail view now records research question, method and evidence policy |
| Empty states | Already covered via earlier change | Preserve empty state and onward navigation |
| Researchers, publications, certificates | No verified roster/papers/awards/credential proofs available in this repo | New `/outputs` page links actual public code and methods, marks unverified achievements as unavailable, explains opt-in evidence rules |
| Lab automation demo | /lab shows real consented clap detection; Agent Company is conceptual | No false claim that working MCP orchestration, backend analytics or real-time research study exists |
| HAI vs using AI as method | Research page outlined HAI, but tool/object distinction was not explicit | Dedicated research framing: AI as instrument vs HAI as object, HCI not superseded |
| Accessibility / responsive | Mixed base breakpoints and oversized spacing | Responsive 4/2/1 research destinations, 3/2/1 evidence grid, phone-sized ProjectCard, keyboard focus, reduced-motion defaults |

## Implementation summary

- `src/app/interview-polish.css`: latest scoped layout and type rules
- `src/components/project-card.tsx`: fully linked reusable project UI
- `src/lib/student-content.ts`: source-backed **framing questions** and stated methods
- `src/app/projects/[slug]/page.tsx`: honest disclosure strip and safe copy
- `src/app/outputs/page.tsx`: code, lab protocol and reproducibility evidence;
  explicit unavailable/unverified output categories
- `src/app/research/page.tsx`: AI tool vs HAI research object
- `src/app/sitemap.ts`, footer, home bridge: functional navigation
- `scripts/smoke-check.mjs`: source/route coverage checks

## Current evidence policy

- Real demonstrable code can be linked to GitHub.
- Design proposals, example business metrics and proposed agent roles must be
  clearly marked as such.
- Publication records need a title, actual venue/publisher, relevant date,
  contribution, document/DOI URL and verification.
- Certificates, course completions and awards must not be conflated. Each
  needs issuer, date, verification link or redacted proof and consent.
- Researchers require confirmed role and permission to display identity.
- No fabricated examples should be indistinguishable from real records.
- **The user-provided interview synthesis is feedback**, not a verified
  empirical HAI research finding or license to publish the other lab's assets.

## Deferred decisions

1. Verified public researcher profiles after consent and record verification.
2. Real outputs/achievement entries after receiving valid source documents.
3. A full content management system or live upload workflow requires
   authorization, storage, moderation, privacy rules and security review.
4. Dark mode is an optional lower-priority preference, not a missing essential
   function; it should not precede basic usability and evidence accuracy.
5. Real audio-device, Safari/iOS/Android, keyboard-only, 390px screenshot
   review and UX sessions remain separate from lint/build/HTTP smoke tests.

## Test and release gate

```sh
npm ci
npm run lint
npm run build
npm run smoke
```

GitHub CI must pass before merging. Vercel `READY` confirms build/deployment,
not subjective design quality or physical microphone function.
