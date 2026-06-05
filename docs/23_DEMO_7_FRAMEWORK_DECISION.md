# DEMO-7 Framework Decision

## Phase Name

DEMO-7-F1 - Native Platform Framework Decision Record

## Decision Summary

AMN RetailOS will use a native-per-platform client strategy with one shared backend/core business rules layer.

Accepted stack:

- Backend/Core: .NET 10 / ASP.NET Core / Clean Architecture
- Windows App: WinUI 3 + Windows App SDK + .NET
- Android App: Kotlin + Jetpack Compose
- iPhone App: Swift + SwiftUI later

Implementation priority:

1. Backend/Core contracts and demo backend path
2. Windows native app
3. Android native app
4. iPhone later

This document records the decision only. It does not create projects, implement backend features, add migrations, configure cloud services, or change runtime code.

## Why Native-per-platform Was Chosen

Native-per-platform was selected for long-term product quality and operational control.

Reasons:

- AMN RetailOS will depend on hardware, printing, barcode, file import, local storage, offline behavior, and OS-specific workflows.
- Native Windows gives better control over Windows laptops, future installer flow, hardware diagnostics, receipt/A4 printing, and local-first operation.
- Native Android gives better control over mobile camera/image workflows, barcode scanning, offline/local behavior, and merchant-friendly mobile workflows.
- Native iPhone remains valuable later, but iPhone signing and distribution should not slow the cosmetics demo.
- One backend/core rule keeps business behavior consistent even when clients are native.

## Backend/Core Decision

Backend/Core stack:

- .NET 10
- ASP.NET Core
- Clean Architecture

The backend/core remains the business logic center. It owns:

- inventory decisions,
- reservations,
- sales/order lifecycle,
- permissions,
- cash-on-delivery workflow,
- reports,
- audit trail,
- future local/cloud/hybrid sync decisions.

Client apps must not duplicate or invent business rules.

## Windows Decision

Windows app stack:

- WinUI 3
- Windows App SDK
- .NET

Reason:

- Windows is the original local-first target.
- Native Windows is strong for laptop deployment, printers, file import, hardware support, diagnostics, and future installer/signing workflows.
- A Windows app can connect to the shared API contracts without owning business logic.

## Android Decision

Android app stack:

- Kotlin
- Jetpack Compose

Reason:

- Android is important for the cosmetics merchant workflow.
- The merchant may use mobile more often for Instagram sales, product images, order checks, barcode/image scanning, and warehouse/display updates.
- Native Android gives better access to device camera, storage, offline behavior, and mobile UI performance.

## iPhone Decision

iPhone app stack later:

- Swift
- SwiftUI

Decision:

- iPhone remains a future target.
- iPhone implementation, signing, and distribution are postponed.
- iPhone must not block DEMO-7.
- Do not promise App Store, TestFlight, or native iPhone delivery for DEMO-7.

## Why Flutter, Ionic, MAUI, And Expo Were Not Chosen As The Final Long-term Stack

These frameworks can be useful in some projects, but they are not accepted as the final long-term AMN RetailOS client strategy.

### Flutter

Flutter can ship cross-platform UI quickly, but AMN RetailOS needs long-term native control over Windows hardware, printing, Android camera/barcode workflows, and platform-specific deployment.

### Ionic

Ionic is web-based and can be fast for dashboards or prototypes, but the final product needs stronger native integration for POS-style hardware, local-first behavior, and mobile device workflows.

### .NET MAUI

.NET MAUI keeps more shared code, but AMN RetailOS needs best-per-platform client quality. WinUI 3 is preferred for Windows, and Kotlin/Compose is preferred for Android.

### Expo / React Native

Expo can be useful for prototypes, but the long-term direction needs native Android control, future native iPhone control, and clear separation from web dashboard patterns.

Cross-platform stacks may still be used only for prototypes if explicitly approved later. They are not the accepted long-term product direction.

## Short-term DEMO-7 Impact

DEMO-7 starts cloud-connected first so the team can move quickly with the cosmetics merchant.

Short-term priority:

- define contract-first demo APIs,
- define the cloud-connected pilot data path,
- plan a Windows shell,
- plan an Android shell,
- keep iPhone postponed,
- keep business logic in backend/core contracts.

## Long-term Architecture Impact

The decision supports:

- one shared backend/core,
- native clients per platform,
- shared API contracts,
- local-first production direction,
- cloud-connected pilot capability,
- future Hybrid mode,
- future iPhone without blocking current work.

## Shared API Contracts Rule

All clients consume the same API contracts and response/error models:

- Windows WinUI client,
- Android Kotlin client,
- future iPhone Swift client.

Client behavior must be consistent because backend contracts define committed state, validation errors, permission errors, retryable errors, audit events, and business decisions.

## No Client-side Business Rule Ownership

Clients must not own independent business rules.

The backend/core owns:

- inventory,
- reservations,
- sales/order lifecycle,
- permissions,
- price override approval,
- COD collection state,
- reports,
- audit trail,
- future sync decisions.

Clients collect input, show backend decisions, and display results.

## Deployment Direction

DEMO-7 starts cloud-connected first.

Long-term AMN RetailOS must still support:

- Local-first Mode,
- Cloud-connected Mode,
- Hybrid Mode.

Cloud-connected demo work does not cancel Local-first or Hybrid strategy.

## Risks And Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Native-per-platform increases implementation effort | High | Start with Backend/Core contracts, then Windows and Android shells only |
| DEMO-7 cloud path weakens local-first discipline | High | Keep Local-first and Hybrid documented as long-term targets |
| Client teams duplicate business logic | High | Enforce shared API contracts and backend-owned decisions |
| Android and Windows diverge in behavior | Medium | Use identical contracts, error models, and acceptance criteria |
| iPhone expectations slow demo | Medium | Keep iPhone postponed and out of DEMO-7 delivery promises |
| Framework debate delays pilot | Medium | Treat this ADR as accepted and move to implementation planning |

## What Remains Undecided

- Exact DEMO-7 backend hosting/data path.
- Exact demo API endpoints and DTOs.
- Windows shell project structure.
- Android shell project structure.
- Authentication/user setup for the pilot system.
- Image storage approach for product photos.
- Barcode image reading approach.
- Local-first synchronization design.
- Hybrid conflict handling.
- iPhone timeline, signing, and distribution.

## Next Step

Next step: DEMO-7 implementation planning.

That planning should define the contract-first demo API path, Windows shell plan, Android shell plan, cloud-connected pilot data path, and what must be completed before merchant demo testing.
