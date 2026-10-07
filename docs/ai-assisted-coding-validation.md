# DDALKAK LAB — AI-Assisted Coding Validation Protocol

> Use this protocol when an LLM or other AI system materially contributes to labeling, coding, classification, extraction, or annotation.

## 1. Define the coding task

- Research question:
- Unit of analysis:
- Target construct:
- Label set / coding categories:
- Multi-label or single-label:
- Missing / uncertain category:
- Inclusion criteria:
- Exclusion criteria:

The construct definition and codebook should be fixed before evaluating AI performance.

## 2. Build a human reference set

Create a reference subset that is coded without access to the AI output.

Record:

- Sampling rule for the reference set
- Number of items
- Number of human coders
- Training procedure
- Adjudication procedure
- Human–human agreement metric, where applicable
- Known ambiguous cases

Do not treat AI agreement with one unverified human label as a gold standard automatically.

## 3. Freeze the AI configuration

Record the exact configuration used for the evaluated run:

- Provider / system
- Model name
- Model version or dated identifier, when available
- Access date
- Prompt / system instruction
- Few-shot examples
- Output schema
- Temperature or sampling settings, when exposed
- Preprocessing steps
- Retrieval / external context, if any

If the provider does not expose a setting or version, record that limitation rather than guessing.

## 4. Run blind AI coding

The AI should not receive the human reference labels during the evaluated coding pass.

Store:

- Raw AI output
- Parsed label
- Invalid / missing outputs
- Retry rule
- Human corrections, if any, in a separate field

Keep the original AI output so that corrections do not overwrite the audit trail.

## 5. Evaluate agreement and error

Choose metrics that fit the task rather than reporting one metric mechanically.

Possible measures include:

- Accuracy for balanced, mutually exclusive labels
- Precision / recall / F1 for classification performance
- Cohen's kappa for two coders under appropriate assumptions
- Krippendorff's alpha for suitable multi-coder or missing-data settings
- Confusion matrix for category-level error patterns

Also create an error taxonomy, for example:

- construct ambiguity
- context omission
- sarcasm / pragmatics
- entity confusion
- temporal misunderstanding
- policy / domain knowledge gap
- output-format failure

## 6. Set an acceptance rule before full-scale coding

Document what evidence is required before AI coding can be used beyond the validation subset.

The rule should be tied to the research purpose and cost of error. Avoid universal thresholds that are unrelated to the construct or study design.

If performance is inadequate:

1. revise the codebook or prompt,
2. create a new version,
3. re-run validation on a held-out or newly sampled set,
4. record the change.

Do not tune repeatedly on the same evaluation set without documenting that it has become part of development.

## 7. Human adjudication

Specify which cases require human review.

Examples:

- low-confidence or invalid outputs
- disagreement with human coding
- categories with systematically weak performance
- sensitive or high-impact labels
- novel cases outside the validated distribution

The final dataset should distinguish:

- AI-only label
- human-only label
- adjudicated final label
- reason for override

## 8. Stability and drift checks

For long-running projects, re-check a fixed or sampled validation set when:

- the model version changes,
- the prompt changes,
- the data domain changes,
- a meaningful amount of time has passed,
- output behavior appears to shift.

Record the date and configuration for every check.

## 9. Minimum reporting block

A public methods note should state at least:

- what the AI coded,
- which model/configuration was used,
- how the human reference set was created,
- which evaluation metrics were used,
- how disagreements were handled,
- what remained human-reviewed,
- known limitations and possible drift.

## 10. Files to keep

Recommended structure:

```text
study/
├─ codebook/
│  ├─ codebook_v1.md
│  └─ codebook_v2.md
├─ validation/
│  ├─ human_reference.csv
│  ├─ ai_raw_output.jsonl
│  ├─ evaluation.csv
│  └─ error_log.md
├─ prompts/
│  └─ coding_prompt_v1.md
└─ analysis/
   └─ validation_analysis.*
```

Never put participant-identifying or restricted data in a public repository.
