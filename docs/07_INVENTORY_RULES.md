# Inventory Rules

Inventory correctness is a core commercial requirement. AMN RetailOS must be able to explain why stock changed, not only show a current number.

## Source of Truth

Never rely only on `product.quantity` as the source of truth.

A cached product quantity may be maintained for speed, but every stock change must create an inventory movement. Stock reports and investigations must be able to trace stock through the movement ledger.

## Required Movement Types

Every stock change must create an Inventory Movement with type, quantity, direction, user, timestamp, and source reference where available.

Supported movement types:

- sale
- purchase
- customer_return
- supplier_return
- damage
- expiry
- adjustment
- stock_count
- opening_balance

## Negative Stock

Negative stock must be blocked by default.

Negative stock may only be allowed if:

- A specific permission exists.
- The store setting allows it.
- The operation records an audit log entry.
- The report layer can identify negative stock events.

## Unit Conversion

MVP must support piece/carton/unit conversion.

Examples:

- 1 carton = 12 pieces
- Sale can happen by carton or piece
- Purchase can happen by carton while stock is tracked in base units

The backend must normalize inventory movement quantities to a base unit.

## Stock Counts

Stock count must be controlled because incorrect stock count workflows can destroy trust in inventory.

Rules:

- Count sessions must be explicit.
- Count lines must record counted quantity.
- Differences must create adjustment movements.
- Large differences should require permission or review.
- The system must never silently replace stock quantities without movement history.

## Future Capabilities

Batch/expiry and serial/warranty are future capabilities.

The conceptual model may reserve space for future support, but MVP must not claim full pharmacy, expiry, warranty, or serial tracking workflows are complete.
