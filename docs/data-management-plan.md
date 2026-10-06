# DDALKAK LAB — Data Management Plan

## Purpose

This document defines the default data-management rules for DDALKAK LAB projects. Individual studies may require stricter rules.

## 1. Classify before storing

Use three broad classes.

### Public

Examples:

- public documentation,
- public source code,
- non-sensitive data dictionaries,
- publicly releasable aggregate results,
- licensed or public-domain materials whose redistribution is permitted.

May be stored in the public GitHub repository when appropriate.

### Restricted research

Examples:

- unpublished research datasets,
- licensed datasets that cannot be redistributed,
- private research notes,
- embargoed outputs,
- collaborator materials not approved for release.

Store outside the public repository with access limited to the research team.

### Sensitive / identifying

Examples:

- participant identifiers,
- contact information,
- consent records,
- account credentials,
- raw logs containing identifiers,
- private correspondence.

Do not place these materials in the public repository. Apply the strongest available access controls and collect only what the study requires.

## 2. Recommended project structure

A local or private research workspace may use:

```text
study-id/
  README.md
  protocol/
  code/
  data/
    raw/
    interim/
    processed/
  outputs/
  logs/
```

The public repository should contain only materials cleared for public release.

## 3. Raw data rule

Treat raw data as immutable whenever practical.

- Do not manually overwrite raw source files.
- Transform raw data through scripts into interim or processed data.
- Record collection date, source, inclusion/exclusion rules, and schema.
- Keep a checksum or other integrity record when data provenance is important.

## 4. Identifiers

When identifiers are necessary:

- separate direct identifiers from analysis data,
- use study IDs or pseudonymous keys,
- avoid exposing lookup tables to unnecessary users,
- remove identifiers before creating public derivatives.

## 5. Version control

Use Git for:

- code,
- documentation,
- schemas,
- non-sensitive configuration,
- small public data when redistribution is allowed.

Do not use public Git history for secrets or sensitive data. Deleting a file in a later commit does not reliably erase it from repository history.

## 6. Backups

For active research:

- maintain at least one independent backup of non-reconstructable research material,
- verify that backups can be restored,
- do not rely on a single laptop or a single cloud folder as the only copy.

## 7. AI services

Before sending research data to an AI service:

- determine whether the material contains personal, confidential, licensed, or embargoed information,
- minimize or de-identify the content where possible,
- confirm that the intended use is permitted,
- record material AI transformations in the research record.

## 8. Retention and deletion

At study close:

- document what must be retained and why,
- remove unnecessary working copies,
- retain only the minimum required identifying information,
- document the release status of code and derived data.

Legal, institutional, contractual, or ethics requirements take precedence over this default policy.

## 9. Public release checklist

Before publishing a file, confirm:

- redistribution is permitted,
- no credentials or API keys are present,
- no participant-identifying information is present,
- private correspondence has been removed,
- metadata and filenames do not expose unintended personal information,
- the file's study status and version are clear.
