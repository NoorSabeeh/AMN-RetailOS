# CODEX STATUS

## Current Phase

Project Foundation Planning

## Current Active Coordination Phase

Phase T1 - Team Alignment & Work Preparation

## Product Implementation

Not started.

## Internal Project Portal

`project_portal/` has been upgraded as AMN RetailOS Command Center v2.1, an internal team/project tracking UI only.

The portal is separate from the future AMN RetailOS product frontend. It does not implement POS/cashier screens, product backend runtime code, product database migrations, AI features, online payments, mobile app support, multi-branch product support, or delayed product modes.

Command Center v2.1 is a table-based Supabase workspace for internal portal auth/sync only. `workspace_snapshots` is not primary sync and is reserved for optional backup/export/debug snapshots. Supabase requires local environment setup and real keys must not be committed. If Supabase is not configured, the portal runs in local fallback mode and clearly shows that shared sync is inactive.

CC-2.2 public hardening is applied: unauthenticated access is gated to a public-safe sign-in screen and internal workspace pages are hidden until authenticated. No secrets are committed. Supabase table-based sync remains active when configured.

## UI Implementation

Handled separately through Claude AI.

Current Codex output includes a Claude UI handoff document only. No final AMN RetailOS product UI screens have been implemented.

## Backend Implementation

Blocked.

Backend Foundation Phase B1 is blocked until the .NET SDK is installed. Do not mark B1 as complete until build, test, and migration validation can run successfully.

Current Codex output includes backend architecture, conceptual schema, rules, and service contract planning. A prior interrupted B1 attempt created partial backend skeleton files, but B1 is not complete and should not continue until the SDK blocker is resolved.

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

## Next Recommended Phase

Phase T1 completion, then one of:

- Claude UI Planning Phase U1
- Backend Foundation Phase B1 after .NET SDK is installed
- Field Research/QA Preparation

## Tests

Backend build/test/migration validation is blocked until the .NET SDK is installed.

Portal validation should confirm:

- Supabase env values are not committed.
- Local fallback mode works when Supabase is missing.
- Backend B1 remains blocked, not complete.
- No AMN RetailOS POS product screens are implemented in the portal.
- Source documents remain unchanged.
