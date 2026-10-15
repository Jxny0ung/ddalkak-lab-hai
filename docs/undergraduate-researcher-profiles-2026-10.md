# DDALKAK LAB / Undergraduate researcher introduction (2026-10)

## Scope

User-supplied profiles for **four people** who are being introduced as
undergraduate student researchers on the independent DDALKAK LAB site.
`src/lib/researchers.ts` is the single source of truth for names,
interests, website copy, artwork descriptions and public external links.

| Name | Public introductory fields | Public art |
|---|---|---|
| 이준영 / Junyoung Lee | INFJ; political communication and HAI; reading and writing; plants, tea, fitness | user-selected Monet-inspired garden portrait |
| 김예빈 / Kim Ye Bin | ISTJ; finance/accounting; violin, exercise, escape rooms; music, self-development | user-supplied painted pond/garden portrait |
| 엄태연 / Eom TaeYeon | ENFP; financial markets, proprietary trading, Nasdaq/commodities; economics articles, city visits | user-supplied painted global-market portrait |
| 김민아 / Kim Min A | INFP; AI products, UX, service planning; travel, driving, reflection | user-supplied painted coastal UX/travel portrait |

The Junyoung profile is published first on both homepage and People gallery; Instagram, LinkedIn and Naver blog were supplied directly by the profile owner. The profiles are natural, concise adaptations for a **public lab website**,
not verbatim publication of private prompt interpretations. The more sensitive
personal reflections about relationship anxiety and self-worth were deliberately
not included in public copy.

## Publication boundaries

- The original three profiles use **1122 × 1402**-pixel optimized AVIF illustrations in `public/researchers/`. The newly added Junyoung image is his explicitly selected **1536 × 1536**-pixel JPEG painting (kept as provided), and is cropped responsively by the profile card. The initial 256 × 320, highly compressed
  thumbnails were replaced after a reported pixelation problem.
  The original uncompressed PNG sources remain outside the public repository. The Junyoung portrait was additionally selected in this chat as the preferred unretouched Monet-style version.
- Regression gate: `npm run smoke` checks that all 4 image routes return a
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
four researcher names and all four real image URLs return 200.
Device-specific mobile visual QA and external social URL verification
remain manual release checks.
