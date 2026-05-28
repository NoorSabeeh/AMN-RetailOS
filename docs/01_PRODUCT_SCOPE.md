# Product Scope

AMN RetailOS is a single local-first business operating platform for small and medium stores. It should eventually support multiple store profiles, but the first implementation must stay focused on Retail/Grocery and basic Wholesale/Grocery.

## Core Platform

The Core Platform is shared by all store profiles:

- Store setup and settings
- Products, categories, barcodes, units, and unit conversion
- Inventory and inventory movement ledger
- Sales/POS and invoices
- Payments, customer debt, supplier debt, and purchases
- Returns and exchanges
- Cash sessions/shifts
- Reports
- Users, roles, permissions, and approvals
- Audit logs and application logs
- Backup, restore, diagnostics, and recovery
- Basic license/demo protection
- Printer test and hardware support

## Store Profiles

Store Profiles configure the same platform for different business workflows:

- Retail/Grocery
- Wholesale/Grocery
- Pharmacy
- Restaurant/Cafe
- Clinic/Services
- Clothing
- Electronics/Warranty
- Weight-based stores
- Custom mode

## Add-on Modules

Add-on modules should be introduced after the core platform is stable:

- Batch/expiry
- Serial numbers and warranty
- Restaurant tables and kitchen tickets
- Appointments and service scheduling
- Staff commissions
- Advanced reports
- Local network or multi-device operation
- Future AMN Control Center

## Why One Platform With Modes

The system should be one platform because most store types share the same foundation: products, inventory, sales, invoices, payments, returns, customers, suppliers, reports, permissions, backups, and audit logs. Separate apps would duplicate core logic, increase maintenance cost, and create inconsistent behavior across store types.

Store profiles should control configuration, labels, visible modules, permissions, reports, and workflows while preserving one backend truth model.

## Why v0.1 Is Retail/Grocery + Wholesale Only

Retail/Grocery and Wholesale/Grocery provide the strongest foundation for the shared platform. They require the core product truth: fast barcode selling, product catalog, unit conversion, inventory movements, invoices, payments, customer debt, suppliers, cash sessions, reports, users, audit logs, and backup/restore.

Restaurant, Pharmacy, and Clinic workflows require separate domain logic such as kitchen routing, batch/expiry compliance, appointments, medical privacy, and service scheduling. Building those early would distract from the correctness of the shared core.

## Delayed Scope

The following are explicitly delayed:

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
