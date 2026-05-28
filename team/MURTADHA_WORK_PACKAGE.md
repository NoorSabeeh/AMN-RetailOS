# Murtadha Work Package

## Role

Murtadha is the UX/QA/Field Feedback Owner for AMN RetailOS, with future mobile feasibility/testing work after stable parts are completed.

The responsibility is to test workflows, write clear bug reports, collect field feedback, and prepare practical QA checklists.

## Required Reading Files

- `README.md`
- `CODEX_STATUS.md`
- `TASKS.md`
- `TEAM_ASSIGNMENTS.md`
- `docs/00_PROJECT_OVERVIEW.md`
- `docs/01_PRODUCT_SCOPE.md`
- `docs/04_STORE_PROFILES.md`
- `docs/11_HARDWARE_DEPLOYMENT_REALITY.md`
- `docs/12_UX_CASHIER_WORKFLOW.md`
- `docs/16_FIELD_FEEDBACK_AND_QA_PLAN.md`
- `docs/17_RISK_MATRIX.md`
- `docs/18_30_90_DAY_PLAN.md`
- `docs/19_ACCEPTANCE_CRITERIA.md`
- `team/MURTADHA_WORK_PACKAGE.md`
- `team/HANDOFF_TEMPLATE.md`
- `team/TELEGRAM_UPDATE_TEMPLATE.md`

## Current B1 Responsibilities

- Read QA, field feedback, cashier workflow, hardware, and risk documents.
- Prepare bug report examples using `team/TELEGRAM_UPDATE_TEMPLATE.md`.
- Prepare a QA checklist for the internal Command Center.
- Prepare future QA ideas for product parts after backend implementation begins.
- Track unclear workflows and ask questions before assuming behavior.

## How To Test The Internal Website

For the Command Center, check:

- public login gate,
- role-based access,
- task and checklist update behavior,
- Arabic text readability,
- mobile layout,
- Docs Hub link behavior,
- updates/blockers/decisions pages,
- no internal data shown before login.

Write findings as bug reports, not code changes.

## How To Test Later Product Parts

When product features are approved later, focus on:

- cashier speed,
- barcode workflow,
- printer failures,
- Arabic/RTL receipts,
- power or internet loss,
- returns,
- debt,
- shift close,
- backup and restore,
- confusing error messages.

## Future Mobile Feasibility Notes

Mobile feasibility is future research only. Do not build a mobile app in the current phase.

When stable web parts exist, record:

- which screens are usable on mobile,
- which screens need redesign,
- whether buttons and tables fit,
- whether Arabic text remains readable,
- whether offline behavior is clear.

## No Code Changes Unless Approved

Do not change code unless explicitly approved for a specific task.

Allowed now:

- QA notes,
- bug reports,
- screenshots,
- field feedback,
- checklist drafts,
- mobile feasibility notes.

## How To Submit QA And Field Feedback

Use Telegram and include:

- page or workflow,
- steps,
- expected result,
- actual result,
- severity,
- screenshot if useful,
- device and browser,
- whether the issue blocks the phase.
