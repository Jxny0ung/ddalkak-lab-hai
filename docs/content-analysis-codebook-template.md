# DDALKAK LAB — Content Analysis Codebook Template

> Define observable rules before coding. Replace examples with study-specific language and keep every revision versioned.

## 1. Study identity

- Study ID:
- Working title:
- Codebook version:
- Created:
- Last updated:
- Owner(s):
- Related research record:

## 2. Unit of analysis

- Unit:
- Start / end boundary:
- Source:
- Time window:
- Language(s):
- Inclusion criteria:
- Exclusion criteria:
- Duplicate handling:
- Missing-content rule:

## 3. Sampling

- Sampling frame:
- Sampling method:
- Target sample:
- Stratification / quota rule:
- Random seed, if applicable:
- Replacement rule:
- Excluded-source log location:

## 4. Variable dictionary

| Variable | Construct | Type | Allowed values | Coding rule | Missing rule |
| --- | --- | --- | --- | --- | --- |
| item_id | identifier | string | unique | immutable source key | never missing |
|  |  |  |  |  |  |

## 5. Category specification

Repeat this block for every substantive variable.

### Variable: [name]

**Construct definition**

What theoretical concept is this variable intended to capture?

**Operational definition**

What observable evidence is sufficient to assign a code?

**Values**

- `0` — 
- `1` — 
- `2` — 
- `NA` — not codable under the stated rule

**Inclusion examples**

- 

**Exclusion / counterexamples**

- 

**Ambiguous cases**

- 

**Decision rule**

When two rules conflict, which rule has priority?

## 6. Coder procedure

1. Read the full unit required by the codebook.
2. Apply eligibility rules before substantive coding.
3. Code variables in the documented order.
4. Use the uncertainty field instead of forcing an unsupported label.
5. Log unresolved cases without changing the codebook silently.
6. Apply adjudicated rule changes only in a new codebook version.

## 7. Training and pilot

- Training set source:
- Training set size:
- Pilot set source:
- Pilot set size:
- Feedback procedure:
- Codebook changes after pilot:
- Date the production codebook was frozen:

Keep training items separate from the final reliability sample when the design requires an independent reliability check.

## 8. Reliability plan

- Reliability sample rule:
- Human coders:
- Variables included:
- Metric per variable:
- Missing-data handling:
- Adjudication procedure:
- Re-training trigger:

Possible agreement statistics should be selected based on variable type and study design rather than by habit.

## 9. AI-assisted coding, if used

- AI role:
- Model / version:
- Prompt version:
- Human reference set:
- Validation protocol:
- Required human review cases:
- Override field:
- Drift-check schedule:

Use `docs/ai-assisted-coding-validation.md` for the validation procedure.

## 10. Revision log

| Date | Version | Variable / rule changed | Reason | Before production? |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

Never overwrite a prior production codebook without preserving the old version.
