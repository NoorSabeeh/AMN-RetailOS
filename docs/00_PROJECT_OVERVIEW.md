# AMN RetailOS Project Overview

AMN RetailOS is a local-first Windows laptop POS, cashier, inventory, invoicing, and business management system for small and medium stores. The product is designed for real store conditions: unreliable internet, unstable power, ordinary Windows laptops, USB receipt printers, barcode scanners, non-technical operators, and the need to keep selling even when external services are unavailable.

The product direction is one commercial platform with configurable store profiles, not separate applications per business type. The shared core must handle products, barcodes, units, inventory movements, sales, invoices, customers, suppliers, shifts, users, permissions, audit logs, backup/restore, and license verification.

## First Production Focus

The first production version must focus only on:

- Retail/Grocery Mode
- Basic Wholesale/Grocery Mode

This focus protects the most important part of the product: correctness in inventory, sales, invoices, returns, cash sessions, debt, backups, and audit logs.

## Product Principles

- Local-first operation is mandatory, not optional.
- Core selling workflows must work without internet.
- Business rules must live in backend services, not in frontend screens.
- Inventory must be movement-ledger based.
- Invoices must be immutable after creation except through void, cancel, return, or reversal flows.
- Backup and restore are core product requirements.
- Arabic/RTL receipts and UI text must be planned from the beginning.
- Store profiles should enable or hide features without fragmenting the product into separate apps.

## Current Project Phase

Current phase: Project Foundation Planning.

No application implementation has started. This documentation foundation defines the product scope, backend direction, data model concepts, service contracts, UI handoff, workflow, risks, acceptance criteria, and early implementation phases.
