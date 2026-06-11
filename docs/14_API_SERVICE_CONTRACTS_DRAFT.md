# API and Service Contracts Draft

This is a planning draft for backend service contracts. It is not implementation code and does not define final transport, framework, or schema syntax.

## Contract Principles

- Backend owns business rules.
- Write operations that create financial or inventory effects require idempotency keys.
- Sensitive operations require user identity and permissions.
- Manager approval data is passed when backend requires approval.
- Responses must include clear success, validation error, permission error, and retryable error states.
- Frontend must not infer committed state after timeout; it must query by idempotency key or document id.

## Client Contract Consumers

The same API contracts and response/error models must serve all approved clients:

- Windows WinUI client
- Android Kotlin client
- iPhone Swift client later

All clients consume backend decisions. Clients must not own independent business rules for inventory, reservations, sales/order lifecycle, permissions, price override approval, COD state, reports, audit trail, or future sync behavior.

The backend/core is the contract and business correctness center. Client-specific UI may differ, but committed behavior must stay consistent across platforms.

## DEMO-7 Android Contract Needs

Android is active in DEMO-7 scope. Android needs API support for:

- product search,
- variant/shade barcode lookup through `GET /api/products/barcode/{barcode}`,
- stock summary,
- reservations,
- delivery order status,
- delivery barcode lookup,
- COD summary,
- manual fallback when barcode or image reading fails.

Android must not own business rules. It must display backend decisions and errors.

## Store Setup Service

Responsibilities:

- Create initial store profile.
- Configure currency, language, receipt settings, invoice settings, and basic hardware preferences.
- Report setup completion status.

Key operations:

- `getSetupStatus`
- `saveStoreSetup`
- `updateStoreSettings`

## Products Service

Responsibilities:

- Create and update products.
- Assign categories, units, prices, and active status.
- Support products with or without barcode.
- Support variant/shade-specific barcode planning for cosmetics workflows.
- Treat Variant/Shade barcode as the primary cosmetics lookup when present.
- Treat product-level barcode as optional/secondary and require variant choice before sale/reservation when needed.

Key operations:

- `listProducts`
- `searchProducts`
- `getProduct`
- `resolveProductBarcode` through `GET /api/products/barcode/{barcode}` for read-only DEMO-7 lookup
- `createProduct`
- `updateProduct`
- `deactivateProduct`

## Barcode Service

Responsibilities:

- Resolve barcode to product/unit.
- Prevent ambiguous barcode assignments.
- Support multiple barcodes per product.
- Keep delivery company barcode separate from product/variant barcodes.
- Keep camera/image barcode scanning as future client/device work; DEMO-7-D5 only adds backend read-only lookup.

Key operations:

- `resolveBarcode`
- `addProductBarcode`
- `removeProductBarcode`
- `listProductBarcodes`

## Units Service

Responsibilities:

- Define units.
- Define product unit conversions.
- Normalize stock movement quantities to base unit.

Key operations:

- `listUnits`
- `createUnit`
- `setProductUnitConversion`
- `validateUnitConversion`

## Inventory Movement Service

Responsibilities:

- Record all stock changes.
- Query product stock and movement history.
- Support opening balance, purchase, sale, return, damage, expiry, adjustment, and stock count movements.

Key operations:

- `getStockPosition`
- `getStockSummary`
- `listInventoryMovements`
- `createManualAdjustment`
- `createOpeningBalance`
- `startStockCount`
- `submitStockCountLines`
- `finalizeStockCount`

## Sales Service

Responsibilities:

- Validate cart.
- Commit sale transactionally.
- Hold and recall invoices/carts where supported.
- Enforce idempotency.

Key operations:

- `validateSaleCart`
- `commitSale`
- `getSaleByIdempotencyKey`
- `holdSale`
- `recallHeldSale`

Required commit effects:

- Sale
- Sale lines
- Invoice
- Payments
- Inventory movements
- Customer debt where applicable
- Cash session update
- Audit log

## Invoices Service

Responsibilities:

