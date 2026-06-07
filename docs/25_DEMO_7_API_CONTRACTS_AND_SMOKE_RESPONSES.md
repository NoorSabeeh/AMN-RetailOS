# DEMO-7 API Contracts And Smoke Responses

## Status

Phase: DEMO-7-D4 - Read-Only API Smoke Verification, Contract Docs, and Team Feedback Alignment.

The current backend exposes read-only smoke endpoints backed by in-memory demo data. This is not production persistence and not full product behavior.

Current API mode:

- read-only smoke endpoints: available,
- write operations: not implemented,
- persistence: in-memory demo data,
- database migrations: not added,
- cloud configuration: not added,
- production readiness: no.

## Read-only Endpoints

Verified read-only smoke endpoints:

- `GET /api/contracts/status`
- `GET /api/contracts/routes`
- `GET /api/products`
- `GET /api/products/{id}`
- `GET /api/locations`
- `GET /api/inventory/summary`
- `GET /api/shipments`
- `GET /api/reservations`
- `GET /api/customers`
- `GET /api/delivery-orders`
- `GET /api/delivery-orders/barcode/{barcode}`
- `GET /api/reports/cod`
- `GET /api/audit`

## Write Endpoints Still Postponed

These remain not implemented and must return an explicit Not Implemented response:

- product create/update/delete,
- location create/update/delete,
- inventory movement writes,
- incoming shipment create/update,
- reservation create/update/release,
- customer create/update,
- delivery order create/update/status change,
- sale commit,
- COD settlement,
- Excel import,
- image upload.

## Response Wrapper Format

Successful responses use a standard wrapper:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

Failed responses use the same wrapper:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "not_implemented",
    "message": "Operation is not implemented.",
    "fieldErrors": []
  }
}
```

## Standard Error Format

Error fields:

- `code`: platform-neutral error code.
- `message`: readable explanation.
- `fieldErrors`: field-level validation errors when applicable.

## Validation Error Format

Validation errors use:

```json
{
  "field": "Name",
  "code": "required",
  "message": "Name is required."
}
```

## Smoke Response Summaries

These summaries describe current in-memory demo response shapes. They are not real merchant data.

### Products

`GET /api/products`

Returns product summaries:

- `id`
- `sku`
- `name`
- `salePriceMinor`
- `status`

Current sample includes cosmetics products such as a demo lip color and demo serum.

### Product Detail With Variants / Shades / Images

`GET /api/products/{id}`

Returns:

- product identity and prices,
- category/base unit ids,
- `variants`,
- `images`.

Variant/Shade rule:

- Cosmetics flows should treat variant/shade barcode as primary where a shade-specific barcode exists.
- The general product remains the parent.
- Shade/variant behavior must remain generic enough for future profiles such as clothing size/color or electronics options.

Image rule:

- Current data uses placeholder image metadata only.
- No image files or uploads are implemented.

### Locations

`GET /api/locations`

Returns warehouse/display locations:

- `warehouse`
- `display`

Pilot workflow note:

- Sale should default from Display/Showroom stock.
- Warehouse sale should require permission later.

### Inventory Summary

`GET /api/inventory/summary`

Returns stock summary rows:

- `productId`
- `productVariantId`
- `locationId`
- `stockLotId`
- `quantityBase`
- `expiryDate`

Expiry/lot rule:

- Expiry awareness should be tied to `StockLot` where practical.
- Current endpoint returns sample lot/expiry summary only and does not calculate stock.

### Incoming Shipments

`GET /api/shipments`

Returns shipment summaries:

- `referenceNumber`
- `origin`
- `expectedDate`
- `status`
- `lineCount`

Current sample includes an incoming shipment from China.

### Reservations

`GET /api/reservations`

Returns reservation summaries:

- product/variant,
- optional customer,
- optional location,
- optional incoming shipment,
- source type,
- quantity,
- status.

Reservation rule:

- Reservations may be for a named customer or anonymous quantity.
- Reservations may come from available stock or incoming shipment.

Deposit/down payment:

- Deposit/down payment is not P0 for DEMO-7.

### Customers

`GET /api/customers`

Returns customer summaries:

- `id`
- `name`
- `phone`
- `status`

No private customer data is included in sample responses.

### Delivery Orders

`GET /api/delivery-orders`

Returns order-level delivery summaries:

- optional sale/customer ids,
- channel,
- delivery company,
- status,
- COD amount.

Delivery barcode rule:

- Delivery company barcode belongs to the whole order, not to individual items.

### Delivery Barcode Lookup

`GET /api/delivery-orders/barcode/{barcode}`

Returns order lookup result for a delivery company barcode.

Unknown barcode:

- returns `404` with platform-neutral `delivery_barcode_not_found` error.

### COD Report

`GET /api/reports/cod`

Returns COD summary:

- delivery company,
- period start/end,
- expected amount,
- collected amount,
- remaining amount,
- status.

Iraqi merchant planning note:

- COD reporting must support weekly cutoff planning, especially Thursday.
- Future contract concept: `GET /api/reports/cod?cutOffDay=Thursday`.
- Current endpoint does not implement query filtering yet.

### Audit Events

`GET /api/audit`

Returns audit event summaries:

- user id,
- action,
- entity name,
- entity id,
- created timestamp.

Price override planning note:

- Future price override must create audit entries for who changed price, status, or order state.

## Android Client Needs

Android is active in DEMO-7 scope.

Android client planning needs:

- product search,
- variant/shade barcode lookup,
- stock summary,
- reservations,
- delivery order status,
- delivery barcode lookup,
- COD summary,
- manual fallback when barcode/image reading fails.

Android must consume backend contracts and must not own business rules.

## Windows Client Needs

Windows client planning needs:

- product catalog review,
- import workflow planning,
- inventory locations,
- incoming shipments,
- owner/admin order review,
- COD report review,
- audit summary,
- dashboard/report summaries.

Windows must consume backend contracts and must not own business rules.

## Known Limitations

- No authentication/permissions engine yet.
- No write behavior.
- No database persistence.
- No cloud persistence.
- No Excel import implementation.
- No image upload implementation.
- No barcode scanning implementation.
- No sale commit.
- No reservation write.
- No COD settlement.
- No production reports.
- No native Windows, Android, or iPhone app projects.

## Production Persistence Warning

The current API is for read-only smoke verification only. It is not production persistence, and data resets with the in-memory provider.

## In-memory Demo Data Warning

The current data is safe, fake, deterministic demo data. It is intended only to help future Windows and Android clients understand response shapes.
