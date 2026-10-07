# Skill — DDALKAK Site Design System

## Name

`ddalkak-site-design`

## Purpose

Improve or extend the DDALKAK LAB website without turning it into a generic startup landing page or weakening research transparency.

## Trigger

Use this workflow when asked to:

- redesign DDALKAK LAB
- make the site cleaner or more visually distinctive
- add or reorganize a research page
- improve navigation or information architecture
- create a new visual section while preserving the lab identity

## Inputs

- requested page or feature
- current repository state
- existing research-content status
- mobile / accessibility constraints
- whether the change affects a research claim

## Workflow

```text
Intent
→ Inspect current page and shared components
→ Map change to site architecture
→ Reuse design tokens
→ Implement server-first React
→ Responsive + reduced-motion treatment
→ ESLint
→ Production build
→ Git diff review
→ Commit / push
→ GitHub Actions
→ Vercel deployment
→ Production verification
→ Update architecture docs if navigation changed
```

## Visual constraints

- warm off-white + near-black base
- signal orange as primary accent
- lime as limited system/status accent
- editorial grid and strong typography
- no fabricated metrics
- no decorative complexity that reduces legibility
- avoid extra dependencies unless the feature genuinely requires them

## Engineering constraints

- Next.js App Router
- Server Components by default
- semantic headings and navigation
- keyboard-visible focus states
- `prefers-reduced-motion` support
- minimal client JavaScript
- no secrets or private research data

## Validation

A change is complete only when:

- ESLint passes
- production build passes
- target route returns HTTP 200
- navigation links resolve
- GitHub Actions succeeds
- Vercel deployment succeeds
- production content is confirmed
