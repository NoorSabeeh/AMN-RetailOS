# AMN RetailOS Command Center v2.1

Internal shared team workspace for AMN RetailOS planning and execution.

This is not the AMN RetailOS POS product UI. It does not implement cashier screens, product backend runtime, database migrations for the POS product, Restaurant/Pharmacy/Clinic product features, online payments, mobile app support, multi-branch product support, AI features, or final license activation.

## Local Run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Sync Model

Command Center v2.1 uses normalized Supabase tables as the primary shared data model:

- `profiles`
- `team_members`
- `project_settings`
- `phases`
- `phase_members`
- `roadmap_items`
- `tasks`
- `checklist_items`
- `blockers`
- `member_updates`
- `docs_links`
- `decisions`
- `phase_transitions`
- `audit_events`
- `notifications`

`workspace_snapshots` is kept only for optional backup/export/debug snapshots. It is not the primary sync source for tasks, checklists, blockers, updates, decisions, docs, phases, or member progress.

Local fallback mode is still supported when Supabase env values are missing. In fallback mode, workspace data stays in this browser only and shared sync is not active.

## Public Access Gate (CC-2.2)

This repository is deployed publicly on GitHub Pages, so unauthenticated visitors are gated to a public-safe sign-in screen.

Signed-out visitors can only see:

- Command Center title and portal boundary note
- Assigned-account sign-in form
- Supabase setup/sync status note
- Public safety notice

Signed-out visitors cannot see internal workspace data (tasks, checklists, blockers, decisions, member workspaces, docs list, audit data, or internal roadmap details).

Authenticated behavior:

- Admin: full workspace management
- Member: own assigned workspace/task updates plus shared read access
- Viewer: limited read-only overview routes

The signed-out Supabase state never simulates Admin.

## Environment

Copy `.env.example` to `.env` locally and fill real values outside Git.

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_REPO_BASE_URL=https://github.com/OWNER/REPOSITORY
VITE_REPO_RAW_BASE_URL=https://raw.githubusercontent.com/OWNER/REPOSITORY/main
VITE_REPO_BRANCH=main
```

Never commit `.env`, `.env.local`, real Supabase keys, passwords, private keys, license secrets, or fake credentials.

`service_role` keys must never be used in frontend code.

## Supabase SQL Setup

Run and review:

```text
supabase/001_command_center_schema.sql
```

The SQL creates normalized tables, seed data, helper functions, and RLS policies.

RLS summary:

- Admin can manage shared project data.
- Members can read shared data and write only their own assigned tasks, checklist items, member updates, blockers, and notifications.
- Viewer can read allowed overview/project data and cannot write.
- Public unauthenticated users cannot access portal data.

## Manual Account Creation

Public signup is not exposed in this UI.

Admin creates accounts manually in Supabase Auth and shares credentials outside the repository. Do not store passwords in code or documentation.

User metadata should include:

```json
{
  "portal_role": "admin",
  "portal_member_slug": "noor",
  "display_name": "Noor",
  "role_label": "Admin / Product & Backend Coordinator"
}
```

Use the same shape for:

- `mohammed` - Frontend/UI Owner
- `ali` - Backend/Data Owner
- `murtadha` - UX/QA/Field Feedback Owner
- `viewer` - Read-only External Viewer

## Docs Hub

Docs Hub never exposes local machine paths. It copies repository-relative paths only, such as:

```text
docs/05_BACKEND_ARCHITECTURE.md
```

Configure `VITE_REPO_BASE_URL`, `VITE_REPO_RAW_BASE_URL`, and `VITE_REPO_BRANCH` to enable Open on GitHub and Open raw actions.

## GitHub Pages

The Vite build uses relative asset paths via `--base=./`, so the static frontend remains GitHub Pages friendly. Supabase shared sync can work from any static host when env values are provided at build time. Deployment is not configured by this repository.

## Storage Safety

The portal uses safe storage wrappers for browser storage access (`localStorage`/`sessionStorage`) to avoid runtime crashes in restricted environments (for example, private browsing modes with blocked storage).
