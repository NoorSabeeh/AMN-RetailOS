# MVP v0.1 Scope

MVP v0.1 must be small enough to finish and strong enough to trust in a real store. The goal is not to build every future mode. The goal is to build a correct local-first Retail/Grocery and basic Wholesale/Grocery foundation.

## Included Modules

- Retail/Grocery Mode
- Basic Wholesale/Grocery Mode
- Store Setup
- Products
- Categories
- Barcode
- Units
- Unit Conversion
- Inventory
- Inventory Movements
- Sales/POS
- Invoices
- Customers
- Customer Debt
- Suppliers
- Purchases
- Returns
- Cash Sessions/Shifts
- Reports
- Users/Roles
- Audit Logs
- Backup/Restore
- Basic License/Demo Protection
- Printer Test/Support
- Offline-first operation
- Basic installer flow

## MVP Rules

- Sales must work without internet.
- Inventory changes must be recorded as movements.
- Invoice numbers must not duplicate.
- Sales, payments, inventory movements, invoice creation, cash session updates, and audit logs must be transactional.
- Duplicate submit or retry must not duplicate a sale or payment.
- Returns must be traceable to original sale or invoice where possible.
- Customer debt must be ledger-based.
- Backups must be verifiable and restorable in a test environment.
- Arabic/RTL receipt and UI rendering concerns must be treated as MVP risks, not polish.

## Explicitly Delayed

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
- Full AMN Control Center production system
- Delivery tracking
- Marketplace integrations
