# Decisions Log

This log records product and technical decisions for AMN RetailOS. Add new decisions when scope, architecture, workflow, or release policy changes.

## Decision 001: Local-first Product Direction

Decision: AMN RetailOS is local-first for Windows laptops.

Reason: Stores must continue selling during internet outages and unstable field conditions.

Status: accepted.

## Decision 002: One Platform With Store Profiles

Decision: Build one core platform with configurable store profiles instead of separate apps.

Reason: Most store types share product, inventory, invoice, payment, customer, supplier, report, permission, audit, backup, and license foundations.

Status: accepted.

## Decision 003: MVP Focus

Decision: MVP v0.1 focuses only on Retail/Grocery and basic Wholesale/Grocery.

Reason: These modes validate the shared commercial core without adding early complexity from restaurant, pharmacy, or clinic workflows.

Status: accepted.

## Decision 004: Backend Owns Business Rules

Decision: Frontend must not own sensitive business rules.

Reason: Inventory, invoice, payment, debt, discount, permission, and license decisions must be consistent and auditable.

Status: accepted.

## Decision 005: Inventory Movement Ledger

Decision: Every stock change must create an inventory movement.

Reason: Stock must be explainable and auditable over time.

Status: accepted.

## Decision 006: No Invoice Hard Delete

Decision: Invoices must not be hard-deleted after creation.

Reason: Deletion hides business history and enables misuse.

Status: accepted.

## Decision 007: Documentation Foundation First

Decision: The first project task creates planning and coordination documentation only.

Reason: The team needs scope, architecture, workflow, contracts, and acceptance criteria before implementation.

Status: accepted.

## Decision 008: DEMO-7 Cosmetics Pilot Accepted As Urgent Temporary Sprint

Decision: AMN RetailOS will temporarily pause deeper B1-R1.4 planning to document a 7-day cosmetics merchant pilot.

Reason: A real cosmetics merchant can provide early feedback on products, variants, images, locations, delivery orders, COD, reservations, import, and reporting needs.

Status: accepted.

## Decision 009: Local / Cloud / Hybrid Deployment Modes

Decision: AMN RetailOS must plan for Local-first Mode, Cloud-connected Mode, and future Hybrid Mode.

Reason: Local-first remains necessary for reliable store selling, while some businesses need multi-device, Instagram sales, delivery workflow, and remote access capabilities.

Status: accepted for planning.

## Decision 010: iPhone Native Build Decision Postponed

Decision: Native iPhone build and distribution decisions are postponed.

Reason: DEMO-7 should not be blocked by App Store, TestFlight, or native iPhone delivery decisions. Windows and Android are higher priority for the pilot.

Status: accepted.

## Decision 011: Future Profiles Are Architecture Awareness Only

Decision: Future Business Profiles are documented to guide architecture, but they are not implementation scope now.

Reason: The product needs to avoid overbuilding while preserving a path for Retail, Wholesale Specialty, Medical, Education, Manufacturing, Service, and Custom profiles.

Status: accepted.

## Decision 012: Wholesale Includes Specialty Profiles

Decision: Wholesale is not one fixed type; it includes specialty wholesale profiles such as perfumes/cosmetics, watches/accessories, gifts/decor, kitchenware/homeware, raw materials, electricals, clothing/fashion, food/grocery, and general wholesale.

Reason: Specialty wholesalers have different product, import, pricing, reservation, and reporting needs.

Status: accepted for planning.

## Decision 013: Native-per-platform Clients Accepted

Decision: AMN RetailOS accepts a native-per-platform client strategy for long-term product quality.

Reason: Windows, Android, and future iPhone clients need strong platform control for hardware, camera/image workflows, local behavior, performance, and deployment quality.

Status: accepted.

## Decision 014: .NET 10 Backend/Core Remains Business Logic Center

Decision: The backend/core stack remains .NET 10 / ASP.NET Core / Clean Architecture.

Reason: The backend must own inventory, reservations, sales/order lifecycle, permissions, COD, reports, audit, and future sync decisions across all client apps.

Status: accepted.

## Decision 015: WinUI 3 Selected For Windows

Decision: The Windows client will use WinUI 3 + Windows App SDK + .NET.

Reason: Native Windows is the strongest path for laptop deployment, printing, hardware diagnostics, installer/signing workflows, and local-first operation.

Status: accepted for planning.

## Decision 016: Kotlin + Jetpack Compose Selected For Android

Decision: The Android client will use Kotlin + Jetpack Compose.

Reason: Native Android supports merchant mobile workflows, product images, barcode/image scanning, offline behavior, and strong mobile UI quality.

Status: accepted for planning.

## Decision 017: SwiftUI Selected For Future iPhone App

Decision: A future iPhone client will use Swift + SwiftUI, but iPhone implementation, signing, and distribution are postponed.

Reason: iPhone remains a future target, but it must not block DEMO-7 or create App Store/TestFlight delivery promises now.

Status: accepted, postponed for implementation.

## Decision 018: DEMO-7 Starts Cloud-connected

Decision: DEMO-7 starts cloud-connected first while preserving Local-first and Hybrid as long-term targets.

Reason: The cosmetics pilot needs speed, shared access, Instagram delivery workflows, and real merchant feedback. This does not cancel the local-first product strategy.

Status: accepted for DEMO-7 planning.
