# DDALKAK LAB / Undergraduate researcher introduction (2026-10)

## Scope

User-supplied profiles for **three people** who are being introduced as
undergraduate student researchers on the independent DDALKAK LAB site.
`src/lib/researchers.ts` is the single source of truth for names,
interests, website copy, artwork descriptions and public external links.

| Name | Public introductory fields | Public art |
|---|---|---|
| 김예빈 / Kim Ye Bin | ISTJ; finance/accounting; violin, exercise, escape rooms; music, self-development | user-supplied painted pond/garden portrait |
| 엄태연 / Eom TaeYeon | ENFP; financial markets, proprietary trading, Nasdaq/commodities; economics articles, city visits | user-supplied painted global-market portrait |
| 김민아 / Kim Min A | INFP; AI products, UX, service planning; travel, driving, reflection | user-supplied painted coastal UX/travel portrait |

The profiles are natural, concise adaptations for a **public lab website**,
not verbatim publication of private prompt interpretations. The more sensitive
personal reflections about relationship anxiety and self-worth were deliberately
not included in public copy.

## Publication boundaries

- Portraits are derived from the three user-provided artwork files, retaining
  the original **1122 × 1402 pixel resolution** and encoded as quality-optimized
  AVIF in `public/researchers/`. The initial 256 × 320, highly compressed
  thumbnails were replaced after a reported pixelation problem.
  The original uncompressed PNG sources remain outside the public repository.
- Regression gate: `npm run smoke` checks that all 3 image routes return a
  sufficiently large AVIF response; never optimize gallery originals down to
  thumbnail resolution again. Next.js provides responsive image variants
  from these full-resolution source files.
- User-provided social handles and profile URLs are displayed; tracking
  parameters were removed. External destinations should be checked by profile
  owners, as ownership/content was not independently verified.
- **No lab roles, papers, results, awards, financial qualifications,
  research methods assigned to individuals or official university credentials
  were invented.** Focus labels are interests, not assignments.
- These profiles should remain editable or removable upon individual request,
  and public bios/images/social accounts must reflect each person's
  publication consent.
- No public admin interface or roster backend has been created.
- Source file for content: `src/lib/researchers.ts`; presentation:
  `src/app/people/page.tsx`, `src/app/people.css`; routes via site navigation.

## QA

`npm run build` and `npm run smoke` must verify /people renders
three researcher names and all three real image URLs return 200.
Device-specific mobile visual QA and external social URL verification
remain manual release checks.
