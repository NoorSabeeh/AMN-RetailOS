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
