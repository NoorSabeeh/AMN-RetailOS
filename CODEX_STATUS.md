# CODEX STATUS

## Current Phase

Project Foundation Planning

## Current Active Coordination Phase

DEMO-7-D4 - Read-Only API Smoke Verification, Contract Docs, and Team Feedback Alignment

## Current Main Product Phase

Backend Foundation B1 - Recovery, Build Validation, and Architecture Lock.

The .NET SDK blocker is resolved. Initial `dotnet restore`, `dotnet build`, and foundational `dotnet test` validation now pass for the admitted backend skeleton. Do not mark B1 complete until architecture lock, domain split, and meaningful backend implementation validation are completed.

B1-R1.3 is a green checkpoint:

- Domain model files were split into focused folders/namespaces.
- A minimal `RetailOSDbContext` skeleton exists without migrations.
- `dotnet restore`, `dotnet build`, and `dotnet test` passed with foundational tests.

B1-R1.4 is paused temporarily while DEMO-7 cosmetics pilot planning and implementation planning are documented.

## Product Implementation

Not started.

The DEMO-7-P1 update is documentation only. No product feature, app UI, backend runtime behavior, migration, cloud configuration, or app project has been implemented by this planning phase.

DEMO-7-F1 framework decision is recorded:

- Backend/Core: .NET 10 / ASP.NET Core / Clean Architecture
- Windows: WinUI 3 + Windows App SDK + .NET
- Android: Kotlin + Jetpack Compose
- iPhone: Swift + SwiftUI later

Accepted long-term client strategy: native-per-platform clients over shared backend/API contracts. The backend/core remains the business logic center. DEMO-7 starts cloud-connected first, without canceling Local-first or Hybrid long-term targets.

DEMO-7-P1 implementation plan is created:

- planning uses workstreams and build gates, not fixed daily task counts,
- Backend/Core ownership is split between Noor and Ali,
- build gates define acceptance criteria and stop conditions,
- next step is implementation start only after planning approval.

DEMO-7-G0+D1 status:

- Gate 0 scope lock is documented in `docs/24_DEMO_7_IMPLEMENTATION_PLAN.md`.
- Backend/Core contracts and demo data model baseline are started.
- Domain model baseline includes generic DEMO-7 concepts without making the backend cosmetics-only.
- Application contract baseline includes platform-neutral DTOs for shared Windows, Android, and future iPhone clients.
- Noor is the primary hands-on backend architect/builder.
- Ali is backend/data co-builder.
- Major backend/API/database/business-rule decisions require Noor approval before merge.
- No Windows, Android, or iPhone app projects are created.
- No database migrations are added.
- Restore/build/test validation passes for the current baseline.
- B1 remains not complete and B1-R1.4 remains paused temporarily.

DEMO-7-D2 status:

- Contract-first API route surface baseline is added with route groups for contracts, products, locations, inventory, shipments, reservations, customers, delivery orders, sales, COD reports, and audit.
- Route placeholders return honest `501 Not Implemented` responses and do not claim working features.
- Standard API response/error DTOs are added for platform-neutral clients.
- Validation baseline is added in Application without external packages, database queries, stock checks, permission checks, or business operations.
- No full CRUD, inventory engine, sale commit logic, or COD settlement logic is implemented.
- No app projects, migrations, cloud credentials, or Supabase/cloud config are added.
- Restore/build/test validation passes for the D2 baseline.
- B1 remains not complete and B1-R1.4 remains paused temporarily.

DEMO-7-D3 status:

- Read-only Application query interfaces are added for products, locations, inventory, shipments, reservations, customers, delivery orders, COD report, and audit summary.
- Infrastructure includes a clearly demo-only in-memory read-only data provider.
- Selected GET endpoints return standard wrapped sample responses for smoke testing future Windows and Android clients.
- Write operations remain not implemented and return Not Implemented placeholders.
- Persistence is in-memory demo data only; no database writes are performed.
- No migrations, cloud credentials/config, Supabase changes, or app projects are added.
- Restore/build/test validation passes for the D3 baseline.
- B1 remains not complete and B1-R1.4 remains paused temporarily.

DEMO-7-D4 status:

- Read-only API smoke verification passed for the current GET endpoints.
- Contract documentation is exported in `docs/25_DEMO_7_API_CONTRACTS_AND_SMOKE_RESPONSES.md`.
- Ali feedback is incorporated: ProductVariant/Shade relationship, variant barcode priority, order-level delivery barcode, StockLot expiry, named/anonymous reservations, postponed deposit/down payment, Display/Showroom default sale planning, and Android API needs.
- Murtadha QA feedback is incorporated: Thursday COD cutoff planning, Excel Preview -> Mapping -> Row Validation -> Commit planning, Android active/iPhone postponed clarification, and QA scenarios 22-24.
- Metadata now states Android is in DEMO-7 scope, iPhone is postponed, COD cutoff planning is future work, and Excel import is not implemented.
- No write behavior, business logic, migrations, app projects, cloud credentials/config, or Supabase changes are added.
- Restore/build/test validation passes for the D4 baseline.
- B1 remains not complete and B1-R1.4 remains paused temporarily.

## Internal Project Portal

`project_portal/` has been upgraded as AMN RetailOS Command Center v2.1, an internal team/project tracking UI only.

