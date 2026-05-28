# UX Cashier Workflow

The cashier workflow must be fast, clear, and tolerant of field problems. Visual design should be modern but practical. The cashier should not need to understand backend concepts to complete a sale safely.

## Cashier Workflow Goals

- Scan barcode and add product quickly.
- Search product without leaving sale screen.
- Edit quantity and unit with minimal steps.
- Support piece/carton selling.
- Show clear total, paid, remaining, and change.
- Support cash, partial payment, debt, and mixed payment.
- Save sale once, without duplicate risk.
- Print receipt or show print retry if printer fails.
- Keep selling even when internet is unavailable.

## Barcode-first Design

The POS screen should assume barcode scanner use:

- Barcode input is always ready in fast cashier mode.
- Product-not-found flow appears as a quick overlay.
- The cashier can search, quick add placeholder, or cancel.
- Duplicate barcode ambiguity must be resolved through backend data rules.

## Keyboard Shortcuts

Recommended MVP shortcuts:

- Focus barcode/search
- Increase/decrease quantity
- Change unit
- Hold invoice
- Recall held invoice
- Pay
- Print/reprint
- Cancel current cart with permission if required

Exact key mapping should be documented by the Frontend/UI Owner after prototype validation.

## Error Messages

Error messages must be short and actionable:

- Product not found
- Stock not enough
- Discount requires approval
- Cash session is not open
- Printer failed, sale saved
- Duplicate action ignored, sale already saved
- License is in demo/trial mode

## Manager Approval UX

Sensitive actions should trigger an approval flow:

- High discount
- Negative stock override
- Return without invoice
- Invoice void/cancel
- Cash session variance acceptance
- Debt limit override

Approval UI must collect required reason and pass it to the backend.

## Arabic/RTL Concerns

The UI and receipts must plan for:

- Arabic item names
- Mixed Arabic/English text
- RTL alignment
- Receipt printer limitations
- Preview versus actual print differences
- Fallback receipt rendering if direct thermal printing fails

Arabic/RTL support must be tested on real receipt printers before pilot release.
