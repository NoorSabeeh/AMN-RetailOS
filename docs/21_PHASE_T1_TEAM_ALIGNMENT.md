# Phase T1 — Team Alignment & Work Preparation

## 1. Phase Name

Phase T1 — Team Alignment & Work Preparation

## 2. Phase Objective

Phase T1 prepares the team to work in a coordinated way before implementation resumes. This phase is not backend implementation, frontend implementation, database migration work, or final UI design.

The objective is to align roles, reading assignments, deliverables, tools, boundaries, status reporting, and environment preparation so the next implementation phase starts with clear ownership and fewer blockers.

## 3. Phase Basis and Source Docs

This phase is based on:

- `README.md`
- `AGENTS.md`
- `CODEX_STATUS.md`
- `TASKS.md`
- `docs/00_PROJECT_OVERVIEW.md`
- `docs/01_PRODUCT_SCOPE.md`
- `docs/02_MVP_V0_1_SCOPE.md`
- `docs/05_BACKEND_ARCHITECTURE.md`
- `docs/13_CLAUDE_UI_HANDOFF.md`
- `docs/14_API_SERVICE_CONTRACTS_DRAFT.md`
- `docs/15_TEAM_WORKFLOW.md`
- `docs/19_ACCEPTANCE_CRITERIA.md`
- `docs/20_DECISIONS_LOG.md`

Protected source documents remain unchanged:

- `AMN_RetailOS_Master_Plan.md`
- `deep-research-report.md`

## 4. Scope

Phase T1 includes:

- Role-based task distribution
- Reading assignments
- Deliverables for each role
- Tool readiness
- Environment preparation
- Status update format
- Coordination boundaries
- Next-phase readiness checks

## 5. Out of Scope

Phase T1 does not include:

- Backend runtime implementation
- Database migrations
- Schema generation
- API implementation
- Frontend UI implementation
- Final UI screens
- Restaurant mode
- Pharmacy mode
- Clinic/Medical mode
- AI features
- Cloud SaaS
- Mobile app
- Multi-branch
- Online payments
- Final license activation
- Real license secrets, fake credentials, or private signing keys

## 6. Rules

- Use role-based language only.
- Do not mention personal names.
- Do not use personal hierarchy labels.
- Do not describe individual ability levels.
- Keep AMN RetailOS local-first.
- Keep MVP focused on Retail/Grocery and basic Wholesale/Grocery.
- Do not claim unfinished features are implemented.
- Do not continue Backend Foundation Phase B1 until the .NET SDK is installed and build/test validation can run.
- Do not modify protected source documents.

## 7. Tools Used in This Phase

Recommended tools:

- Project documentation in Markdown
- Git repository once available
- Issue/task tracker
- Shared status updates
- Claude AI for UI planning handoff only
- Codex for documentation, backend planning, and implementation after environment readiness
- Windows laptop environment for future local-first testing
- .NET SDK installation checklist for Backend Foundation Phase B1 readiness

## 8. Work Environment for Each Role

### Product & Backend Coordinator

Environment:

- Documentation workspace
- Task backlog
- Acceptance criteria
- Backend architecture and service contract docs

Preparation focus:

- Confirm MVP boundaries.
- Confirm backend correctness priorities.
- Keep scope aligned with Retail/Grocery and basic Wholesale/Grocery.
- Prepare next-phase prompts and review checklists.

### Frontend/UI Owner

Environment:

- Claude UI handoff document
- UX cashier workflow document
- Service contract draft
- Acceptance criteria

Preparation focus:

- Read UI handoff requirements.
- Identify screens needed for MVP planning.
- Prepare UI questions for backend contracts.
- Avoid claiming unimplemented features work.

### Backend/Data Owner

Environment:

- Backend architecture document
- Conceptual schema document
- Inventory rules
- Invoice and sales rules
- API/service contracts draft
- Local machine setup checklist

Preparation focus:

- Install and verify .NET SDK before Backend Foundation Phase B1 resumes.
- Review schema and migration scope.
- Prepare database and test strategy questions.
- Do not continue code implementation until validation tools are available.

### UX/QA/Field Feedback Owner

Environment:

- Field feedback and QA plan
- Acceptance criteria
- Cashier workflow document
- Hardware deployment reality document

Preparation focus:

- Prepare QA scenarios.
- Prepare field observation checklist.
- Prepare hardware and printer issue checklist.
- Prepare Arabic/RTL receipt validation checklist.

## 9. Deliverables for Each Role

### Product & Backend Coordinator

- Confirmed MVP scope note
- Backend B1 readiness checklist
- Next-phase decision notes
- Updated task priority notes if needed

### Frontend/UI Owner

- Claude UI Planning Phase U1 preparation notes
- MVP screen inventory
- UI questions for backend contracts
- Arabic/RTL UI concerns list

### Backend/Data Owner

- .NET SDK readiness confirmation
- Backend environment setup notes
- Schema/migration review notes
- B1 risk list before implementation resumes

### UX/QA/Field Feedback Owner

- QA scenario checklist
- Field research preparation checklist
- Hardware/printer test checklist
- Status report on unclear workflows

## 10. 24-48 Hour Task Plan

### First 24 Hours

- Each role reads assigned documents.
- Each role prepares a short Done/Blocked/Next update.
- Backend/Data Owner confirms whether the .NET SDK is installed and usable.
- Frontend/UI Owner prepares U1 UI planning questions.
- UX/QA/Field Feedback Owner prepares first QA and field checklist draft.
- Product & Backend Coordinator reviews blockers and keeps scope aligned.

### Next 24 Hours

- Consolidate blockers.
- Confirm whether Backend Foundation Phase B1 can resume.
- Confirm whether Claude UI Planning Phase U1 can start.
- Confirm field research/QA preparation tasks.
- Update task backlog if needed.

## 11. Status Update Format

Use this format:

```text
Done:
- What was completed

Blocked:
- What is blocked or unclear

Next:
- Next planned task
```

## 12. Acceptance Criteria for Completing This Phase

Phase T1 is complete when:

- Each role has read assigned documents.
- Each role has submitted one Done/Blocked/Next update.
- Backend/Data Owner has confirmed .NET SDK readiness status.
- Frontend/UI Owner has prepared UI planning questions for Claude UI Planning Phase U1.
- UX/QA/Field Feedback Owner has prepared QA and field feedback checklists.
- Product & Backend Coordinator has confirmed current blockers and next recommended phase.
- Backend Foundation Phase B1 is not marked complete unless build/test/migration validation is actually possible and completed.

## 13. Next Possible Phases

- Claude UI Planning Phase U1
- Backend Foundation Phase B1 after .NET SDK is installed
- Field Research/QA Preparation
