# Contributing to DDALKAK LAB

DDALKAK LAB is a research-first repository. Code quality matters, but research claims require an additional standard: **the repository must never make an unfinished plan look like a completed finding.**

## Before opening a pull request

1. Create or link a research issue when the change affects research framing, methods, data handling, or study status.
2. Keep planned work, prototypes, and empirical findings visibly separated.
3. Do not add participant-level data, credentials, private emails, unpublished correspondence, or restricted datasets.
4. If AI was used to draft or transform research content, verify every factual claim and keep the human decision-maker identifiable in the workflow.
5. Run:

```bash
npm ci
npm run lint
npm run build
```

## Branch and review workflow

- `main` is the production branch.
- Use a focused branch for substantial changes.
- Pull requests should explain:
  - what changed,
  - why it changed,
  - whether the change affects a research claim,
  - what was tested,
  - what remains uncertain.
- GitHub Actions must pass before merge.
- Merges to `main` automatically trigger Vercel Production deployment.

## Research-content rules

Do not invent:

- sample sizes,
- effect sizes,
- statistical significance,
- publications,
- partnerships,
- affiliations,
- awards,
- team members,
- completed experiments.

Use explicit status labels such as `DRAFT`, `PLANNED`, `RUNNING`, `CLOSED`, and `PUBLISHED`.

For studies and pilots, start from `docs/research-record-template.md`.
