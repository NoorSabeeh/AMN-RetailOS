# Hardware and Deployment Reality

AMN RetailOS must work in real store environments, not only in a clean development environment.

## Target Hardware

MVP targets:

- Windows laptops
- 58mm and 80mm receipt printers
- A4 invoice printers
- Barcode scanners
- Cash drawers
- Label printers where needed

Future hardware:

- Weighing scales
- Customer display

## Deployment Requirements

- Offline installation must be possible.
- Offline activation must be possible.
- License transfer to a new laptop must be supported through a controlled process.
- Installer must handle normal Windows permission issues.
- Signed installer is required before production distribution.
- Antivirus false positives must be planned for through signing, predictable install paths, and support documentation.

## Common Field Issues

- USB instability
- Printer driver issues
- Wrong paper size
- Receipt printer code page problems
- Arabic/RTL receipt rendering failure
- Cash drawer wiring through printer port
- Scanner sending unexpected Enter/Tab suffix
- Windows printer names changing
- Low-performance laptops
- Power loss during work

## Printer Test Center

MVP should include a Printer Test Center plan:

- Test receipt print
- Test A4 invoice print
- Test Arabic/RTL receipt output
- Test logo if enabled
- Test drawer kick if supported
- Save selected printer profile
- Show troubleshooting guidance

## Hardware Troubleshooting Screen

Diagnostics should help support identify:

- App version
- License status
- Database health
- Backup status
- Printer configuration
- Last printer error
- Scanner test result
- Cash drawer test result where supported
- Windows and device information
