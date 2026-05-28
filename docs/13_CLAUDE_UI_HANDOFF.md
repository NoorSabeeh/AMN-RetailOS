# Claude UI Handoff

This document defines the frontend/UI handoff for Claude AI work. Claude should design practical MVP screens and interaction flows only. Claude must not decide backend business rules, invent completed features, or expand scope beyond Retail/Grocery and basic Wholesale/Grocery.

## UI Goals

- Modern, practical, cashier-friendly interface.
- Fast barcode-first selling.
- Clear inventory and invoice states.
- Minimal clicks for daily store workflows.
- Good Arabic/RTL awareness.
- Works well on Windows laptop screens.
- Avoid marketing-style screens in the product UI.

## MVP Pages and Screens

Claude may design MVP UI for:

- First-run store setup
- Login
- Dashboard summary
- POS/cashier screen
- Product search and barcode miss overlay
- Products list
- Product create/edit
- Categories
- Units and unit conversion
- Inventory movements
- Stock adjustment
- Sales/invoices list
- Invoice detail
- Return flow
- Customers
- Customer account/debt detail
- Suppliers
- Purchases
- Cash session open/close
- Basic reports
- Users/roles
- Audit log viewer
- Backup/restore
- License/demo status
- Printer Test Center
- Diagnostics/hardware troubleshooting

Claude must not design full Restaurant, Pharmacy, Clinic, cloud admin, mobile app, multi-branch, online payment, or AI feature screens as working product screens.

## Cashier Workflow Requirements

The POS screen must support:

- Barcode-first input
- Fast product search
- Product-not-found overlay
- Quantity editing
- Unit switching between piece/carton where configured
- Price and discount display
- Clear total, paid, remaining, and change
- Cash payment
- Partial payment
- Customer debt
- Mixed payment
- Held invoices
- Reprint
- Printer failure state where sale is saved but print can retry

## Keyboard and Speed Rules

- The cashier should be able to complete normal sale flow mostly by scanner and keyboard.
- Primary action buttons must have visible keyboard hints after shortcuts are finalized.
- Barcode input should regain focus after product add, quantity edit, and payment cancellation.
- Blocking modals should be avoided during fast scanning unless action is required.

## Manager Approval UX

Frontend must provide approval UI when backend requires it:

- Show what action needs approval.
- Collect approver credentials or approval token as defined by backend.
- Collect reason when required.
- Submit approval data to backend.
- Display approved or rejected state.

Frontend must not bypass approval rules.

## Demo Mode and Training Mode UX

Demo/training states must be visibly labeled.

Rules:

- Do not claim demo data is real.
- Do not hide demo/training mode from operator.
- Do not allow screenshots or screens to imply unfinished features are production-ready.
- Training mode should clearly separate practice actions from real store data if implemented later.

## What Frontend Must Not Decide

Frontend must not decide:

- Whether stock can go negative
- Whether a discount is allowed
- Whether invoice can be voided
- Whether a return can proceed
- Whether debt limit can be exceeded
- Whether a user has permission
- Whether license is valid
- Whether a backup is trusted
- Whether duplicate submit creates a new sale

These decisions belong to backend services.

## Backend Rules UI Must Respect

UI must expect backend validation for:

- Permissions
- Store profile capabilities
- Product and barcode uniqueness
- Unit conversion validity
- Stock availability
- Invoice sequence
- Idempotency
- Payment status
- Return eligibility
- Customer debt
- Cash session state
- License/demo limits

## Required API/Service Contracts

Claude should expect draft contracts for:

- Store setup
- Products
- Barcode
- Units
- Inventory movements
- Sales
- Invoices
- Payments
- Returns
- Customers/debt
- Suppliers/purchases
- Cash sessions
- Reports
- Users/roles
- Audit logs
- Backup/restore
- License status
- Diagnostics

## Arabic/RTL UI and Receipt Requirements

Designs must account for:

- Arabic labels and item names
- RTL page layout where enabled
- Mixed Arabic/English product names
- Receipt preview that reflects actual print constraints
- Long item names on 58mm and 80mm receipts
- A4 invoice layouts that remain readable in Arabic and English

## Handoff Back to Project

Claude UI output should return:

- Screen list
- Design assumptions
- Component inventory
- Empty/loading/error states
- Required backend fields per screen
- Any unclear business rule questions
- Screens explicitly marked as design-only if backend is not implemented
