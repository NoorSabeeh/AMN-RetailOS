# DEMO-7 Cosmetics Pilot Replan

## Phase Name

REPLAN-DEMO-7 - Business Profiles, Deployment Modes, and Cosmetics Pilot Scope

## Reason For Replan

AMN RetailOS has an urgent 7-day pilot opportunity with a cosmetics merchant. The merchant will use the system for free as an early tester and provide real feedback over time.

This does not cancel the long-term local-first architecture. It temporarily changes short-term planning so the team can validate a real business workflow quickly before continuing deeper Backend B1 implementation.

## 7-Day Demo Goal

Create a realistic pilot plan for a cosmetics business that proves whether AMN RetailOS can support:

- product variants and shades,
- product images,
- multiple stock locations,
- incoming shipments,
- reservations,
- Instagram delivery orders,
- cash-on-delivery collection tracking,
- flexible Excel import,
- basic sales/order creation with controlled price override,
- audit trail expectations,
- dashboard/report summaries.

This document is planning only. No product code, UI, backend feature, migration, framework choice, or cloud configuration is implemented by this replan.

## Cosmetics Merchant Context

The cosmetics merchant has real operating needs that differ from a simple grocery store:

- cosmetics products often have many shades, variants, and images,
- some products may have expiry dates,
- stock may exist in more than one warehouse,
- display/showroom stock is separate from warehouse stock,
- showroom quantity decreases when sold,
- sales happen in-store and through Instagram,
- delivery company barcode represents a whole order, not each item,
- payment is usually cash on delivery,
- money is collected from the delivery company weekly, often Thursday,
- owner may change order status and assign employee permissions,
- reports and archive history are important long-term.

## DEMO-7 Scope

The 7-day pilot scope should focus only on the minimum flow needed to learn from the merchant:

- users and simple permissions,
- products,
- product variants and shades,
- product images,
- expiry support or simple lot awareness,
- multiple warehouses,
- display/showroom location,
- incoming shipments from China,
- reservation for a named customer,
- anonymous quantity reservation,
- reservation from available stock or incoming shipment,
- delivery orders for Instagram sales,
- delivery company barcode per order,
- barcode scan and image barcode reading with manual fallback,
- cash-on-delivery workflow,
- weekly/COD collection report,
- Excel import wizard with flexible column mapping,
- basic sale/order creation with price override,
- audit trail for who changed price, status, or order state,
- dashboard/report summaries.

## Out Of Scope

DEMO-7 does not include:

- full AMN RetailOS production backend completion,
- full Backend B1 completion,
- production database migrations,
- final framework commitment,
- production license system,
- online payments,
- native iPhone delivery,
- App Store or TestFlight delivery promise,
- multi-branch production rollout,
- full Cloud SaaS product,
- Restaurant, Pharmacy, Clinic, Medical, Education, or Manufacturing implementation,
- advanced accounting,
- advanced archive/reporting system,
- final hardware/printer integration.

## Deployment Modes

AMN RetailOS must support multiple deployment modes over time.

### Local-first Mode

- Data lives on the customer's main laptop/server.
- Other devices may connect to the main device in a future controlled design.
- Core selling must be able to work locally.
- This remains the long-term reliability foundation for stores with unstable internet.

### Cloud-connected Mode

- Data is stored or synced through cloud infrastructure.
- Useful for businesses with multiple devices, Instagram sales, delivery workflows, and remote owner access.
- Cloud-connected demo/pilot planning does not cancel the local-first strategy.

### Hybrid Mode

- Local operation plus optional cloud sync.
- This is a future direction and is not fully implemented now.
- Conflict handling, sync rules, offline writes, and recovery must be designed before production use.

## iPhone Decision

iPhone remains a future target, but native iPhone build and distribution decisions are postponed.

DEMO-7 must not be blocked by iPhone delivery. The team must not promise App Store, TestFlight, or native iPhone availability in this phase.

## Windows And Android Priority

Windows remains important because AMN RetailOS was originally planned for a local-first Windows environment.

Android is also important for the cosmetics pilot because the merchant may use mobile workflows frequently for Instagram sales, product images, delivery order checks, and warehouse/display updates.

