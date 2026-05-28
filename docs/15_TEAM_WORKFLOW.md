# Team Workflow

AMN RetailOS should be coordinated through role-based responsibilities, clear review rules, and documentation discipline.

## Roles

### Product & Backend Coordinator

Responsibilities:

- Product scope and priorities
- MVP boundaries
- Backend business rules
- Acceptance criteria
- Release readiness coordination
- Documentation consistency
- Security and license policy direction

### Frontend/UI Owner

Responsibilities:

- UI implementation
- Cashier workflow usability
- Responsive Windows laptop layouts
- Claude UI handoff integration
- Error/loading/empty states
- Arabic/RTL UI and receipt design coordination

### Backend/Data Owner

Responsibilities:

- Data model
- Service contracts
- Transactions
- Inventory movement ledger
- Invoice lifecycle
- Debt ledgers
- Backup/restore logic
- Backend tests

### UX/QA/Field Feedback Owner

Responsibilities:

- Field observation notes
- QA scenarios
- Usability feedback
- Hardware and printer issue tracking
- Demo/training flow feedback
- Documentation of bugs and support issues

## Weekly Sprint Process

Each week starts with:

- Sprint goal
- Included scope
- Explicitly excluded scope
- Assigned tasks by role
- Acceptance criteria
- Test scenarios
- Documentation updates required

## Status Update Format

Use this format:

```text
Done:
- Completed work

Blocked:
- Blocker or decision needed

Next:
- Next planned work
```

## Review Process

- Backend/data changes require review for data integrity, transaction safety, and auditability.
- UI changes require review for cashier speed, error clarity, keyboard flow, and Arabic/RTL readiness.
- Documentation must be updated when scope, contracts, workflows, or acceptance criteria change.
- Sensitive operations such as invoice void, stock adjustment, discount approval, restore, and license handling must be reviewed carefully.

## Pull Request Rules

- One focused change per pull request where practical.
- Include purpose, scope, tests, and screenshots for UI changes.
- Include data impact for backend changes.
- Do not mix unrelated refactors with feature work.
- Do not mark delayed features as complete.
- Update docs when behavior changes.

## QA and Testing Process

QA should cover:

- Normal cashier sale
- Barcode not found
- Partial payment
- Customer debt
- Full and partial return
- Stock movement correctness
- Duplicate submit/idempotency
- Cash session open/close
- Printer failure after saved sale
- Backup and restore test
- Arabic/RTL receipt output
- Offline operation

## Release Approval Process

Release readiness requires:

- MVP scope still respected
- Critical tests pass
- Backup/restore verified
- Printer Test Center checked
- License/demo status checked
- Known risks documented
- No unfinished feature represented as production-ready

## Claude UI Work Handoff

Claude UI work should be returned to the project with:

- Screen list
- Design files or screenshots
- Component list
- Backend contract assumptions
- Open questions
- States for loading, empty, error, permission denied, demo mode, and offline mode
- Notes for Arabic/RTL layout and receipt rendering
