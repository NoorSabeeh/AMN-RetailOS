# Field Feedback and QA Plan

AMN RetailOS must be validated against real store behavior, not only ideal workflows.

## Field Feedback Approach

Use observation-first feedback:

- Watch cashier flow during normal sale.
- Record barcode misses.
- Record printer problems.
- Observe returns and debt workflows.
- Observe shift closing.
- Ask what happens during power or internet loss.
- Compare spoken requirements with actual behavior.

## Field Note Template

For each visit, record:

- Business type
- Number of POS devices
- Number of users per shift
- Printer/scanner/drawer hardware
- Fastest sale scenario
- Slowest sale scenario
- Top repeated errors
- Return workflow
- Debt workflow
- Shift close workflow
- Backup method
- Power/internet failure behavior
- Explicit requests
- Observed needs not directly requested
- AMN decision: P0, P1, P2, Deferred, or Reject

## QA Scenarios

MVP QA must include:

- Create store profile.
- Create product/category/barcode/unit.
- Sell by barcode.
- Sell by search.
- Sell by carton and piece.
- Block negative stock by default.
- Commit sale and verify invoice.
- Verify inventory movement.
- Verify cash session effect.
- Retry sale submit with same idempotency key.
- Create partial payment and customer debt.
- Return full invoice.
- Return partial invoice.
- Close cash session with matching cash.
- Close cash session with variance and reason.
- Create backup.
- Restore backup in test environment.
- View audit logs.
- Check license/demo status.
- Test receipt printer and Arabic/RTL output.
- Operate without internet.

## Bug Report Format

Each bug should include:

- Title
- Role and workflow
- Steps to reproduce
- Expected result
- Actual result
- Severity
- Data impact
- Screenshot or photo if useful
- Hardware details if relevant
- Logs if available

## Pilot Feedback Rules

- Pilot feedback can add tasks, not uncontrolled scope.
- New requests must be classified P0, P1, P2, Deferred, or Reject.
- Pharmacy, Restaurant, Clinic, AI, cloud, mobile, online payments, and multi-branch requests remain delayed unless formally moved by a future planning decision.
