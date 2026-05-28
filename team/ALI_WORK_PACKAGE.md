# Ali Work Package

## Role

Ali is the Backend/Data Owner for AMN RetailOS.

The responsibility is to understand the backend data model, inventory rules, invoice rules, service contracts, validation needs, and backend readiness requirements.

## Beginner-Friendly Setup Expectations

Start by reading and writing notes. Do not worry about implementing backend code until the environment is ready and the phase is approved.

For B1, the first technical readiness step is:

1. install the required .NET SDK,
2. run `dotnet --info`,
3. report the installed SDK version,
4. wait for Codex review before continuing backend implementation.

## Required Reading Files

- `README.md`
- `CODEX_STATUS.md`
- `TASKS.md`
- `TEAM_ASSIGNMENTS.md`
- `docs/02_MVP_V0_1_SCOPE.md`
- `docs/05_BACKEND_ARCHITECTURE.md`
- `docs/06_DATABASE_CONCEPTUAL_SCHEMA.md`
- `docs/07_INVENTORY_RULES.md`
- `docs/08_INVOICE_SALES_RULES.md`
- `docs/09_SECURITY_AND_LICENSE_PLAN.md`
- `docs/10_BACKUP_RESTORE_RECOVERY.md`
- `docs/14_API_SERVICE_CONTRACTS_DRAFT.md`
- `docs/19_ACCEPTANCE_CRITERIA.md`
- `team/ALI_WORK_PACKAGE.md`
- `team/HANDOFF_TEMPLATE.md`
- `team/FILE_SUBMISSION_RULES.md`

## Why These Docs Matter

- Backend architecture explains where business rules must live.
- Database schema explains the tables and relationships that B1 must protect.
- Inventory rules explain why stock must be movement-ledger based.
- Invoice and sales rules explain transactions, idempotency, and no hard delete.
- API contracts explain what the frontend will expect from backend services.
- Acceptance criteria explain what must eventually be proven by tests.

## Current B1 Responsibilities

- Confirm .NET SDK installation status.
- Prepare a short backend readiness note.
- List schema questions before implementation resumes.
- List inventory movement test ideas.
- List invoice sequence and idempotency test ideas.
- Identify any backend risks that could cause data loss, duplicate invoices, or inventory mismatch.

## What Not To Touch

Do not implement:

- product backend runtime code,
- database migrations,
- POS UI,
- Restaurant mode,
- Pharmacy mode,
- Clinic mode,
- AI features,
- online payments,
- mobile app,
- multi-branch functionality.

Do not submit:

- secrets,
- `.env` or `.env.local`,
- service role keys,
- database passwords,
- local machine paths,
- generated build folders.

## How To Submit Backend/Data Notes

Use Telegram and include:

- topic: Backend/Data - B1,
- the related file path,
- what you understood,
- what is unclear,
- any proposed table/service/test idea,
- any risk,
- whether Codex review is needed.

Use `team/HANDOFF_TEMPLATE.md` for file submissions.

## Validation/Test Ideas To Prepare

Prepare ideas for tests that prove:

- migration creates approved schema,
- barcode uniqueness works,
- unit conversion rejects invalid factors,
- stock is calculated from inventory movements,
- negative stock is blocked by default,
- invoice numbers do not duplicate,
- sale commit rolls back completely on failure,
- idempotency prevents duplicate sale/payment,
- audit logs are written for sensitive actions.
