# Security and License Plan

Security in AMN RetailOS protects store data, business money, inventory, customer records, and product licensing.

## Access Control

Use role-based access control (RBAC).

Permission areas:

- Product management
- Price editing
- Discount approval
- Sales
- Returns
- Invoice void/cancel
- Cash session open/close
- Cash movement
- Customer debt
- Supplier debt
- Inventory adjustment
- Reports
- User management
- Backup/restore
- License status

## Audit Logs

Audit logs must record sensitive actions:

- Login/logout
- Product price changes
- Discounts
- Voids/cancellations
- Returns
- Stock adjustments
- Debt changes
- Cash session close variance
- Backup/restore
- License changes
- Permission changes

Audit logs must not be casually editable from the application.

## Store Data Protection

AMN RetailOS must protect:

- Customer data
- Supplier data
- Debt records
- Sales history
- Backup files
- License files

Backups should be protected from accidental overwrite and unauthorized access.

## License Model

MVP may include basic license/demo protection:

- Demo build
- Trial mode
- Device-bound license
- Signed license file
- Offline activation
- License status screen
- License event log

Future AMN Control Center may manage customers, devices, activations, license transfers, and signed license generation.

## Signing and Secrets

- Private signing keys must never ship inside the application.
- The application should contain only the public key needed for license verification.
- No source code or license secrets should be distributed to sales channels.
- Installer builds should be signed before production distribution.
- Demo builds should not contain production activation secrets.

## License Transfer

License transfer to a new laptop must be a controlled support workflow:

- Verify customer identity.
- Deactivate or mark previous device if required.
- Issue a new signed license or activation response.
- Record license event.
