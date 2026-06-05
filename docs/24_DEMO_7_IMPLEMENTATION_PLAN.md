# DEMO-7 Implementation Plan

## Phase Name

DEMO-7-P1 - Cosmetics Pilot Implementation Plan, Workstreams, and Build Gates

## Demo Objective

Prepare AMN RetailOS for a focused cosmetics merchant demo/pilot that validates real workflows before full product implementation.

The demo must prove the planned direction for:

- products with variants/shades,
- product images,
- warehouse and display/showroom locations,
- incoming shipments,
- reservations,
- Instagram delivery orders,
- delivery company barcode per order,
- cash-on-delivery tracking and weekly collection report,
- Excel import with flexible mapping,
- basic sales/order creation with controlled price override,
- audit trail for sensitive changes,
- dashboard/report summaries.

This document is an implementation plan only. It does not create code, projects, migrations, credentials, runtime configuration, or cloud setup.

## Technical Stack Summary

Accepted stack:

- Backend/Core: .NET 10 / ASP.NET Core / Clean Architecture
- Windows App: WinUI 3 + Windows App SDK + .NET
- Android App: Kotlin + Jetpack Compose
- iPhone App: Swift + SwiftUI later

Implementation priority:

1. Backend/Core contracts and demo backend path
2. Windows app
3. Android app
4. iPhone later

## What Must Be Demo-ready

The pilot should be demo-ready when the team can walk through a realistic merchant flow:

1. Create or import cosmetics products.
2. Add variants/shades and product images.
3. Place stock in warehouse and showroom/display locations.
4. Register incoming shipment items.
5. Reserve available or incoming quantities.
6. Create an Instagram delivery order.
7. Attach or enter delivery company barcode for the order.
8. Update order status.
9. Create basic sale/order payment state with COD.
10. Show weekly COD collection summary.
11. Show audit summary for price/status/order changes.
12. Show dashboard/report summaries.

## Gate 0 Scope Lock

Status: locked for DEMO-7-G0+D1 implementation start.

Included implementation scope:

- users and simple permissions,
- products,
- variants/shades,
- product images,
- expiry/lot awareness,
- multiple warehouses,
- display/showroom location,
- inventory movements,
- incoming shipments,
- reservations,
- customers,
- delivery orders,
- delivery company barcode per order,
- COD collection report,
- basic sales with price override,
- audit trail basics,
- dashboard/report summaries.

Explicitly postponed:

- native iPhone implementation,
- App Store / TestFlight / iOS signing,
- advanced archive engine,
- advanced reports,
- full accounting,
- full returns/refunds,
- production printer integration,
- full RBAC engine,
- local/hybrid sync implementation,
- database migrations,
- Windows app project,
- Android app project.

## Explicitly Postponed

The following are not part of this implementation plan:

- full production AMN RetailOS implementation,
- Backend B1 completion,
- B1-R1.4 continuation,
- database migrations,
- production cloud setup,
- committed credentials or environment files,
- WinUI project creation,
- Android project creation,
- iOS project creation,
- iPhone DEMO-7 delivery,
- App Store or TestFlight delivery,
- full local-first sync,
- Hybrid conflict resolution,
- online payments,
- Restaurant, Pharmacy, Clinic, Medical, Education, or Manufacturing implementation,
- advanced accounting,
- advanced reporting/archive.

## Cloud-connected Pilot Assumption

DEMO-7 starts cloud-connected first so the merchant can test quickly across workflows.

This assumption is for the pilot. It does not cancel the long-term Local-first direction.

## Future Local/Hybrid Compatibility Note

Backend/Core contracts must avoid decisions that make future Local-first or Hybrid modes impossible.

Plan future compatibility around:

- backend-owned business rules,
- clear API contracts,
- auditable write operations,
- explicit timestamps and ownership fields,
- future idempotency,
- future sync/conflict strategy,
- no client-only business decisions.

## Ownership Model

### Backend/Core

Owners: Noor + Ali

Backend/Core is a shared responsibility. Do not assign backend as a one-person task.

Noor focuses on:

- backend/core architecture,
- product decisions,
- Windows direction,
- final review.

