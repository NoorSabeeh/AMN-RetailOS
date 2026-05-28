# Database Conceptual Schema

This document lists conceptual tables for planning. It is not a migration file and does not define final column names or indexes.

## Core Tables

### Store and Settings

- stores
- store_settings
- store_profiles
- settings

### Users and Access Control

- users
- roles
- permissions
- user_roles
- sessions

### Product Catalog

- products
- categories
- product_barcodes
- units
- product_unit_conversions
- price_lists

### Inventory

- inventory_batches
- inventory_movements
- stock_counts
- stock_count_lines

Batch support is listed because the data model should not block future expiry capability. Full batch/expiry workflows remain delayed.

### Sales, Invoices, and Payments

- sales
- sale_lines
- payments
- invoices
- invoice_sequences

### Returns

- returns
- return_lines

### Customers and Debt

- customers
- customer_accounts
- customer_payments

### Suppliers and Purchases

- suppliers
- supplier_accounts
- supplier_payments
- purchases
- purchase_lines

### Cash Sessions

- cash_sessions
- cash_movements

### Logs, Backup, and License

- audit_logs
- app_logs
- error_logs
- backups
- licenses
- license_events

## Future Tables

These are future capabilities and must not be implemented as full MVP workflows:

- appointments
- services
- staff_commissions
- restaurant_tables
- orders
- order_lines
- kitchen_tickets
- menu_items
- modifiers
- serial_items
- warranties
- repair_tickets

## Conceptual Integrity Rules

- Invoice numbers must be unique.
- Barcode values must map predictably and avoid ambiguous product selection.
- Inventory movements must reference a source document when available.
- Sale commit must connect sale, invoice, payments, inventory movements, cash session, and audit logs.
- Customer and supplier account entries must be append-style ledger records.
- Audit logs must not be user-editable.
- Backup records must include verification status.
