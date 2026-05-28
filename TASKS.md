# AMN RetailOS Task Backlog

This backlog is prioritized for the first production path. P0 is limited to MVP foundation and backend correctness.

## P0: MVP Foundation and Backend Correctness

- Freeze MVP scope around Retail/Grocery and basic Wholesale/Grocery.
- Select backend/runtime architecture for a local-first Windows laptop application.
- Define initial database schema from the conceptual schema.
- Implement store setup foundation.
- Implement products, categories, barcodes, units, and unit conversion.
- Implement inventory movement ledger.
- Implement stock position calculation and negative stock prevention.
- Implement sales transaction boundary.
- Implement invoice sequence and invoice lifecycle.
- Implement idempotency for sale/payment/return commits.
- Implement payments with full, partial, debt, and mixed payment support.
- Implement customer ledger for debt.
- Implement supplier and purchase foundation.
- Implement returns with inventory and payment/debt effects.
- Implement cash sessions and close-shift reconciliation.
- Implement users, roles, permissions, and manager approval foundation.
- Implement audit logs for sensitive operations.
- Implement verified backup and restore-to-test workflow.
- Implement license/demo status foundation without shipping private keys.
- Implement Printer Test Center plan for receipt, A4, and Arabic/RTL test output.
- Define backend tests for sale, return, inventory, invoice, debt, cash session, backup, and idempotency.

## P1: Business Safety and Pilot Readiness

- Review AMN RetailOS Command Center in `project_portal/`.
- Validate CC-2.2 public access gate in production (signed-out, Admin, Member, Viewer sessions).
- Validate CC-2.2.1 Arabic text rendering on GitHub Pages (no mojibake in PublicAccess, TopBar, Sidebar, Overview, and action buttons).
- Validate checklist toggle UX in production: immediate progress update, persisted after reload, and rollback behavior on failed save.
- Verify viewer route restrictions and member-only edit constraints against Supabase RLS in live testing.
- Validate mobile/private-browsing behavior for storage-safe fallback and non-crashing sign-in screen.
- Configure AMN RetailOS Command Center v2.1 Supabase environment only with local `.env` values.
- Apply the normalized Supabase table schema and confirm `workspace_snapshots` is backup/export only.
- Review Supabase RLS policies before using shared portal sync with real accounts.
- Create portal accounts manually in Supabase Auth; do not expose public signup.
- Use the Setup Health page to confirm Supabase/local fallback and GitHub docs link configuration.
- Use the portal Tasks page to track Phase T1 role updates.
- Add first Done/Blocked/Next updates in the portal and export JSON for manual sharing.
- Confirm the portal remains internal planning UI only and does not drift into product UI.
- Add stronger reports for sales, stock, debt, suppliers, and cash sessions.
- Add hardware diagnostics screen.
- Add Arabic/RTL receipt rendering validation on real printers.
- Add installer flow planning and signed-build process.
- Add update/migration/rollback process.
- Add performance checks for long-running local databases.
- Add field feedback templates and pilot store checklist.
- Add support workflow for license transfer to a new laptop.
- Add restore drill checklist for support use.

## P2: Product Expansion After Core Stability

- Expand wholesale pricing and customer-specific price lists.
- Add more advanced stock count workflows.
- Add label printer workflows.
- Add deeper reporting and export options.
- Add richer training mode.
- Add optional batch/expiry foundations without full Pharmacy mode.
- Add optional serial/warranty foundations without full Electronics/Warranty mode.

## Deferred

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
- Full AMN Control Center
- Direct weighing scale integration
- Customer display support
- Restaurant tables, kitchen tickets, and menu modifiers
- Appointments and service scheduling
- Warranty and repair ticket workflows