The portal is separate from the future AMN RetailOS product frontend. It does not implement POS/cashier screens, product backend runtime code, product database migrations, AI features, online payments, mobile app support, multi-branch product support, or delayed product modes.

Command Center v2.1 is a table-based Supabase workspace for internal portal auth/sync only. `workspace_snapshots` is not primary sync and is reserved for optional backup/export/debug snapshots. Supabase requires local environment setup and real keys must not be committed. If Supabase is not configured, the portal runs in local fallback mode and clearly shows that shared sync is inactive.

CC-2.2 public hardening is applied: unauthenticated access is gated to a public-safe sign-in screen and internal workspace pages are hidden until authenticated. No secrets are committed. Supabase table-based sync remains active when configured.

CC-2.2.1 bug-fix pass is applied:

- Public sign-in page copy is cleaned for visitors and no longer shows developer-only security implementation details.
- Arabic mojibake text is replaced with valid UTF-8 Arabic strings.
- Checklist updates now apply optimistic local state updates with rollback on save failure, so progress reflects immediately without full page refresh.

CC-2.3 UI/UX workflow upgrade is applied:

- Professional dashboard and team workflow pages are upgraded (Overview, Team Execution, Tasks, Member workspace, Updates, Blockers, Decisions, Docs Hub).
- Public unauthenticated gate remains active.
- Supabase table-based sync remains active.
- Command Center remains internal portal UI only.
- No secrets are committed.

The Command Center is stable enough for team coordination and should be used with Telegram Topics and GitHub as documented in `team/`.

## UI Implementation

Handled separately through Claude AI.

Current Codex output includes a Claude UI handoff document only. No final AMN RetailOS product UI screens have been implemented.

## Backend Implementation

Blocked.

Backend Foundation Phase B1 is not complete. Build/test tooling is now operational, but implementation work remains pending.

Current Codex output includes backend architecture, conceptual schema, rules, service contract planning, and a minimally validated backend skeleton (`src/`, `tests/`, `amn-retailos.sln`, `Directory.Build.props`) ready for source-control admission.

## Current Output

Documentation and planning foundation:

- Product overview and scope
- MVP v0.1 scope
- Roadmap and store profiles
- Backend architecture plan
- Database conceptual schema
- Inventory, invoice, and sales rules
- Security and license plan
- Backup, restore, and recovery plan
- Hardware deployment reality
- Cashier UX workflow
- Claude UI handoff
- API/service contracts draft
- Team workflow
- Field feedback and QA plan
- Risk matrix
- 30/90 day plan
- Acceptance criteria
- Decisions log
- Root README, agent guidance, status, and task backlog
- Phase T1 team alignment and work preparation documents
- Internal project portal v2.1 for table-based shared team tracking
- TEAM-1 handoff system in `team/`
- Member work packages and Telegram submission templates
- DEMO-7 cosmetics pilot replan in `docs/22_DEMO_7_COSMETICS_PILOT_REPLAN.md`
- DEMO-7 framework decision in `docs/23_DEMO_7_FRAMEWORK_DECISION.md`
- DEMO-7 implementation plan in `docs/24_DEMO_7_IMPLEMENTATION_PLAN.md`
- DEMO-7-G0+D1 backend/model/contracts baseline
- DEMO-7-D2 API surface and validation baseline
- DEMO-7-D3 in-memory read-only smoke endpoint baseline
- DEMO-7-D4 contract documentation and team feedback alignment
- File submission rules for Codex review and safe integration

## Next Recommended Phase

Next immediate step:

- DEMO-7 implementation start after planning approval.

After DEMO-7 planning is resolved, continue one of:

- Claude UI Planning Phase U1
- Backend Foundation Phase B1 architecture lock and foundational domain/test split
- Field Research/QA Preparation

## Tests

Backend build/test command validation is available and currently green for the skeleton.

Portal validation should confirm:

- Supabase env values are not committed.
- Local fallback mode works when Supabase is missing.
- Backend B1 is not complete.
- No AMN RetailOS POS product screens are implemented in the portal.
- Source documents remain unchanged.

TEAM-1 validation confirms:

- no product runtime code was changed by the handoff setup,
- Telegram plus internal website workflow is documented,
- submitted member files require Codex review before integration,
- B1 is not marked complete.

B1-R1.2 validation confirms:

- backend skeleton files are now trackable for Git admission,
- `.NET` source ignores are scoped to `bin/` and `obj/` outputs,
- foundational architecture/reference tests pass,
- no product runtime feature implementation was added.

B1-R1.3 architecture lock pass is completed:

- the monolithic Domain entity file was split into focused domain folders and namespaces,
- a minimal EF Core `RetailOSDbContext` skeleton was added for existing entities only,
- no migrations, seed data, runtime database creation, or connection strings were added,
- restore, build, and foundational test validation pass,
- B1 is still not complete and meaningful product feature implementation has not started.

REPLAN-DEMO-7 status:

- DEMO-7-F1 framework decision recorded,
- DEMO-7-P1 implementation plan created,
- B1-R1.4 paused temporarily,
- cosmetics pilot scope documented as urgent temporary sprint,
- Local-first, Cloud-connected, and Hybrid deployment modes documented for planning,
- iPhone native build/distribution decision postponed,
- Windows and Android treated as higher-priority pilot targets,
- native-per-platform strategy accepted,
- workstreams/build gates plan accepted as the execution planning model,
- Backend/Core ownership split between Noor and Ali,
- no runtime code changed.
