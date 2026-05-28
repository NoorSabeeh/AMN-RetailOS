# AMN RetailOS

AMN RetailOS is a local-first Windows laptop POS, cashier, inventory, invoicing, and business management system for small and medium stores.

The first production scope is intentionally focused:

- Retail/Grocery Mode
- Basic Wholesale/Grocery Mode

The project is currently in Project Foundation Planning. Product implementation has not started.

## Current Output

This repository currently contains the planning foundation for:

- Product scope
- MVP scope
- Roadmap
- Store profiles
- Backend architecture
- Conceptual database schema
- Inventory, invoice, and sales rules
- Security and license plan
- Backup/restore/recovery plan
- Hardware deployment reality
- Cashier UX workflow
- Claude AI UI handoff
- Draft API/service contracts
- Team workflow
- Field feedback and QA plan
- Risk matrix
- 30/90 day plan
- Acceptance criteria
- Decision log
- Internal project tracking portal in `project_portal/`

## Scope Guard

Do not implement or claim support for these in the first production version:

- Full restaurant mode
- Full pharmacy mode
- Full clinic/medical mode
- AI features
- Cloud SaaS
- Mobile app
- Multi-branch
- Online payments
- Complex accounting
- Advanced enterprise features

## Documentation Map

Start with:

- `docs/00_PROJECT_OVERVIEW.md`
- `docs/01_PRODUCT_SCOPE.md`
- `docs/02_MVP_V0_1_SCOPE.md`
- `docs/05_BACKEND_ARCHITECTURE.md`
- `docs/13_CLAUDE_UI_HANDOFF.md`
- `docs/14_API_SERVICE_CONTRACTS_DRAFT.md`
- `docs/19_ACCEPTANCE_CRITERIA.md`
- `TASKS.md`
- `CODEX_STATUS.md`

## Development Principle

Build backend correctness first. Inventory, invoices, payments, returns, debt, shifts, audit logs, backup/restore, and license status must be reliable before expanding into additional store profiles.

## Internal Project Portal

`project_portal/` contains AMN RetailOS Command Center v2.1, an internal React/Vite dashboard for team planning and progress tracking.

This portal is not the AMN RetailOS product UI. It does not implement POS, cashier screens, product backend runtime, product database migrations, AI features, online payments, mobile app support, multi-branch product support, or delayed store modes.

Command Center v2.1 supports Supabase table-based shared sync/auth when configured through local environment variables. `workspace_snapshots` is not the primary sync model; it is reserved for optional backup/export/debug snapshots. If Supabase is not configured, the portal runs in local fallback mode and does not claim shared sync is active. Real Supabase keys, passwords, private keys, and license secrets must never be committed.

CC-2.2 hardening adds a public access gate for GitHub Pages: signed-out visitors are limited to a safe login screen and cannot view internal workspace data.

Run locally:

```bash
cd project_portal
npm install
npm run dev
```

Build:

```bash
cd project_portal
npm run build
```

Supabase setup instructions are in `project_portal/README.md`. Backend Foundation B1 remains blocked until the .NET SDK is installed and validated separately.
