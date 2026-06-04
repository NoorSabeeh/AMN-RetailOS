# CODEX STATUS

## Current Phase

Project Foundation Planning

## Current Active Coordination Phase

TEAM-1 - AMN Team Handoff System + Member Work Packages

## Current Main Product Phase

Backend Foundation B1 - Recovery, Build Validation, and Architecture Lock.

The .NET SDK blocker is resolved. Initial `dotnet restore`, `dotnet build`, and foundational `dotnet test` validation now pass for the admitted backend skeleton. Do not mark B1 complete until architecture lock, domain split, and meaningful backend implementation validation are completed.

## Product Implementation

Not started.

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
- File submission rules for Codex review and safe integration

## Next Recommended Phase

Complete TEAM-1 handoff adoption, then one of:

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
