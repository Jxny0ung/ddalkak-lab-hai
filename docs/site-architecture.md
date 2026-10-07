# DDALKAK LAB — Site Architecture

## Purpose

DDALKAK LAB is a research interface, not a generic portfolio. The information architecture should answer five questions:

1. **What do we study?** → Research
2. **What are we building?** → Projects
3. **How do we test it?** → Methods
4. **How do people interact with it?** → HAI Lab
5. **How do we keep the work accountable?** → System

Archive is the public record rather than a marketing page.

## Primary navigation

```text
Home
├─ Research
├─ Projects
├─ Methods
├─ HAI Lab
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
HAI Lab
      ↓
Research Operating System
      ↓
Manifesto / About
```

The homepage should move from **identity → questions → methods → work → interaction → accountability**.

## HAI Lab

The HAI Lab is the interactive prototype layer.

Current prototype:

```text
explicit mic permission
→ local Web Audio analysis
→ double clap detection
→ DDALKAK CORE activation
```

Future architecture:

```text
human intent
→ CORE
→ agent router
→ approval gate
→ MCP gateway
→ tools
→ verifier
→ audit log
```

The animated AI company is a concept visualization. It must not imply that autonomous MCP agents are already connected.

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
- small caricature-like agents for the future-company concept
- orange as the primary research signal
- lime as a limited system/status signal
- no generic SaaS gradients, glass cards, or heavy shadows
- motion is disabled with `prefers-reduced-motion`

## Content integrity

The design must not create the appearance of research or product capabilities that do not exist.

Allowed:

- counts derived from the site structure
- BUILDING / PLANNED project status
- documented methods and protocols
- clearly labelled prototypes and future architecture

Not allowed without evidence:

- sample sizes
- effect sizes
- statistical significance
- publication claims
- partnerships or affiliations
- invented team members
- completed-study claims
- claims that MCP tools are connected when they are only planned

## Release checks

Before production:

1. `eslint src`
2. `next build`
3. verify all public routes
4. verify microphone start/stop and manual fallback when testing HAI Lab
5. verify mobile CSS and reduced-motion rules
6. confirm Git working tree only contains intended changes
7. push to `main`
8. wait for GitHub Actions and Vercel success
9. verify production homepage, HAI Lab, and System page
