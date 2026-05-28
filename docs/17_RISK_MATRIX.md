# Risk Matrix

| Risk | Impact | Probability | Prevention | Detection | Recovery |
|---|---|---|---|---|---|
| Inventory mismatch | Very High | High | Inventory movement ledger, transactions, stock count controls | Stock discrepancy reports, movement audit | Approved stock adjustment with reason and audit |
| Invoice duplication | Very High | Medium | Backend invoice sequence, idempotency keys | Duplicate invoice report, audit review | Void/reverse duplicate with audit and reconcile ledgers |
| Data loss | Very High | Medium | Verified backups, pre-update backups, restore tests | Backup health dashboard, error logs | Restore latest verified backup |
| Employee misuse | High | High | RBAC, approvals, audit logs | Discount/void/return reports | Revoke permissions, investigate, reverse where valid |
| License abuse | High | Medium | Signed license, device binding, no private keys in app | License event anomalies | Reissue/revoke license, rotate secrets if needed |
| Printer failure | Medium | High | Printer Test Center, printer profiles, fallback reprint | Print error logs, support reports | Save sale, retry print, switch printer/profile |
| Power loss | High | High | Atomic transactions, short commits, backup discipline | Recovery logs, startup checks | Reopen cleanly, verify last transaction, restore if needed |
| Bad updates | High | Medium | Pre-update backup, migration checks, staged release | Update logs, migration report | Rollback or restore pre-update backup |
| Scope creep | High | High | MVP scope control, P0/P1/P2 review | Roadmap drift review | Move non-MVP features to Deferred |
| Team task overlap | Medium | Medium | Role-based ownership, sprint planning | Duplicate PRs/tasks | Reassign and clarify ownership |
| Overbuilding too many modes early | High | High | Retail/Wholesale-only MVP gate | Backlog review | Freeze delayed modes and return to core |
| Weak backup discipline | High | Medium | Scheduled reminders, backup health status | Missed backup alerts | Manual backup, USB/external restore plan |
| Slow system after long usage | High | Medium | Index planning, report limits, maintenance tasks | Performance reports, slow query logs | Archive, vacuum/maintenance, optimize queries |
| Arabic receipt rendering failure | High | Medium | RTL preview, real printer testing, fallback rendering | Test print failures, support tickets | Switch template/rendering path and reprint |
| Failed migration/update | High | Medium | Preflight integrity check, backup before migration | Migration logs | Restore pre-migration backup |
| Unauthorized discounts/voids | High | High | Permission checks, approval reason, audit | Discount/void reports | Review, reverse where appropriate, tighten permissions |
| Salesperson product leakage | Very High | Medium | Demo builds only, no source/secrets distribution, signed builds | Activation anomalies, unauthorized copies | Revoke license, rotate secrets, reissue controlled builds |
