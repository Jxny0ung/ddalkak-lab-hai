# DDALKAK LAB — Site Architecture

## Purpose

DDALKAK LAB is a research interface, not a generic portfolio. The information architecture should answer four questions in order:

1. **What do we study?** → Research
2. **What are we building?** → Projects
3. **How do we test it?** → Methods
4. **How do we keep the work accountable?** → System

Archive is treated as the public record rather than another top-level content category.

## Primary navigation

```text
Home
├─ Research
├─ Projects
├─ Methods
├─ System
│  ├─ Registry
│  ├─ Handbook
│  └─ Archive
└─ Archive
```

Supporting pages:

- About — mission and research principles
- Registry — study state, preregistration-like records, change history
- Handbook — governance, AI use, data management, reproducibility
- Archive — public research notes, protocols, code, and validated findings

## Homepage narrative

```text
Identity / Hero
      ↓
Research Fields
      ↓
Current Agenda
      ↓
Methods
      ↓
Workflow
      ↓
Project Board
      ↓
Research Operating System
      ↓
Manifesto / About
```

The homepage should move from **identity → questions → methods → work → accountability**.

## Visual system

### Core palette

- Paper: `#f5f2ea`
- Ink: `#111111`
- Signal orange: `#ff5a36`
- Signal lime: `#d9ff43`
- Soft paper: `#eee9de`

### Design language

- editorial academic typography
- visible grids and thin rules
- large Korean display type with concise English labels
- circular / orbital diagrams for Human–AI interaction
- orange as the primary research signal
- lime only as a secondary systems/status signal
- no generic SaaS gradients, glass cards, or heavy shadows
- motion is subtle and disabled with `prefers-reduced-motion`

## Content integrity

The design must not create the appearance of research accomplishments that do not exist.

Allowed:

- counts derived from the site structure, e.g. number of research axes
- project status such as BUILDING or PLANNED
- documented methods and protocols

Not allowed without evidence:

- sample sizes
- effect sizes
- statistical significance
- publication claims
- partnerships or affiliations
- invented team members
- completed-study claims

## Release checks

Before production:

1. `eslint src`
2. `next build`
3. verify all public routes
4. verify mobile CSS rules
5. confirm Git working tree only contains intended changes
6. push to `main`
7. wait for GitHub Actions and Vercel success
8. verify production homepage and System page
