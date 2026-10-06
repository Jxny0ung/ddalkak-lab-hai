# DDALKAK LAB

**Business × Media & Communication × Human–AI Interaction**

DDALKAK LAB(딸깍 연구소)은 경영학과 미디어커뮤니케이션의 질문을 Human–AI Interaction 관점에서 연결하는 학부 연구 프로젝트입니다.

**Live site:** https://ddalkak-lab-hai.vercel.app

## Research focus

- Human–AI Interaction and decision-making
- Media, information, trust, misinformation and fact-checking
- Platform incentives, management and governance
- Computational communication and text analysis

## Research workflow

**Explore → Rebuild → Improve → Share**

논문과 사례에서 질문을 찾고, 연구 설계를 작은 단위로 재구성하며, 실패와 한계를 기록해 개선하고, 코드·방법·판단 근거를 재현 가능한 형태로 남깁니다.

## Public site structure

- `/` — research overview
- `/research` — research areas and current agenda
- `/methods` — methods, outputs, reproducibility checklist
- `/projects` — project status board and publication rules
- `/archive` — staged public research archive
- `/about` — mission and research principles

The public site intentionally distinguishes planned work from completed empirical findings. No sample sizes, effects, partnerships, publications, awards, or team information should be invented to fill empty sections.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- CSS
- Vercel
- GitHub Actions CI

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Before merging or deploying:

```bash
npm run lint
npm run build
```

## Repository safety

Do not commit:

- API keys, passwords, or tokens
- participant-level or personally identifying data
- private emails or unpublished correspondence
- raw private research datasets
- materials that collaborators have not approved for public release

See `AGENTS.md` for the project-specific coding and research-content rules.

---

© 2026 DDALKAK LAB
