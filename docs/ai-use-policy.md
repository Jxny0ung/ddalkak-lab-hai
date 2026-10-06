# DDALKAK LAB — AI Use Policy

## Purpose

This policy defines how generative AI and other AI systems may be used in DDALKAK LAB research work. The central rule is simple:

> AI may assist the research process, but it does not replace research accountability.

## 1. Record the AI role

For every study or pilot that materially uses AI, record:

- model or system name,
- date and version when available,
- task assigned to the AI,
- prompt or interaction protocol when relevant,
- human verification step,
- known limitations,
- whether the AI output entered data, coding, analysis, interpretation, or writing.

Use `docs/research-record-template.md`.

## 2. Allowed assistance

AI may be used to assist with tasks such as:

- brainstorming research questions,
- drafting search terms,
- code generation and debugging,
- data-cleaning suggestions,
- text classification prototypes,
- translation or language polishing,
- summarization for researcher review,
- preparation of documentation,
- generation of synthetic test data that is clearly labeled synthetic.

These outputs require human review before they are treated as research inputs.

## 3. Higher-risk uses

The following uses require explicit validation procedures:

### AI-assisted coding or classification

- Define the target construct before prompting the model.
- Maintain a human-coded or otherwise defensible validation sample.
- Report the validation procedure and relevant error patterns.
- Do not treat fluent model output as evidence of coding validity.

### AI-assisted analysis

- Preserve executable analysis code where possible.
- Independently verify calculations, variable definitions, and statistical claims.
- Record material model-generated transformations or decisions.

### AI-assisted literature work

- Verify every cited source from the original publication or trusted index.
- Never cite a reference only because a model generated it.
- Distinguish the model's synthesis from the source authors' claims.

## 4. Prohibited practices

Do not:

- upload participant-identifying or restricted data to an AI service without an approved basis,
- fabricate observations, quotations, references, effect sizes, or statistical results,
- present synthetic data as observed data,
- allow AI to make an undisclosed final eligibility, coding, or interpretation decision in a high-impact research step,
- publish private emails, unpublished correspondence, credentials, tokens, or restricted materials through prompts or repositories.

## 5. Human verification

The researcher remains responsible for:

- factual accuracy,
- source verification,
- coding validity,
- statistical interpretation,
- privacy and consent,
- final wording of public research claims.

A statement such as "AI generated it" is not a substitute for a validation method.

## 6. Disclosure

Public outputs should disclose AI use when it materially affected:

- study design,
- data construction,
- coding or classification,
- statistical or computational analysis,
- substantive interpretation,
- public-facing research text.

The disclosure should describe the role of AI rather than using a generic "AI was used" statement.

## 7. Versioning

AI systems change over time. When reproducibility matters, preserve:

- model/system identifier,
- date of use,
- important parameters if available,
- prompt/protocol version,
- validation set or evaluation procedure.

## 8. Review

This is a living policy. Update it when a project exposes a new failure mode, privacy concern, or validation requirement.
