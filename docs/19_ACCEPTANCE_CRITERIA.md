# MVP Acceptance Criteria

AMN RetailOS MVP is acceptable only when the core Retail/Grocery and basic Wholesale/Grocery workflows are reliable, local-first, and auditable.

## Store Setup

- Can create a store profile.
- Can configure Retail/Grocery or basic Wholesale/Grocery mode.
- Can configure currency, language, invoice settings, and receipt settings.
- Can operate after setup without internet.

## Products, Barcodes, and Units

- Can create products.
- Can create categories.
- Can assign one or more barcodes to a product.
- Can sell a product by barcode.
- Can search when barcode is missing.
- Can create units.
- Can configure piece/carton conversion.
- Backend rejects invalid or ambiguous barcode/unit data.

## Sales, Invoices, and Payments

- Can sell product from POS screen.
- Sale creates invoice.
- Invoice number does not duplicate.
- Sale creates inventory movement.
- Sale affects cash session.
- Sale records payment.
- Sale supports full payment.
- Sale supports partial payment.
- Sale supports customer debt.
- Sale supports mixed payment.
- Sale operation is transactional.
- Duplicate submit does not duplicate sale, invoice, payment, or inventory movement.
- Printer failure after sale save does not lose the sale.
- Can reprint invoice or receipt.

## Inventory

- Every stock change creates an inventory movement.
- Product quantity is not the only source of truth.
- Negative stock is blocked unless explicit permission and setting allow it.
- Opening balance can be recorded.
- Manual adjustment requires reason and audit log.

## Returns

- Can return full invoice.
- Can return partial invoice.
- Return creates return record.
- Return creates inventory movement.
- Return adjusts payment, refund, or customer debt as applicable.
- Return requires permission where configured.
- Return is auditable.

## Customers and Suppliers

- Can create customer.
- Can create customer debt through partial/deferred sale.
- Can record customer payment.
- Can view customer account balance/history.
- Can create supplier.
- Can record purchase.
- Purchase affects inventory through movement.
- Can view supplier account balance/history.

## Cash Sessions

- Can open shift/cash session.
- Sales attach to active cash session.
- Can record cash in/out.
- Can close shift.
- Closing shift shows expected versus counted cash.
- Variance requires reason.

## Security and Audit

- Can create users and roles.
- Restricted actions require permission.
- Unauthorized discounts, voids, returns, and stock adjustments are blocked.
- Can view audit logs.
- Audit logs include sensitive business actions.

## Backup, Restore, and Recovery

- Can create backup.
- Backup has verification result.
- Can restore backup in test environment.
- Restore does not silently overwrite production data.
- Failed backup is visibly reported.

## License and Demo

- Can check license/demo status.
- Demo/trial status is visible.
- Application does not contain private signing keys.
- Offline license verification is planned and testable.

## Hardware and Offline Operation

- Can test receipt printer.
- Can test A4 invoice printer where configured.
- Can test Arabic/RTL receipt output.
- Can operate without internet.
- Hardware errors show clear next actions.

## Scope Guard

- MVP does not claim full Restaurant, Pharmacy, Clinic, AI, cloud SaaS, mobile app, online payments, multi-branch, or complex accounting support.
