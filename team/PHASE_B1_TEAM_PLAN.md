# Phase B1 Team Plan

## Phase Name

Backend Foundation B1 - Recovery, Build Validation, and Architecture Lock

## Goal

Prepare AMN RetailOS to resume Backend Foundation B1 safely after the .NET SDK blocker is resolved. This phase focuses on recovery, planning, build validation readiness, schema/service boundaries, and test strategy.

B1 is not complete. Do not mark it complete until the backend solution can build, tests can run, and migration validation can be performed.

## Out Of Scope

This phase does not include:

- full product implementation,
- POS/cashier UI implementation,
- product backend runtime completion,
- database migrations without validation tools,
- Restaurant mode,
- Pharmacy mode,
- Clinic/Medical mode,
- AI features,
- online payments,
- mobile app,
- multi-branch product functionality,
- final license activation,
- real license secrets or private keys.

## Entry Requirements

B1 implementation can resume only when:

- the required .NET SDK is installed,
- `dotnet --info` runs successfully,
- the repository state is reviewed,
- any partial backend skeleton files are inspected before reuse,
- the B1 implementation scope is reconfirmed,
- Codex can run build/test validation.

## Exit Criteria

B1 can be considered complete only when:

- the backend solution builds successfully,
- initial schema/migration validation succeeds,
- tests pass for approved B1 correctness foundations,
- Backend B1 status is updated only after validation,
- documentation reflects actual implemented behavior,
- no delayed product modes are represented as implemented,
- no secrets or fake credentials are introduced.

## Noor Tasks

- Confirm B1 remains blocked until .NET SDK validation is ready.
- Review all member handoffs.
- Approve or reject submitted file integration.
- Confirm MVP scope remains Retail/Grocery and basic Wholesale/Grocery.
- Approve next Codex implementation prompt only after blockers are clear.

## Ali Tasks

- Confirm .NET SDK readiness.
- Prepare backend setup notes.
- Review schema, inventory, invoice, and API contract documents.
- Prepare backend validation/test ideas.
- Identify B1 risks before implementation resumes.

## Mohammed Tasks

- Review cashier workflow and UI handoff documents.
- Prepare UI questions tied to API/service contracts.
- Prepare MVP screen/state notes only if requested.
- Avoid final product UI implementation until approved.
- Coordinate any UI assumptions with backend contract questions.

## Murtadha Tasks

- Prepare QA and field feedback checklists.
- Test the internal Command Center when assigned.
- Prepare bug reports using the Telegram template.
- Prepare hardware/printer and Arabic/RTL receipt testing notes.
- Prepare future mobile feasibility notes only after stable web parts exist.

## Required Tools Per Member

Noor:

- GitHub
- Internal Command Center
- Telegram Topics
- Codex
- Markdown editor

Ali:

- Windows laptop
- .NET SDK installer
- terminal
- GitHub docs access
- Telegram Topics

Mohammed:

- VS Code
- Codex
- GitHub docs access
- Telegram Topics
- browser for UI review

Murtadha:

- Internal Command Center access
- browser
- phone or laptop for responsive checks
- Telegram Topics
- screenshot tool

## Deliverables Per Member

Noor:

- B1 readiness decision
- reviewed member blockers
- approved integration list
- next implementation recommendation

Ali:

- .NET SDK readiness report
- backend/data questions
- validation/test idea list
- B1 risk list

Mohammed:

- UI/backend contract questions
- screen/state notes if requested
- Arabic/RTL UI concerns
- frontend handoff summary

Murtadha:

- QA checklist
- bug report examples
- field feedback checklist
- hardware/printer and Arabic/RTL test notes

## Review Gates

Gate 1: Reading complete

- Each member confirms required reading.

Gate 2: Environment readiness

- .NET SDK status is known.
- B1 blocker is either resolved or still documented.

Gate 3: Handoff review

- Submitted files include handoff summaries.
- Codex compares files with the repository.
- No direct overwrite occurs.

Gate 4: Implementation approval

- Coordinator approves the next Codex implementation prompt.
- Build/test validation is available.

## Telegram Update Cadence

During active coordination:

- one daily Done/Blocked/Next update per member,
- one file submission message per submitted package,
- bug reports in the bug report template,
- blockers posted immediately when they affect another member.

## Codex Merge/Review Flow

Codex should:

1. inspect the current repository,
2. inspect submitted member files,
3. compare changes,
4. detect conflicts and scope drift,
5. apply only approved changes,
6. run validation checks,
7. update status docs only when the status actually changes,
8. summarize exact files created or updated.

## Definition Of Done

TEAM-1 and B1 preparation are done when:

- every member has a clear work package,
- Telegram update and file submission templates are being used,
- submitted files are reviewed before merge,
- B1 environment readiness is known,
- no product runtime code is changed by coordination work,
- Backend B1 remains blocked or proceeds only after .NET SDK build/test validation is possible.
