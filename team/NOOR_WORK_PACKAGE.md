# Noor Work Package

## Role Summary

Noor is the Product & Backend Coordinator for AMN RetailOS.

The responsibility is to keep scope clear, coordinate backend direction, review submitted work, approve integration decisions, and protect the project from uncontrolled expansion.

## Current Phase Responsibilities

Current main product phase:

Backend Foundation B1 - Recovery, Build Validation, and Architecture Lock.

Responsibilities in this phase:

- confirm that Backend B1 does not continue until the .NET SDK is installed,
- keep the MVP focused on Retail/Grocery and basic Wholesale/Grocery,
- review backend/data notes from Ali,
- review frontend questions and wireframe notes from Mohammed,
- review QA and field feedback notes from Murtadha,
- approve whether a submitted change is ready for Codex integration,
- keep delayed modes out of current implementation work.

## Required Reading Files

- `README.md`
- `CODEX_STATUS.md`
- `TASKS.md`
- `TEAM_ASSIGNMENTS.md`
- `docs/00_PROJECT_OVERVIEW.md`
- `docs/01_PRODUCT_SCOPE.md`
- `docs/02_MVP_V0_1_SCOPE.md`
- `docs/03_ROADMAP.md`
- `docs/05_BACKEND_ARCHITECTURE.md`
- `docs/06_DATABASE_CONCEPTUAL_SCHEMA.md`
- `docs/07_INVENTORY_RULES.md`
- `docs/08_INVOICE_SALES_RULES.md`
- `docs/09_SECURITY_AND_LICENSE_PLAN.md`
- `docs/10_BACKUP_RESTORE_RECOVERY.md`
- `docs/14_API_SERVICE_CONTRACTS_DRAFT.md`
- `docs/19_ACCEPTANCE_CRITERIA.md`
- `team/HANDOFF_TEMPLATE.md`
- `team/FILE_SUBMISSION_RULES.md`

## Required Tools

- GitHub repository access
- Internal Command Center access
- Telegram Topics
- Codex for review and controlled integration
- Markdown editor or VS Code
- .NET SDK readiness checklist from the Backend/Data Owner before B1 resumes

## Current Tasks

- Confirm all members have read their assigned package.
- Collect one Done/Blocked/Next update from each role.
- Confirm whether the .NET SDK is installed and usable.
- Keep B1 marked blocked until build/test validation is possible.
- Review submitted notes before asking Codex to merge or update project files.
- Track any decision that changes scope, backend rules, or acceptance criteria.

## What To Review From Other Members

From Ali:

- .NET SDK readiness notes
- backend schema questions
- inventory/invoice rule questions
- validation and test ideas

From Mohammed:

- UI questions connected to backend contracts
- cashier workflow questions
- wireframe notes if approved
- frontend handoff risks

From Murtadha:

- QA scenarios
- hardware and printer concerns
- Arabic/RTL receipt testing notes
- field feedback format and bug reports

## Decisions Requiring Coordinator Approval

These decisions require coordinator approval before implementation:

- changing MVP scope,
- starting Backend B1 implementation,
- changing backend stack direction,
- changing schema direction,
- treating a delayed mode as active work,
- accepting submitted files into GitHub,
- marking a phase complete,
- changing acceptance criteria,
- changing license/security direction.

## Telegram Update Format

Use:

```text
Done:
-

Blocked:
-

Next:
-
```

For submitted files, require `team/HANDOFF_TEMPLATE.md`.

## Handoff Rules

- Do not accept Telegram files as official until reviewed.
- Ask Codex to compare submitted files with GitHub before merging.
- Preserve current repository files unless a change is approved.
- Do not approve secrets, local paths, `.env`, `.env.local`, `node_modules`, or `dist`.
- Do not mark Backend B1 complete until build/test/migration validation succeeds.
