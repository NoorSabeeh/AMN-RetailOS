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

DEMO-7 QA additions:

- Scenario 22 - Variant/Shade barcode correctness.
- Scenario 23 - Instagram delivery order + delivery barcode + COD flow.
- Scenario 24 - Price override + audit log.
- COD Thursday cutoff report check for Iraqi merchant weekly collection.
- Excel dynamic mapping check: Preview -> Dynamic Column Mapping -> Row Validation -> Commit.

## DEMO-7 Mobile Scope Correction

Android is active in DEMO-7 scope. QA should cover Android planning needs such as product search, barcode lookup/manual fallback, stock summary, reservations, delivery order status, and COD summary.

iPhone remains postponed. Do not treat iPhone, App Store, TestFlight, or iOS signing as DEMO-7 delivery requirements.

## DEMO-7 Scenario Details

### Scenario 22 - Variant/Shade Barcode Correctness

- Scan or enter a shade-specific barcode.
- Expected: backend resolves the barcode to the correct ProductVariant/Shade where a shade barcode exists.
- Check that the general product remains the parent and the selected shade is visible.
- Confirm manual fallback exists when barcode lookup fails.

### Scenario 23 - Instagram Delivery Order + Delivery Barcode + COD Flow

- Create or review an Instagram delivery order.
- Attach delivery company barcode at order level.
- Confirm barcode represents the full order, not individual items.
- Review COD amount and weekly collection status.
- Confirm Thursday cutoff reporting is planned.

### Scenario 24 - Price Override + Audit Log

- Apply or simulate a price override during order/sale planning.
- Expected: backend requires future permission/audit handling.
- Confirm audit summary includes who changed price/status/order state when implemented.
- No client should own approval or audit rules.

### Excel Dynamic Mapping QA Check

- Preview imported Excel rows.
- Map columns dynamically.
- Validate row errors before commit.
- Confirm commit is separated from preview and validation.
- Current status: planning only; no Excel import implementation exists yet.

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
- Pharmacy, Restaurant, Clinic, AI, online payments, iPhone delivery, and multi-branch requests remain delayed unless formally moved by a future planning decision.