Ali focuses on:

- backend partnership,
- data/import support,
- Android direction,
- workflow data validation.

### Windows App

Owner: Noor

Windows planning focuses on admin/operations workflows, imports, stock visibility, reporting, and owner actions.

### Android App

Owner: Ali

Android planning focuses on mobile-friendly product lookup, barcode/manual fallback, order preparation, status updates, and image capture/upload planning.

### iPhone

Postponed.

iPhone remains a future target using Swift + SwiftUI later. It must not block DEMO-7.

### QA / Merchant Feedback

Owner: Murtadha

QA focuses on demo script, merchant feedback, bug reports, risk observations, and workflow validation.

### Optional UI Polish

Owner: Mohammed only if explicitly activated.

Optional scope is visual polish and layout feedback only. No architecture decisions and no backend ownership.

## Planning Style

DEMO-7 execution should be ADHD-friendly without forcing fixed daily task counts.

Use:

- clear workstreams,
- small build gates,
- explicit stop conditions,
- visible progress,
- no open-ended work,
- no unnecessary multitasking,
- no scope expansion during the demo sprint.

## Workstreams

### A. Backend/Core + Contracts

Owners: Noor + Ali

Scope:

- demo data model,
- API contract draft,
- permissions model,
- inventory, reservation, order, and COD rules,
- audit basics,
- cloud-connected data path planning.

Stop condition:

- The demo data model and minimum API contract draft are reviewed and accepted for planning.

### B. Windows App

Owner: Noor

Scope:

- admin/operations screens,
- products,
- import workflow,
- inventory locations,
- reports/dashboard,
- owner actions.

Stop condition:

- Windows demo shell responsibilities and screen list are approved without creating a project.

### C. Android App

Owner: Ali

Scope:

- mobile workflow,
- product lookup,
- barcode scan/manual fallback,
- order preparation,
- status changes,
- image upload/capture planning.

Stop condition:

- Android demo shell responsibilities and mobile workflow list are approved without creating a project.

### D. QA / Merchant Feedback

Owner: Murtadha

Scope:

- test script,
- merchant feedback form,
- bug report format,
- demo checklist,
- risk observations.

Stop condition:

- Merchant demo script, QA checklist, and feedback capture format are ready for review.

### E. Optional UI Polish

Owner: Mohammed only if activated

Scope:

- visual polish,
- layout feedback,
- no architecture decisions,
- no backend ownership.

Stop condition:

- UI polish comments are submitted as review notes only.

## Build Gates

### Gate 0 - Scope Lock

Acceptance criteria:

- DEMO-7 scope is frozen.
- Future profiles remain future-aware only.
- No iPhone delivery promise exists.
- Backend B1 remains not complete.

Stop condition:

- Scope lock note is approved and any new requests are moved to later backlog.

### Gate 1 - Backend Contract Baseline

Acceptance criteria:

- Minimum DTO/API contract draft exists.
- Minimum data model is accepted.
- No client business rules are assigned.
- Backend/Core work is split between Noor and Ali.

Stop condition:

- Contracts and data model are clear enough for Windows and Android shell planning.

### Gate 2 - Cloud-connected Demo Path

Acceptance criteria:

- Pilot data approach is selected conceptually.
- No credentials are added.
- No cloud config is committed.
- Local-first and Hybrid future compatibility is preserved.

Stop condition:

- The team knows what data path will be planned for the pilot without implementing it yet.

### Gate 3 - Windows Demo Shell Plan

Acceptance criteria:

- Windows app responsibilities are clear.
- Core screens are listed.
- Owner/admin operations are separated from backend rules.
- No WinUI project is created in this planning phase.

Stop condition:

- Windows shell plan is ready for implementation approval.

### Gate 4 - Android Demo Shell Plan

Acceptance criteria:

- Android app responsibilities are clear.
- Mobile workflows are listed.
- Barcode scan/manual fallback is documented.
- Image capture/upload approach is documented conceptually.
- No Android project is created in this planning phase.

Stop condition:

- Android shell plan is ready for implementation approval.

