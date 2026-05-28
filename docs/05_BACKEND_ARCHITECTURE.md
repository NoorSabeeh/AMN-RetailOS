# Backend Architecture

The backend is the reliability center of AMN RetailOS. The frontend may provide speed and usability, but the backend must own business correctness.

## Core Architecture Principles

- The local backend must work without internet.
- Business rules must live in backend services, not frontend screens.
- Financial and inventory operations must use database transactions.
- Duplicate submit/retry must be handled through idempotency keys.
- Inventory must be movement-ledger based.
- Invoices must follow an immutable lifecycle.
- Returns must create traceable reversal or return records.
- Customer and supplier debt must be ledger-based.
- Cash sessions must reconcile expected and counted cash.
- Audit logs must capture sensitive business actions.
- Backups must be verifiable before they are trusted.
- License verification must work offline after activation.

## Local Backend

The Local Backend runs on the store laptop and owns:

- Product catalog
- Inventory
- Sales and invoices
- Returns
- Payments
- Customers and suppliers
- Debt ledgers
- Cash sessions
- Reports
- Users and roles
- Audit logs
- Backup and restore
- License status
- Diagnostics

The store must continue selling if internet is unavailable.

## Business Rule Ownership

The backend decides:

- Whether negative stock is allowed
- Whether discounts require approval
- Whether a user can void, return, or adjust stock
- Whether a customer can exceed debt limits
- Whether a sale can be saved
- Whether a license or demo mode allows a feature
- Whether a backup is valid

The frontend must display backend decisions and collect required reason/approval input. It must not invent business permissions.

## Transaction Boundaries

A sale commit must happen in one transaction:

1. Validate cart, user permissions, prices, units, stock, customer, and cash session.
2. Create sale and sale lines.
3. Create invoice and reserve the next invoice number.
4. Create payment records.
5. Create customer debt entry if payment is partial or deferred.
6. Create inventory movements.
7. Update cash session totals.
8. Write audit log entries.
9. Return one committed result to the frontend.

If any step fails, the whole operation must fail.

## Idempotency

Save/pay actions must accept an idempotency key. If the same key is retried, the backend returns the original result rather than creating a duplicate sale, invoice, or payment.

Required for:

- Sale commit
- Payment commit
- Return commit
- Customer payment
- Supplier payment
- Purchase commit

## Inventory Movement Ledger

Inventory quantity should be calculated from movements or reconciled from movements. A cached product quantity can exist for speed, but it is not the source of truth.

Movement types include:

- opening_balance
- purchase
- sale
- customer_return
- supplier_return
- damage
- expiry
- adjustment
- stock_count

## Invoice Lifecycle

Invoices must not be hard-deleted after creation. Allowed lifecycle actions:

- create
- paid
- partially_paid
- held
- voided
- canceled
- returned
- reversed

Each lifecycle action requires permission, reason where sensitive, and audit logging.

## Returns Lifecycle

Returns must record:

- Original sale/invoice reference where available
- Returned lines and quantities
- Refund method or credit/debt effect
- Inventory movement effect
- Approval if required
- Audit log entry

## Backup, Restore, and Recovery

The backend must support:

- Manual backup
- Scheduled backup
- Backup verification
- Restore into a test environment
- Pre-update backup
- Integrity check
- Corruption recovery workflow

Backups should be protected from casual tampering and accidental overwrite.

## Updates, Migrations, and Rollback

Before updates:

- Verify current database health.
- Create a pre-update backup.
- Apply migrations transactionally where possible.
- Record migration logs.
- Provide rollback or restore guidance if migration fails.

Failed migrations must not leave the store unable to sell without a recovery path.
