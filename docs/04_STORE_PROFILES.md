# Store Profiles

Store Profiles configure AMN RetailOS for different business types while preserving one shared platform and one backend truth model.

Business Profiles should activate capabilities over one Core Backend. They should not create separate product backends per business type unless a future architecture decision explicitly approves that change.

## MVP Profiles

### Retail/Grocery

Main workflow:

- Fast barcode-first sales
- Product search for barcode misses
- Receipt printing
- Inventory tracking
- Daily cash session close
- Returns
- Basic reports

MVP status: included.

### Wholesale/Grocery

Main workflow:

- Carton/piece unit conversion
- Customer accounts
- Customer debt
- Supplier purchases
- A4 invoices
- Larger invoices and mixed payment

MVP status: included as basic wholesale support.

## Future Profiles

### Pharmacy

Future needs:

- Batch/expiry
- Expired item prevention
- Strong permissions
- Supplier traceability

MVP status: delayed.

### Restaurant/Cafe

Future needs:

- Tables
- Open orders
- Kitchen tickets
- Menu modifiers
- Split bills

MVP status: delayed.

### Clinic/Services

Future needs:

- Appointments
- Services
- Staff/resource scheduling
- Privacy-sensitive records

MVP status: delayed.

### Clothing

Future needs:

- Size/color variants
- Exchange-heavy workflows
- Seasonal discounts

MVP status: delayed beyond core product support.

### Electronics/Warranty

Future needs:

- Serial/IMEI
- Warranty
- Repair tickets

MVP status: delayed.

### Weight-based Stores

Future needs:

- Scale barcode parsing
- Direct scale integration
- Weight rounding and price calculation

MVP status: delayed.

### Custom Mode

Future needs:

- Configurable workflows
- Custom labels
- Optional modules

MVP status: delayed until the core is stable.

## Business Profiles / Future Profiles

These profiles are future-aware architecture planning only. They are not implemented now.

### Retail Profiles

- Grocery / Mini Market
- Wholesale / General Wholesale
- Hypermarket with multiple branches
- Cosmetics / Beauty / Perfume
- Clothing stores
- Clothing complexes
- Electronics / Mobile / Warranty
- Weight-based stores

### Wholesale Specialty Profiles

Wholesale is not one fixed type. AMN RetailOS should eventually support specialty wholesale workflows such as:

- Wholesale perfumes / cosmetics
- Wholesale watches / accessories
- Wholesale gifts / antiques / decor
- Wholesale kitchenware / homeware
- Wholesale raw materials
- Wholesale electricals
- Wholesale clothing / fashion
- Wholesale food / grocery
- General wholesale

### Medical / Healthcare Profiles

- Medical clinics
- Medical laboratories
- Radiology / Sonar centers
- Hospitals

### Education / Institution Profiles

- Schools
- Teaching institutes
- Universities

### Manufacturing / Operations Profiles

- Factories
- Production / raw materials / finished goods workflows

### Service / Custom Profiles

- Services
- Custom business profile

## Cosmetics Pilot Note

Cosmetics / Beauty / Perfume is the urgent DEMO-7 pilot profile. This is a temporary pilot planning focus and does not mean cosmetics support is complete.
