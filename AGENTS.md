# AGENTS.md

Guidance for agents working in this repository.

## Current Phase

Current phase: Project Foundation Planning.

This repository is not yet an application implementation. Treat existing files as planning and coordination documents unless a later approved task creates application code.

## Allowed Current Scope

Agents may update:

- `docs/`
- `README.md`
- `AGENTS.md`
- `CODEX_STATUS.md`
- `TASKS.md`

Only update other files if a future task explicitly approves it.

## Protected Source Documents

Do not modify:

- `AMN_RetailOS_Master_Plan.md`
- `deep-research-report.md`

These are source reference documents.

## Product Scope Rules

MVP v0.1 is limited to:

- Retail/Grocery Mode
- Basic Wholesale/Grocery Mode

Do not implement or claim completed support for:

- Full Restaurant mode
- Full Pharmacy mode
- Full Clinic/Medical mode
- AI features
- Cloud SaaS
- Mobile app
- Multi-branch
- Online payments
- Complex accounting
- Advanced enterprise features

## Language and Collaboration Rules

- Use role-based language only.
- Do not mention personal names as owners.
- Do not use personal hierarchy labels.
- Do not describe team member weaknesses.
- Use neutral role labels:
  - Product & Backend Coordinator
  - Frontend/UI Owner
  - Backend/Data Owner
  - UX/QA/Field Feedback Owner

## Technical Direction

- Local-first Windows operation is mandatory.
- Backend owns business rules.
- Frontend must respect backend service decisions.
- Inventory must be movement-ledger based.
- Invoices must not be hard-deleted.
- Sales and returns must be transactional.
- Write operations with financial/inventory side effects should use idempotency keys.
- Backup/restore, audit logs, and license/demo status are core requirements.
- Arabic/RTL receipt and UI concerns must be documented and tested.

## Documentation Style

- Be practical and specific to AMN RetailOS.
- Avoid fake credentials, real secrets, or private signing keys.
- Avoid claiming unfinished features work.
- Mark delayed features clearly as delayed.
