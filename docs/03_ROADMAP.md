# Roadmap

The roadmap keeps AMN RetailOS focused on backend correctness before expanding into specialized store profiles.

## Urgent Temporary Sprint: DEMO-7 Cosmetics Pilot

DEMO-7 is an urgent temporary planning sprint before continuing deeper B1 implementation.

Purpose:

- document the 7-day cosmetics merchant pilot,
- decide the short-term demo approach,
- compare deployment and framework options,
- validate whether cosmetics, Instagram delivery, reservations, COD, and import workflows should influence the next implementation plan.

Status: active planning only.

Important limits:

- DEMO-7 does not complete Backend B1.
- DEMO-7 does not implement production cosmetics support.
- DEMO-7 does not choose the final framework in this document.
- B1-R1.4 is paused temporarily until DEMO-7 planning and framework decision are complete.

## Stage 1: Core Retail/Grocery + Wholesale

Focus:

- Store setup
- Product catalog
- Categories, barcodes, units, and unit conversion
- Inventory movements
- Sales/POS
- Invoices
- Payments
- Customers and debt
- Suppliers and purchases
- Cash sessions
- Reports
- Users, roles, permissions
- Audit logs
- Backup/restore
- Printer test/support

## Stage 2: Hardening

Focus:

- Stronger security and approval rules
- Backup verification and recovery drills
- License/demo protection
- Installer flow
- Diagnostics
- Arabic/RTL receipt validation
- Update, migration, and rollback process
- Pilot store bug fixes

## Stage 3: Pharmacy Pack

Delayed profile. Future focus:

- Batch/expiry
- Strict expiry controls
- Supplier traceability
- Pharmacy-specific permissions and reports

## Stage 4: Restaurant/Cafe Pack

Delayed profile. Future focus:

- Tables
- Open orders
- Kitchen tickets
- Menu items
- Modifiers
- Order routing

## Stage 5: Services/Clinic Pack

Delayed profile. Future focus:

- Appointments
- Services
- Resource scheduling
- Service receipts
- Privacy-sensitive access rules

## Stage 6: Electronics/Warranty Pack

Delayed profile. Future focus:

- Serial numbers
- IMEI tracking
- Warranty records
- Repair tickets

## Stage 7: Local Network / Multi-device

Delayed capability. Future focus:

- Local service architecture
- Device coordination
- Conflict and locking strategy
- Avoiding shared SQLite database files over network shares

## Stage 8: AMN Business Edition / Control Center

Delayed internal platform. Future focus:

- Customer/license management
- Device activation management
- Support records
- License transfer workflow
- Signed license generation

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
