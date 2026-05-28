# Mohammed Work Package

## Role

Mohammed is the Frontend/UI Owner for AMN RetailOS.

Mohammed has VS Code and Codex available. This phase uses those tools for reading, notes, questions, and safe file handoff. It is not the phase for building the full POS product UI.

## Required Reading Files

- `README.md`
- `CODEX_STATUS.md`
- `TASKS.md`
- `TEAM_ASSIGNMENTS.md`
- `docs/00_PROJECT_OVERVIEW.md`
- `docs/01_PRODUCT_SCOPE.md`
- `docs/02_MVP_V0_1_SCOPE.md`
- `docs/04_STORE_PROFILES.md`
- `docs/12_UX_CASHIER_WORKFLOW.md`
- `docs/13_CLAUDE_UI_HANDOFF.md`
- `docs/14_API_SERVICE_CONTRACTS_DRAFT.md`
- `docs/16_FIELD_FEEDBACK_AND_QA_PLAN.md`
- `docs/19_ACCEPTANCE_CRITERIA.md`
- `team/MOHAMMED_WORK_PACKAGE.md`
- `team/HANDOFF_TEMPLATE.md`
- `team/FILE_SUBMISSION_RULES.md`

## Why Frontend Must Read Backend-Related Docs

The frontend must not invent business rules. Backend services will decide permissions, stock availability, invoice status, returns, debt, cash sessions, license status, and audit events.

Reading backend contracts helps the UI owner prepare correct questions such as:

- What response should the POS screen show when stock is blocked?
- What fields are needed to commit a sale?
- What should happen if printer output fails after the sale is saved?
- Which actions require approval?
- What error states should be shown for idempotency retries?

## Current B1 Responsibilities

- Read cashier workflow and Claude UI handoff docs.
- Prepare UI questions that depend on backend API/service contracts.
- Prepare a small list of MVP screens and states as notes only.
- Identify Arabic/RTL UI and receipt concerns.
- Review internal Command Center workflow only if assigned.
- Wait for approval before implementing product UI screens.

## No Full POS UI Yet

Do not implement:

- final POS/cashier screens,
- final product frontend,
- Restaurant, Pharmacy, or Clinic screens,
- AI features,
- mobile app,
- online payment screens,
- multi-branch UI.

Wireframe notes or questions are allowed if requested. Full UI implementation must wait for approved UI planning and backend contract clarity.

## How To Coordinate With Backend Contracts

For each UI question, include:

- screen or workflow,
- required backend decision,
- required data fields,
- expected success state,
- expected validation/error state,
- whether manager approval is needed,
- Arabic/RTL concern if relevant.

## How To Submit UI Files Safely

- Submit only approved notes, sketches, or documentation unless implementation is approved.
- Use repository-relative paths.
- Include `team/HANDOFF_TEMPLATE.md`.
- Do not overwrite existing files directly.
- Do not submit `node_modules`, `dist`, `.env`, `.env.local`, or secrets.
- If code is approved later, include build/test output.