The framework choice is documented in `docs/23_DEMO_7_FRAMEWORK_DECISION.md`: WinUI 3 for Windows and Kotlin + Jetpack Compose for Android.

## One Core Backend Rule

AMN RetailOS must use one shared Core Backend/domain model where possible. Business Profiles activate capabilities, labels, workflows, and permissions over the shared core.

Do not create separate backends per business type unless a future technical decision proves it is necessary.

## Future Business Profiles

These profiles are future-aware architecture planning only. They are not implemented now.

### Retail Profiles

- Grocery / Mini Market
- Wholesale / General Wholesale
- Hypermarket with multiple branches
- Cosmetics / Beauty / Perfume
- Clothing stores
- Clothing complexes
- Electronics / Mobile / Warranty
- Weight-based stores

### Wholesale Specialty Profiles

- Wholesale perfumes / cosmetics
- Wholesale watches / accessories
- Wholesale gifts / antiques / decor
- Wholesale kitchenware / homeware
- Wholesale raw materials
- Wholesale electricals
- Wholesale clothing / fashion
- Wholesale food / grocery
- General wholesale

### Medical / Healthcare Profiles

- Medical clinics
- Medical laboratories
- Radiology / Sonar centers
- Hospitals

### Education / Institution Profiles

- Schools
- Teaching institutes
- Universities

### Manufacturing / Operations Profiles

- Factories
- Production / raw materials / finished goods workflows

### Service / Custom Profiles

- Services
- Custom business profile

## Cosmetics Pilot Capabilities

The cosmetics profile should be treated as an urgent pilot profile, not as a completed production profile.

Important capabilities to plan:

- products with shade/variant identity,
- product images attached to products/variants,
- lot/expiry awareness where needed,
- locations for warehouse and showroom/display,
- incoming shipment records,
- reservations tied to stock or incoming shipment,
- delivery orders tied to Instagram sales,
- delivery company barcode at order level,
- cash-on-delivery lifecycle,
- weekly delivery company collection report,
- Excel import with flexible mapping,
- price override with permission/audit trail,
- order status audit trail,
- dashboard/report summaries.

## Temporary DEMO-7 Team Responsibilities

This temporary assignment does not permanently replace previous role definitions.

### Noor

- backend/core architecture,
- product decisions,
- Windows direction,
- iPhone target decision later,
- final scope control for DEMO-7.

### Ali

- backend partnership,
- Android direction,
- data/import support,
- cosmetics workflow data questions,
- pilot validation support.

### Mohammed

- paused for now,
- may assist UI polish later if requested,
- should not start full POS or product UI implementation without approval.

### Murtadha

- QA/testing,
- merchant feedback,
- workflow validation,
- demo scenario checks.

UI work for this temporary pilot planning window is shared between Noor and Ali, with Mohammed optional later.

## ADHD-Friendly Working Rule

Use this rule during DEMO-7:

### One Mission Per Day

Each day must have one clear mission only.

### 3 Tasks Max

Each active person should have no more than three important tasks for the day.

### Clear Stop Condition

Every task must define when to stop. Example: "stop when the Excel import questions are written and reviewed", not "work on import".

## Risk List

| Risk | Impact | Prevention |
|---|---|---|
| Demo scope grows beyond 7 days | High | Keep one mission per day and 3 tasks max |
| Framework decision rushed | High | Separate framework decision from this replan |
| Cloud pilot weakens local-first strategy | High | Document Local / Cloud / Hybrid modes clearly |
| Cosmetics variants become overbuilt | Medium | Pilot only the minimum shade/variant workflow |
| Delivery/COD flow misunderstood | High | Validate with merchant examples before implementation |
| Excel files vary too much | Medium | Use flexible column mapping plan |
| iPhone expectation blocks progress | Medium | Postpone native iPhone decision |
| Reports become too advanced too early | Medium | Start with summaries and COD collection report |
| Team switches to implementation without scope lock | High | Require framework decision and DEMO-7 task plan first |

## Next Planning Step

Next step: implementation planning for the 7-day cosmetics pilot.

The next planning task should define workstreams, build gates, stop conditions, and the contract-first path for the cloud-connected pilot while preserving Local-first and Hybrid future compatibility.
