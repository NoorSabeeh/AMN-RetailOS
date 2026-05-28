# Backup, Restore, and Recovery

Backup is a core product requirement. A backup that cannot be restored is not a valid backup.

## Backup Requirements

AMN RetailOS must support:

- Manual backup
- Scheduled backup
- Pre-update backup
- Backup history
- Backup verification status
- Backup failure notification
- Restore testing workflow

## Backup Verification

Each backup should record:

- Created timestamp
- User or system actor
- Source database path or instance
- Destination
- File size
- Verification result
- Error message if verification failed

The application should not report a backup as successful until verification completes.

## Restore Requirements

Restore must support:

- Restore into a test environment
- Restore with database integrity check
- Clear warning before replacing active data
- Operator-friendly restore result
- Audit log entry

Production restore should be protected by permission.

## Recovery Scenarios

Plan for:

- Power loss during sale
- Power loss during backup
- Corrupt database file
- Failed update/migration
- Missing backup device
- Damaged backup file
- Accidental data change

## Database Corruption Recovery

Recovery should prioritize:

1. Stop writes.
2. Preserve current damaged files for investigation.
3. Restore latest verified backup.
4. If no valid backup exists, attempt salvage in a separate recovery copy.
5. Record recovery actions in logs.

## Operator Messaging

Backup and restore messages must be clear for non-technical store operators. Avoid technical-only errors. Provide practical next actions such as retry, choose another backup location, test restore, or contact support.