- Generate unique invoice numbers.
- Query invoices.
- Support lifecycle actions without hard delete.

Key operations:

- `listInvoices`
- `getInvoice`
- `voidInvoice`
- `cancelInvoice`
- `reprintInvoice`

## Payments Service

Responsibilities:

- Record payment effects.
- Support full, partial, debt, and mixed payment.
- Prevent duplicate payments through idempotency.

Key operations:

- `recordPayment`
- `listPaymentsForSale`
- `getPaymentByIdempotencyKey`

## Returns Service

Responsibilities:

- Validate return eligibility.
- Commit full or partial returns.
- Update inventory, refund/debt, invoice state, and audit logs transactionally.

Key operations:

- `validateReturn`
- `commitReturn`
- `getReturn`
- `listReturns`

## Customers and Debt Service

Responsibilities:

- Manage customers.
- Track customer account ledger.
- Record customer payments.
- Show balance and history.

Key operations:

- `listCustomers`
- `createCustomer`
- `updateCustomer`
- `getCustomerAccount`
- `recordCustomerPayment`

## Suppliers and Purchases Service

Responsibilities:

- Manage suppliers.
- Record purchases.
- Update inventory from purchases.
- Track supplier account ledger.

Key operations:

- `listSuppliers`
- `createSupplier`
- `updateSupplier`
- `commitPurchase`
- `getSupplierAccount`
- `recordSupplierPayment`

## Cash Sessions Service

Responsibilities:

- Open and close shifts.
- Track expected cash.
- Record cash in/out.
- Require reason for variance.

Key operations:

- `getCurrentCashSession`
- `openCashSession`
- `recordCashMovement`
- `closeCashSession`

## Reports Service

Responsibilities:

- Provide operational reports without changing data.

Key operations:

- `salesSummary`
- `inventorySummary`
- `stockMovementReport`
- `customerDebtReport`
- `supplierDebtReport`
- `cashSessionReport`
- `auditReport`
- `codCollectionReport`

DEMO-7 COD report concept:

- `GET /api/reports/cod`
- future query option: `GET /api/reports/cod?cutOffDay=Thursday`

This is a contract/planning note. Cutoff-day filtering is not implemented yet.

## Excel Import Contract Concept

Excel import must be safe and reviewable. It must not be a blind import.

Future flow:

Preview -> Mapping -> Row Validation -> Commit.

1. Preview uploaded file.
2. Dynamic column mapping.
3. Row validation.
4. Commit only approved valid rows.

Future conceptual operations:

- `previewImport`
- `saveImportMapping`
- `validateImportRows`
- `commitImport`

No Excel import endpoint or implementation exists yet in DEMO-7-D4.

## Users and Roles Service

Responsibilities:

- Manage users, roles, and permissions.
- Validate login/session.
- Support manager approval flow.

Key operations:

- `login`
- `logout`
- `listUsers`
- `createUser`
- `updateUser`
- `listRoles`
- `assignRole`
- `requestApproval`

## Audit Logs Service

Responsibilities:

- Append audit logs for sensitive operations.
- Query logs for review.

Key operations:

- `listAuditLogs`
- `getAuditLog`

## Backup and Restore Service

Responsibilities:

- Create verified backups.
- Restore into test environment.
- Protect production restore with permissions.

Key operations:

- `createBackup`
- `verifyBackup`
- `listBackups`
- `restoreBackupToTest`
- `prepareProductionRestore`

## License Status Service

Responsibilities:

- Report demo/trial/activated state.
- Verify signed license file.
- Record license events.

Key operations:

- `getLicenseStatus`
- `activateOfflineLicense`
- `importLicenseFile`
- `listLicenseEvents`

## Diagnostics Service

Responsibilities:

- Provide support-ready system state.
- Test hardware configuration.

Key operations:

- `getSystemDiagnostics`
- `testPrinter`
- `testReceiptRTL`
- `testScannerInput`
- `testCashDrawer`
- `getDatabaseHealth`
- `getBackupHealth`
