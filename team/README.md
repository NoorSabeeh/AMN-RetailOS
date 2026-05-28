# AMN Team Handoff System

This folder defines how AMN TEAM coordinates AMN RetailOS work across Telegram, the internal Command Center website, GitHub, and Codex.

AMN RetailOS is still focused on a local-first Windows POS, cashier, inventory, invoicing, and business management system for Retail/Grocery and basic Wholesale/Grocery. The current main product phase is Backend Foundation B1 - Recovery, Build Validation, and Architecture Lock.

Backend B1 is not complete. It remains blocked until the .NET SDK is installed and build/test validation succeeds.

## How The Team Works

- Telegram Topics are used for daily communication, quick status updates, and member file submissions.
- The internal Command Center website is used for status, progress, tasks, blockers, and coordination visibility.
- GitHub is the official source of truth for accepted project files.
- Codex reviews submitted files, compares them with the current repository, and integrates only approved changes.
- Files sent in Telegram are proposals until reviewed and merged.
- No direct overwrite is allowed from member files.

## Current Phase

Current main product phase:

Backend Foundation B1 - Recovery, Build Validation, and Architecture Lock.

This phase is for:

- recovering from the interrupted backend skeleton attempt,
- confirming the correct backend architecture,
- preparing .NET SDK readiness,
- validating build/test requirements,
- locking the first backend implementation boundaries.

This phase is not for:

- full product implementation,
- POS screen implementation,
- Restaurant, Pharmacy, or Clinic product modes,
- AI features,
- online payments,
- mobile app work,
- multi-branch product functionality,
- final license activation.

## Communication Channels

Use Telegram for:

- daily Done/Blocked/Next updates,
- file submission messages,
- screenshots,
- questions,
- bug reports,
- field notes.

Use the internal Command Center for:

- task status,
- member progress,
- blockers,
- decisions,
- phase status,
- project links,
- shared updates.

Use GitHub for:

- accepted source files,
- official documentation,
- reviewed changes,
- repository history.

Use Codex for:

- reviewing file submissions,
- comparing member work with the current repository,
- avoiding accidental overwrites,
- running checks,
- controlled integration.

## File Handoff Rule

Every submitted file must include a handoff summary using `team/HANDOFF_TEMPLATE.md`.

Codex must not copy a submitted file directly over the repository version without review. The correct flow is:

1. identify the member, phase, and submitted files,
2. compare submitted files with the current GitHub version,
3. preserve current project work unless the change is approved,
4. run build/test checks for code changes,
5. update documentation when workflow or scope changes,
6. report exactly what changed.

## Start Here

Each member should read their own work package first:

- `team/NOOR_WORK_PACKAGE.md`
- `team/ALI_WORK_PACKAGE.md`
- `team/MOHAMMED_WORK_PACKAGE.md`
- `team/MURTADHA_WORK_PACKAGE.md`

Shared workflow documents:

- `team/HANDOFF_TEMPLATE.md`
- `team/TELEGRAM_UPDATE_TEMPLATE.md`
- `team/FILE_SUBMISSION_RULES.md`
- `team/AI_PROMPT_GUIDE.md`
- `team/PHASE_B1_TEAM_PLAN.md`