### Gate 5 - Feature Vertical Slice Plan

Acceptance criteria:

- Products/variants/images flow is planned.
- Locations/stock flow is planned.
- Reservations flow is planned.
- Incoming shipment flow is planned.
- Delivery order/COD flow is planned.
- Sale/price override flow is planned.
- Reports/dashboard flow is planned.

Stop condition:

- One vertical demo story can be described end-to-end without missing ownership.

### Gate 6 - QA and Merchant Demo Readiness

Acceptance criteria:

- QA script exists.
- Merchant demo script exists.
- Feedback capture method exists.
- Known limitations list exists.

Stop condition:

- The team can run the demo script and capture merchant feedback consistently.

## DEMO-7 Minimum Data Model Concept

This is conceptual only. Do not implement database migrations from this section.

- Organization
- User
- Role/Permission
- Product
- ProductVariant/Shade
- ProductImage
- Location/Warehouse/Display
- StockLot
- InventoryMovement
- IncomingShipment
- Reservation
- Customer
- DeliveryOrder
- DeliveryBarcode
- Sale
- CODCollection
- AuditLog

## DEMO-7 Minimum API Contract Concepts

This is conceptual only. Do not implement endpoints from this section.

### Auth/session

- sign in
- get current user
- get permissions
- end session

### Products

- list/search products
- create/update product
- import products preview
- import products commit

### Variants/shades

- list variants for product
- create/update variant or shade
- link barcode or manual code where needed

### Images

- attach product/variant image
- list images
- replace or remove image with audit

### Locations

- list locations
- create warehouse/display location
- view stock by location

### Inventory

- view stock position
- record movement conceptually
- transfer between warehouse/display conceptually

### Incoming shipments

- create shipment
- add shipment lines
- mark expected/arrived/canceled

### Reservations

- reserve available stock
- reserve incoming stock
- reserve named customer quantity
- reserve anonymous quantity
- release reservation

### Customers

- create/search customer
- attach customer to reservation or order

### Delivery orders

- create Instagram delivery order
- attach delivery barcode
- update delivery status

### Sales

- create basic sale/order
- apply price override with permission and audit
- update order payment state

### COD report

- weekly COD collection summary
- delivery company collection status

### Audit summary

- list sensitive changes
- filter by user, order, product, date, or action

## Demo Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Scope expansion during sprint | High | Freeze scope at Gate 0 |
| Backend and clients drift apart | High | Gate 1 requires shared contracts |
| Client-side business rules appear | High | Backend/Core owns decisions |
| Cloud pilot blocks future local-first | High | Gate 2 checks Local/Hybrid compatibility |
| Product variants become too complex | Medium | Pilot only shade/variant essentials |
| Excel import files are inconsistent | Medium | Use preview and flexible mapping plan |
| Delivery/COD flow is misunderstood | High | Use merchant examples in QA script |
| Android camera/barcode complexity grows | Medium | Keep manual fallback mandatory |
| iPhone expectation returns | Medium | Keep iPhone postponed in every gate |

## Merchant Demo Script

1. Open dashboard and explain DEMO-7 limitations.
2. Show product list with cosmetics variants/shades.
3. Add or review product image.
4. Show stock by warehouse and display/showroom.
5. Show incoming shipment from China.
6. Create reservation from available stock.
7. Create reservation from incoming shipment.
8. Create Instagram delivery order.
9. Add delivery company barcode for the order.
10. Update delivery/order status.
11. Create basic sale/order with controlled price override.
12. Show audit summary for price/status/order changes.
13. Show weekly COD collection summary.
14. Show dashboard/report summaries.
15. Capture merchant feedback and missing workflow notes.

## Final Demo Checklist

- Scope lock reviewed.
- Backend/Core contracts reviewed by Noor + Ali.
- Cloud-connected demo path planned without committed credentials.
- Windows shell plan reviewed.
- Android shell plan reviewed.
- QA script ready.
- Merchant feedback form ready.
- Known limitations list ready.
- iPhone remains postponed.
- Local-first and Hybrid remain future targets.
- No product features are claimed complete unless implemented and validated in a later approved phase.
