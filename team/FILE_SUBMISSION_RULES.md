# File Submission Rules

Files sent through Telegram are not automatically official project files. They are review candidates until Codex compares them with the current GitHub repository and the change is approved.

## Core Rules

- No direct overwrite from Telegram files.
- Every file must be reviewed before merge.
- GitHub remains the official source of truth.
- Codex must compare submitted files with the current repository version.
- Codex must preserve the current GitHub version unless the submitted change is approved.
- Each submission must identify the member, phase, source, and changed files.
- Every submission should include `team/HANDOFF_TEMPLATE.md`.

## Do Not Submit

Do not submit:

- `.env`
- `.env.local`
- API keys
- passwords
- Supabase service role keys
- database passwords
- private signing keys
- real license secrets
- `node_modules`
- `dist`
- build cache folders
- local machine paths
- screenshots that expose credentials

## Required File Information

Every file submission must say:

- who submitted it,
- which phase it belongs to,
- what files changed,
- what problem it solves,
- what should be reviewed,
- what must not be overwritten,
- whether it needs build/test validation.

## Codex Review Flow

Codex should:

1. inspect the current repository state,
2. inspect the submitted files,
3. compare differences,
4. identify conflicts or overlapping work,
5. preserve unrelated existing changes,
6. apply only approved changes,
7. run validation checks required by the file type,
8. summarize the exact files changed.

## Build And Test Rule

For code changes:

- run the relevant build command,
- run available tests,
- report failures clearly,
- do not mark a phase complete if validation cannot run.

For documentation-only submissions:

- product build is not required unless links, status, generated docs, or runtime references changed,
- run lightweight checks for forbidden secrets, local paths, and scope drift.

## Path Rule

Use repository-relative paths only:

```text
docs/05_BACKEND_ARCHITECTURE.md
team/ALI_WORK_PACKAGE.md
project_portal/README.md
```

Do not use local machine paths or file URLs.
