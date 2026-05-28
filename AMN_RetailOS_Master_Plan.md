# AMN RetailOS Master Plan

**اسم المشروع:** AMN RetailOS  
**الفريق:** AMN TEAM  
**نوع الوثيقة:** Master Product & Technical Plan  
**اللغة:** العربية مع إبقاء المصطلحات التقنية المهمة بالإنجليزية  
**الهدف:** تحويل الأفكار المطروحة في المحادثة إلى خطة منتج احترافية قابلة للتنفيذ  

---

## 1. Executive Summary

**AMN RetailOS** هو نظام **local-first POS / Cashier / Inventory / Invoicing / Business Management** مخصص للمحلات الصغيرة والمتوسطة. الهدف أن يعمل على لابتوبات Windows عادية، وأن يكون قابلًا للتخصيص حسب نوع النشاط التجاري من خلال **Store Profiles** بدل بناء أنظمة منفصلة لكل نوع محل.

النظام يستهدف:

- محلات Retail و Grocery و Mini Market.
- محلات Wholesale للأغذية والتوزيع.
- الصيدليات.
- المطاعم والكافيهات.
- العيادات والخدمات.
- محلات الملابس والأحذية.
- محلات الإلكترونيات والموبايلات والضمان.
- محلات العطور والتجميل والقرطاسية والهدايا.
- المحلات التي تبيع بالوزن.
- أي محل يحتاج كاشير، مخزون، فواتير، تقارير، صلاحيات، وBackup.

الفكرة الأساسية ليست بناء “كاشير فقط”، بل بناء **Business Operating System** للمحلات، يعمل في ظروف واقعية مثل ضعف الإنترنت، انقطاع الكهرباء، الأجهزة العادية، الطابعات القديمة، أخطاء الموظفين، والحاجة لحماية المنتج من النسخ أو البيع غير المصرح.

أهم قرار استراتيجي هو أن تبدأ النسخة الأولى بـ:

- **Retail/Grocery Mode**
- **Wholesale/Grocery Mode**

ثم يتم التوسع لاحقًا إلى Pharmacy وRestaurant وClinic وغيرها. السبب أن Retail + Wholesale يمثلان الأساس المشترك لمعظم الأنظمة: المنتجات، الباركود، المخزون، الفواتير، الديون، الموردين، التقارير، الصلاحيات، والنسخ الاحتياطي.

أهم شيء في المشروع ليس شكل الواجهة فقط، بل **Backend Correctness**. لأن أي خطأ في المخزون، الفواتير، المرتجعات، الديون، أو الصلاحيات قد يجعل المنتج غير موثوق تجاريًا.

---

## 2. Product Vision

رؤية AMN RetailOS:

> نظام إدارة تشغيل يومي للمحلات الصغيرة والمتوسطة، يعمل محليًا، سريع، آمن، مرن، وقابل للتخصيص حسب نوع النشاط.

النظام يجب أن يكون:

- أكثر من كاشير.
- أكثر من شاشة بيع.
- منصة واحدة قابلة للتوسعة.
- مناسبة للواقع العملي في المحلات.
- مصممة للمستخدم العادي وليس للمبرمج.
- آمنة ضد سوء الاستخدام الداخلي.
- قابلة للتسويق والترخيص والدعم كمنتج تجاري.

### لماذا Local-first؟

لأن المحلات الواقعية قد تواجه:

- إنترنت ضعيف أو مقطوع.
- كهرباء غير مستقرة.
- أجهزة Windows عادية أو قديمة.
- طابعات وUSB devices قديمة.
- موظفين غير تقنيين.
- حاجة للبيع المستمر حتى بدون شبكة.

لذلك يجب أن تبقى العمليات الأساسية محلية:

- البيع.
- المخزون.
- الفواتير.
- الطباعة.
- المرتجعات.
- الديون.
- الوردية.
- التقارير الأساسية.
- Backup/Restore.

---

## 3. Core Product Concept

AMN RetailOS يجب أن يبنى كالتالي:

```text
AMN RetailOS
│
├── Core Platform
│   ├── Store Setup
│   ├── Products
│   ├── Inventory
│   ├── Sales/POS
│   ├── Invoices
│   ├── Customers
│   ├── Suppliers
│   ├── Reports
│   ├── Users/Roles
│   ├── Audit Logs
│   ├── Backup/Restore
│   └── License Engine
│
├── Store Profiles
│   ├── Retail/Grocery
│   ├── Wholesale
│   ├── Pharmacy
│   ├── Restaurant/Cafe
│   ├── Clinic/Services
│   ├── Clothing
│   ├── Electronics/Warranty
│   ├── Weighted Items
│   └── Custom Mode
│
└── Add-on Modules
    ├── Batch/Expiry
    ├── Restaurant Tables
    ├── Appointments
    ├── Serial/Warranty
    ├── Staff Commission
    ├── Advanced Reports
    └── Multi-device Support
```

### الفكرة المهمة

لا تبنون نسخة منفصلة لكل نوع محل.  
ابنوا **Core Platform واحد**، وفوقه **Store Profiles** تفعل أو تخفي modules حسب النشاط.

### Setup Wizard

عند أول تشغيل، النظام يسأل:

- اسم المحل.
- نوع النشاط.
- العملة.
- اللغة.
- هل يوجد باركود؟
- هل يوجد مخزون؟
- هل يوجد بيع بالدين؟
- هل توجد طابعة وصل؟
- هل توجد طابعة A4؟
- هل يوجد كاشير واحد أو أكثر؟
- هل توجد صلاحيات مختلفة؟
- هل يحتاج Backup يومي؟
- ما نوع الفاتورة؟
- هل يحتاج دعم كارتون/قطعة؟
- هل يحتاج تواريخ صلاحية أو Batch لاحقًا؟

---

## 4. Supported Store Types / Store Modes

| Store Mode | Main Workflow | Important Hidden Needs | Required Modules | Include Early | Delay |
|---|---|---|---|---|---|
| Retail / Grocery / Mini Market | بيع سريع بالباركود، فواتير، مخزون، تقارير يومية | سرعة الكاشير، طابعة، باركود مكرر، منتجات بلا باركود، نقص مخزون | POS, Products, Barcode, Inventory, Reports, Returns | نعم، هذا جزء من v0.1 | ميزات متقدمة مثل multi-branch |
| Wholesale Food / Distribution | بيع كارتون/قطعة، عملاء، ديون، موردين، فواتير كبيرة | أسعار متعددة، حد دين، كشف حساب، أرشفة | Units, Customers, Debt, Suppliers, A4 invoices, Reports | نعم، مع Retail في v0.1 | إدارة توزيع كاملة |
| Pharmacy | بيع أدوية، مخزون، تواريخ صلاحية | Batch, Expiry, صلاحيات صارمة، منع بيع منتهي | Batch/Expiry, Supplier, Audit, Permissions | أساس المنتجات والمخزون فقط | نظام صيدلي كامل أو نصائح علاجية |
| Restaurant / Cafe | طلبات، طاولات، مطبخ، دفع | Kitchen tickets, modifiers, split bill, tables | Orders, Tables, Menu, Kitchen, Cashier Shift | لا، يؤجل | نظام مطعم كامل |
| Clinic / Doctor / Services | مواعيد، خدمات، إيصالات | خصوصية، سجل عملاء/مرضى، دفع، مواعيد | Appointments, Services, Customers, Billing, Permissions | لا، يؤجل | Medical records كامل |
| Clothing / Shoes | بيع قطع حسب موديل/لون/مقاس | Variants, size/color, exchange, seasonal discounts | Products, Variants, Returns, Discounts | Products فقط | Size/color advanced |
| Electronics / Mobile / Warranty | بيع أجهزة وملحقات | Serial, IMEI, Warranty, Repair tickets | Serial Items, Warranty, Customers, Returns | Products فقط | Warranty/repair system |
| Perfume / Cosmetics | بيع Retail مع عروض وباركود | Expiry أحيانًا، عروض، منتجات صغيرة | POS, Barcode, Inventory, Reports | ممكن لاحقًا بعد Retail | Batch متقدم |
| Stationery / Gift Shop | بيع Retail بسيط | منتجات كثيرة منخفضة السعر، باركود داخلي | POS, Products, Barcode, Inventory | ممكن ضمن Retail | ميزات خاصة قليلة |
| Laundry / Barber / Salon / Gym | خدمات، مواعيد، اشتراكات، عمولات | Staff commission, appointments, memberships | Services, Appointments, Customers, Payments | لا، يؤجل | Subscriptions/commissions |
| Stores Selling by Weight | بيع بالكيلو/الغرام | Scale barcode, وزن، rounding، هدر | Weighted Items, Scale Support, Inventory | لا، يؤجل | تكامل ميزان متقدم |
| General / Custom Mode | نشاط عام قابل للتخصيص | مرونة الإعدادات | Core modules configurable | لاحقًا بعد استقرار Core | Custom workflow builder |

---

## 5. MVP Scope — AMN RetailOS Core v0.1

النسخة الأولى يجب أن تكون صغيرة لكنها صلبة. الهدف ليس بناء كل شيء، بل بناء أساس تجاري صحيح.

### Include in v0.1

- Retail/Grocery Mode.
- Wholesale/Grocery Mode basic.
- Products.
- Categories.
- Barcode.
- Units.
- Unit conversion: قطعة/كارتون.
- Inventory.
- Inventory Movements.
- Sales/POS.
- Invoices.
- Customers.
- Customer debt.
- Suppliers.
- Purchases.
- Returns.
- Cash sessions/shifts.
- Reports.
- Users/Roles.
- Audit logs.
- Backup/Restore.
- Basic License/Demo protection.
- Printer test/support.
- Offline-first operation.
- Basic installer flow.

### Must Delay

- Full Restaurant system.
- Full Pharmacy system.
- Full Clinic/Medical system.
- AI features.
- Cloud SaaS.
- Mobile app.
- Multi-branch.
- Online payments.
- Complex accounting.
- Advanced enterprise features.
- Delivery tracking.
- Marketplace.
- Full AMN Control Center production system.

---

## 6. Backend Architecture Notes

Backend هو قلب AMN RetailOS. الواجهة تظهر النظام، لكن Backend يحدد هل المنتج موثوق أم لا.

### Local Backend vs AMN Control Backend

#### Local Backend

يعمل داخل جهاز الزبون ويجب أن يعمل بدون إنترنت.

مسؤول عن:

- Products.
- Inventory.
- Sales.
- Invoices.
- Returns.
- Customers.
- Suppliers.
- Debt.
- Cash sessions.
- Users/Roles.
- Reports.
- Audit logs.
- Backup/Restore.
- License verification.

#### AMN Control Backend

نظام داخلي مستقبلي لـ AMN TEAM، لا يجب أن يكون شرطًا لتشغيل البيع اليومي.

مسؤول لاحقًا عن:

- إدارة العملاء.
- إدارة التراخيص.
- الأجهزة المفعلة.
- المندوبين.
- الاشتراكات.
- الدعم.
- توليد license files.
- نقل الترخيص لجهاز جديد.

### Business Rules Must Live in Backend

لا تجعل Frontend يقرر قواعد حساسة مثل:

- هل يجوز البيع بكمية غير متوفرة؟
- هل يجوز حذف فاتورة؟
- هل يجوز عمل خصم؟
- هل يجوز تجاوز حد الدين؟
- هل يجوز إرجاع منتج؟
- هل الترخيص فعال؟
- هل المستخدم يملك صلاحية؟

كل هذه يجب أن تكون في Backend.

### Data Integrity

كل عملية مالية أو مخزنية يجب أن تكون صحيحة وقابلة للتتبع.

أمثلة:

- البيع ينقص المخزون.
- المرتجع يرجع المخزون.
- الدفع يسجل في payments.
- الفاتورة تدخل في cash session.
- أي تغيير حساس يسجل في Audit Log.
- إذا فشل جزء من العملية، تفشل كلها.

### Transactions

عملية البيع يجب أن تتم داخل transaction واحدة:

1. إنشاء sale.
2. إنشاء sale_lines.
3. تسجيل payment.
4. إنشاء invoice.
5. إنشاء inventory_movements.
6. تحديث cash_session.
7. تسجيل audit_log.

إما تنجح كلها أو تفشل كلها.

### Idempotency

إذا ضغط المستخدم زر الدفع مرتين، أو حصل retry، لا يجوز إنشاء فاتورتين أو نقص المخزون مرتين.

كل عملية حساسة يجب أن تمتلك:

- operation_id.
- draft_id.
- request_id.

---

## 7. Suggested Backend Modules

| Module | Responsibility |
|---|---|
| Store Setup Engine | إعداد المحل، نوع النشاط، الإعدادات الأساسية |
| Product Engine | المنتجات، التصنيفات، الأسعار، الحالة |
| Barcode Engine | الباركودات، الباركود البديل، منع التكرار |
| Unit Conversion Engine | قطعة/كارتون/شدة/كغم وتحويل الوحدات |
| Inventory Engine | حركات المخزون، الرصيد، الجرد، التلف |
| Sales Engine | عملية البيع، السلة، الخصومات، الدفع |
| Invoice Engine | أرقام الفواتير، الطباعة، الإلغاء، الارتباط بالبيع |
| Payment Engine | Cash, debt, mixed payment, partial payment |
| Returns Engine | المرتجعات الكاملة والجزئية والاستبدال |
| Customer Debt Engine | حسابات العملاء، الديون، الدفعات، حدود الدين |
| Supplier/Purchase Engine | الموردين، المشتريات، ديون الموردين |
| Cash Session / Shift Engine | فتح وإغلاق وردية، حساب الفرق، Z report |
| Reports Engine | المبيعات، الأرباح التقريبية، المخزون، الديون |
| Users & Roles Engine | المستخدمين، الأدوار، الصلاحيات، الجلسات |
| Audit Log Engine | تتبع كل العمليات الحساسة |
| Backup/Restore Engine | النسخ الاحتياطي والاسترجاع |
| License Engine | الترخيص، Trial, Demo, Device binding |
| Update/Migration Engine | تحديث قاعدة البيانات والرجوع عند الفشل |
| Diagnostics/Support Engine | جمع logs ومعلومات الدعم |

---

## 8. Suggested Database Design

### Core Tables

```text
stores
store_settings
store_profiles

users
roles
permissions
user_roles
sessions

products
categories
product_barcodes
units
product_unit_conversions
price_lists

inventory_batches
inventory_movements
stock_counts
stock_count_lines

sales
sale_lines
payments
returns
return_lines

customers
customer_accounts
customer_payments

suppliers
supplier_accounts
supplier_payments
purchases
purchase_lines

cash_sessions
cash_movements

invoices
invoice_sequences

audit_logs
app_logs
error_logs

backups
licenses
license_events
settings
```

### Future Tables

```text
appointments
services
staff_commissions

restaurant_tables
orders
order_lines
kitchen_tickets
menu_items
modifiers

serial_items
warranties
repair_tickets
```

### Important Notes

- `inventory_movements` هو أهم جدول في النظام.
- لا تعتمد على quantity فقط داخل products.
- كل تغيير في المخزون يجب أن يكون movement.
- كل فاتورة يجب أن ترتبط بـ user و cash_session عندما يكون الدفع نقديًا.
- Audit logs يجب ألا تكون قابلة للحذف من الواجهة.
- Backup records يجب أن تسجل وقت ومكان وحالة كل backup.

---

## 9. Inventory Rules

قواعد المخزون يجب أن تكون صارمة منذ البداية.

### Principles

- لا تخزن الكمية كرقم بسيط فقط بدون تاريخ.
- كل stock change يجب أن ينشئ Inventory Movement.
- لا تعديل مباشر للكمية بدون سبب.
- لا بيع لكمية غير متوفرة إلا بصلاحية واضحة.
- كل movement يجب أن يحتوي:
  - product_id
  - quantity
  - unit
  - movement_type
  - reference_type
  - reference_id
  - user_id
  - timestamp
  - reason

### Supported Movement Types

- Opening Balance.
- Purchase.
- Sale.
- Return.
- Damage.
- Expiry.
- Adjustment.
- Stock Count.
- Transfer لاحقًا.
- Unit Conversion.

### Unit Conversion

يجب دعم:

- قطعة.
- كارتون.
- شدة.
- باكيت.
- كغم لاحقًا.
- Barcode لكل وحدة.
- سعر لكل وحدة.
- conversion rate.

مثال:

```text
Product: Pepsi Can
Base Unit: Can
Carton = 24 Can
Sale Units: Can, Carton
```

### Future Inventory Extensions

- Batch/Expiry للصيدليات والأغذية.
- Serial/Warranty للإلكترونيات.
- Weighted Items للمنتجات التي تباع بالوزن.

---

## 10. Invoice and Sales Rules

الفاتورة ليست مجرد طباعة. هي مستند مالي ومخزني.

### Invoice Rules

- Invoice number يجب ألا يتكرر.
- لا يوجد hard delete للفواتير.
- استخدم Void / Cancel / Reversal بدل Delete.
- كل فاتورة يجب أن ترتبط بمستخدم.
- كل فاتورة نقدية يجب أن ترتبط بـ cash_session.
- كل خصم يجب أن يسجل.
- أي إلغاء أو تعديل حساس يجب أن يدخل Audit Log.

### Sales Rules

عند البيع، يجب أن تحدث هذه الأمور معًا:

- تسجيل sale.
- تسجيل sale lines.
- تسجيل payment.
- إنقاص inventory.
- إنشاء inventory movements.
- ربط العملية بالوردية.
- تسجيل audit log.
- تجهيز invoice للطباعة.

إذا فشل أي جزء، تفشل العملية كلها.

### Payment Support

- Cash.
- Debt.
- Partial payment.
- Mixed payment.
- Card external terminal كـ record فقط.
- Wallet/manual كـ record فقط.

### Returns and Exchanges

يجب دعم:

- Return by invoice.
- Partial return.
- Exchange.
- Refund cash.
- Refund as customer credit.
- Return reason.
- Manager approval لبعض الحالات.
- Audit log.

### Held Invoices

مهم عند الزحام:

- تعليق فاتورة.
- استرجاع فاتورة.
- حفظ draft تلقائي.
- منع تكرار العملية عبر idempotency.

---

## 11. UX and Cashier Workflow

الواجهة يجب أن تكون سريعة ومباشرة. في الكاشير، السرعة أهم من الجمال الزائد.

### Key UX Principles

- Barcode-first design.
- Mouse-free selling قدر الإمكان.
- Always-focused barcode/search input.
- أزرار كبيرة وواضحة.
- واجهة خالية من التعقيد وقت البيع.
- لا توجد نوافذ تأكيد مزعجة لكل خطوة.
- رسائل خطأ واضحة ومباشرة.
- دعم Training Mode و Demo Mode.

### Suggested Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| Enter | إضافة/تأكيد |
| F2 | بحث منتج |
| F3 | تغيير كمية |
| F4 | خصم |
| F5 | دفع |
| F6 | طباعة |
| F7 | تعليق فاتورة |
| F8 | استرجاع فاتورة |
| F9 | مرتجع |
| Esc | إلغاء/رجوع |
| Ctrl+L | تركيز على البحث/الباركود |

### Important Flows

#### Product Not Found

عند مسح باركود غير موجود:

- يظهر تنبيه واضح.
- خيار إضافة منتج سريع بصلاحية مناسبة.
- خيار البيع المؤقت بصلاحية مدير.
- تسجيل الحدث في audit log إذا كان حساسًا.

#### Manager Approval

يستخدم في:

- خصم كبير.
- تجاوز حد الدين.
- مرتجع بدون فاتورة.
- بيع بسعر معدل.
- بيع مخزون غير متوفر.
- إلغاء فاتورة.

#### Training Mode

يسمح بتجربة النظام بدون التأثير على البيانات الحقيقية.

#### Demo Mode

نسخة تسويقية ببيانات وهمية، مناسبة للعرض على العملاء.

---

## 12. Hardware and Deployment Reality

النظام سيعمل في بيئة محلات حقيقية، لذلك يجب توقع مشاكل الأجهزة من البداية.

### Supported Hardware

- Windows laptops.
- Receipt printers 58mm/80mm.
- A4 printers.
- Barcode scanners.
- Cash drawers.
- Label printers.
- Weighing scales لاحقًا.
- Customer display لاحقًا.

### Real Deployment Issues

- USB instability.
- Printer driver issues.
- الطابعة تظهر offline.
- تغيير USB port يسبب مشكلة.
- Arabic/RTL receipt issues.
- Windows permissions.
- Antivirus false positives.
- جهاز قديم أو بطيء.
- عدم توفر admin access.
- انقطاع الكهرباء أثناء الاستخدام.
- عدم وجود إنترنت أثناء التنصيب.

### Printer Test Center

داخل النظام يجب وجود شاشة:

- Test receipt.
- Test Arabic text.
- Test logo.
- اختيار 58mm/80mm.
- Test cash drawer.
- اختيار printer.
- Reset printer settings.
- Hardware troubleshooting screen.

### Installer Checklist

قبل التنصيب:

- Windows version.
- RAM.
- Storage.
- SSD/HDD.
- Printer model.
- Scanner type.
- USB ports.
- Backup location.
- Store name.
- Store profile.
- Currency.
- License type.
- Offline activation option.

---

## 13. Offline, Power Loss, and Reliability

AMN RetailOS يجب أن يفترض أن الإنترنت والكهرباء غير مضمونين.

### Required Reliability Features

- Local-first operation.
- البيع يستمر بدون إنترنت.
- الترخيص لا يقفل البيع فورًا عند انقطاع الإنترنت.
- License grace period.
- Auto-save invoice draft.
- Power loss recovery.
- Daily backup.
- Manual backup.
- Backup before updates.
- Restore process.
- Archive system.
- Database integrity check.
- Recovery mode.

### Archive System

حتى لا يثقل النظام بعد سنة أو سنتين:

- أرشفة فواتير قديمة.
- إبقاء ملخصات داخل النظام.
- السماح بفتح الأرشيف عند الحاجة.
- فصل البيانات القديمة عن البيانات النشطة.
- الحفاظ على سرعة البحث والتقارير.

---

## 14. Security and Anti-Reselling Plan

الأمان جزء أساسي من المنتج، خصوصًا لأن النظام سيتم توزيعه تجاريًا.

### Security Features

- RBAC / role-based permissions.
- Audit logs.
- منع حذف الفواتير.
- منع الخصومات غير المصرح بها.
- حماية Backup files.
- حماية بيانات العملاء.
- Password hashing.
- Session timeout.
- Account lockout لاحقًا.
- منع admin bypass.
- عدم تخزين secrets داخل الكود.

### Anti-Reselling Plan

- Demo build للمندوبين.
- لا source code للمندوبين.
- لا master license key للمندوبين.
- Device-bound license.
- Signed license file.
- Signed installer.
- Trial mode.
- Offline activation.
- كل عميل/license يسجل تحت AMN TEAM.
- الدعم فقط للعملاء المسجلين.
- Private signing keys لا تشحن داخل التطبيق.
- التطبيق يحتوي public key فقط للتحقق من الترخيص.

### License Rules

License يحتوي:

- business_name.
- store_type.
- device_id.
- expiry_date.
- enabled_modules.
- max_users.
- max_devices.
- signature.

إذا تم تعديل license file، يجب أن يرفضه النظام.

---

## 15. AMN Control Center Idea

AMN Control Center هو نظام داخلي مستقبلي لإدارة المنتج والعملاء.

### Responsibilities

- إدارة العملاء.
- إدارة التراخيص.
- تتبع الأجهزة المفعلة.
- تتبع المندوبين.
- تتبع المدفوعات/الاشتراكات.
- تتبع حالات الدعم.
- الموافقة على نقل ترخيص إلى جهاز جديد.
- توليد signed license files.
- الاحتفاظ بالـ private keys داخليًا.

### Important Rule

AMN Control Center لا يجب أن يكون شرطًا لتشغيل البيع اليومي داخل المحل.  
المحل يجب أن يعمل local-first، بينما Control Center يستخدم للإدارة والترخيص والدعم.

---

## 16. Business and Pricing Strategy

### Possible Editions

| Edition | Target | Features |
|---|---|---|
| AMN Lite | محل صغير | POS, Products, Basic Inventory, Daily Report |
| AMN Standard | ماركت/صيدلية صغيرة | Lite + Customers, Suppliers, Debt, Backup |
| AMN Pro | جملة/مطعم لاحقًا | Standard + Advanced Reports, Shifts, Permissions |
| AMN Business | شركات أكبر | Multi-device لاحقًا، دعم أولوية، تقارير متقدمة |

### Pricing Options

- One-time license.
- Subscription.
- Maintenance/support contract.
- Paid installation.
- Paid training.
- Paid updates/support.
- Custom reports بسعر منفصل.

### Sales Strategy

- Demo build ببيانات وهمية.
- Pilot مع عدد قليل من المحلات.
- لا وعود بميزات custom بسرعة.
- كل طلب ميزة يدخل تقييم P0/P1/P2.
- لا يتم تسليم production license بدون تسجيل العميل.

---

## 17. Team Roles and Responsibilities

| Member | Role | Responsibilities |
|---|---|---|
| Noor | Team Leader, Product Owner, Planner, Backend Architect, Security/License Decision Owner | الرؤية، التخطيط، الأولويات، Backend architecture، القواعد الحساسة، Security، License، المراجعة النهائية |
| Mohammed | Frontend/UI/UX Implementation | POS screens، dashboard، الصفحات، responsive interface، user-facing flows، تحسين الواجهة |
| Ali | Backend/Data Implementation | database، APIs/services، migrations، inventory/sales logic support، reports queries، backend tests |
| Murtadha | User Experience Research, Field Feedback, QA Testing, Documentation, Demo Flow, Training Material | usability testing، جمع feedback، اختبار السيناريوهات، توثيق المشاكل، تجهيز demo flow |

### Team Workflow

```text
Noor defines the feature and rules
↓
Ali implements backend/database
↓
Mohammed implements frontend/UI
↓
Murtadha tests as user, collects feedback, documents issues
↓
Noor reviews and approves
```

---

## 18. Sensitive Ownership

هذه ليست مسألة ثقة، بل **Professional Governance** لضمان وضوح القرار وحماية المنتج.

الأمور التالية يجب أن تبقى تحت تحكم Noor / Team Lead:

- Product roadmap.
- Final product decisions.
- License keys.
- Security rules.
- Permission matrix.
- Backend architecture approval.
- Database architecture approval.
- Release approval.
- Customer activation policy.
- AMN internal control decisions.
- تحديد Demo vs Production.
- تحديد ما يدخل MVP وما يتأجل.
- قبول أو رفض الميزات الجديدة.
- التوقيع النهائي على الإصدارات.

---

## 19. Team Workflow

### Weekly Sprint

كل أسبوع يبدأ بـ:

- تحديد أهداف الأسبوع.
- تحديد ما لا يجب العمل عليه.
- توزيع المهام.
- تحديد Acceptance Criteria.
- تحديد المسؤول عن كل جزء.

### Status Update Format

```text
Done:
- ماذا أنجزت؟

Blocked:
- ما الذي يمنعك؟

Next:
- ما الخطوة التالية؟
```

### End-of-Week Review

يراجع الفريق:

- هل الميزة تعمل؟
- هل الباكيند صحيح؟
- هل الواجهة واضحة؟
- هل مرتضى وجد مشاكل UX؟
- هل الاختبارات نجحت؟
- هل تدخل الميزة في release أم لا؟

### Tools

- GitHub private repo.
- Issues/tasks.
- Pull requests.
- Code review.
- Release versions.
- Changelog.
- Test checklist.
- Documentation updates.

---

## 20. Documentation Files To Create

```text
docs/
├── AMN_PRODUCT_SPEC.md
├── AMN_ROADMAP.md
├── AMN_STORE_PROFILES.md
├── AMN_BACKEND_ARCHITECTURE.md
├── AMN_DATABASE_SCHEMA.md
├── AMN_SECURITY_RULES.md
├── AMN_LICENSE_PLAN.md
├── AMN_TEST_CHECKLIST.md
├── AMN_RELEASE_CHECKLIST.md
├── AMN_MARKET_FEEDBACK.md
├── AMN_DECISIONS.md
└── AMN_USER_GUIDE.md
```

### Purpose of Each File

| File | Purpose |
|---|---|
| AMN_PRODUCT_SPEC.md | مواصفات المنتج |
| AMN_ROADMAP.md | خارطة الطريق |
| AMN_STORE_PROFILES.md | تعريف Store Modes |
| AMN_BACKEND_ARCHITECTURE.md | تصميم الباكيند |
| AMN_DATABASE_SCHEMA.md | تصميم قاعدة البيانات |
| AMN_SECURITY_RULES.md | قواعد الأمن والصلاحيات |
| AMN_LICENSE_PLAN.md | خطة الترخيص |
| AMN_TEST_CHECKLIST.md | اختبارات النظام |
| AMN_RELEASE_CHECKLIST.md | شروط الإصدار |
| AMN_MARKET_FEEDBACK.md | ملاحظات السوق |
| AMN_DECISIONS.md | القرارات المهمة |
| AMN_USER_GUIDE.md | دليل المستخدم |

---

## 21. Practical Store Reality Notes

هذه ملاحظات عملية يجب أن تقود تصميم المنتج:

- سرعة الكاشير أهم من الواجهة الجميلة فقط.
- مشاكل الطابعة شائعة.
- مشاكل الباركود شائعة.
- بعض المنتجات لا تمتلك باركود.
- المنتج الواحد قد يمتلك أكثر من باركود.
- Unit conversion مهم جدًا: قطعة/كارتون/شدة.
- الديون شائعة في المحلات.
- سوء استخدام الموظفين يجب أن يؤخذ بالحسبان.
- المرتجعات يمكن أن تستغل.
- الخصومات يمكن أن تستغل.
- إغلاق الوردية مهم جدًا.
- الجرد صعب في الواقع.
- Backup ليس ميزة إضافية؛ هو ضرورة.
- التحديثات يجب ألا تكسر بيانات العميل.
- يجب توقع أجهزة بطيئة وWindows قديم.
- إيصالات العربية تحتاج عناية.
- انقطاع الكهرباء والإنترنت يجب أن يكون افتراضًا أساسيًا.
- لا تعتمدوا على cloud في البيع اليومي.
- لا تعتمدوا على موظف تقني داخل المحل.

---

## 22. Roadmap

| Stage | Name | Focus |
|---|---|---|
| Stage 1 | Core Retail/Grocery + Wholesale | POS, Inventory, Invoices, Customers, Suppliers |
| Stage 2 | Hardening | Security, Backup, Licensing, Reports, Installer |
| Stage 3 | Pharmacy Pack | Batch, Expiry, strict permissions |
| Stage 4 | Restaurant Pack | Tables, Orders, Kitchen tickets |
| Stage 5 | Services/Clinic Pack | Appointments, Services, Receipts |
| Stage 6 | Electronics/Warranty Pack | Serial, Warranty, Repair tickets |
| Stage 7 | Multi-device/local network | أكثر من جهاز داخل نفس المحل |
| Stage 8 | AMN Business Edition / Control Center | إدارة عملاء وتراخيص ودعم داخلي |

---

## 23. 30-Day Plan

### Week 1 — Product Definition

- تثبيت اسم المشروع.
- تثبيت MVP.
- تحديد Retail/Grocery + Wholesale كأول scope.
- كتابة AMN_PRODUCT_SPEC.md.
- كتابة AMN_STORE_PROFILES.md.
- تصميم workflows الأساسية.
- تصميم قاعدة البيانات المفاهيمية.
- توزيع مهام الفريق.

### Week 2 — Backend Foundation

- إنشاء المشروع.
- Store Setup.
- Products.
- Categories.
- Units.
- Barcode.
- SQLite schema.
- أول migrations.
- Basic CRUD.

### Week 3 — POS + Sales + Inventory

- POS screen.
- Sales engine.
- Invoice engine.
- Inventory Movement.
- Payment basic.
- Held invoices.
- منع negative inventory بشكل مبدئي.
- طباعة أولية.

### Week 4 — Safety + Demo

- Users/Roles.
- Audit logs.
- Backup/Restore.
- Basic reports.
- Printer test.
- Demo mode.
- Internal testing.
- First internal release.

---

## 24. 90-Day Plan

### Month 1 — Core Data + Sales

- Products.
- Barcode.
- Units.
- Inventory.
- Sales.
- Invoices.
- Payments.
- Users.

### Month 2 — Business Safety

- Returns.
- Customers/debt.
- Suppliers/purchases.
- Cash sessions.
- Reports.
- Audit logs.
- Backup/restore.

### Month 3 — Hardening

- License system.
- Installer.
- Diagnostics.
- Update process.
- Rollback plan.
- Printer support.
- Pilot store.
- Bug fixes.
- Release checklist.

---

## 25. Risk Matrix

| Risk | Impact | Probability | Prevention | Detection | Recovery |
|---|---|---|---|---|---|
| Inventory mismatch | عالي جدًا | متوسط | Inventory Movement + transactions | تقارير فرق المخزون | Stock adjustment with audit |
| Invoice duplication | عالي | متوسط | invoice_sequence + idempotency | تقرير أرقام مكررة | void duplicate + audit |
| Data loss | عالي جدًا | متوسط | Daily backup + pre-update backup | backup logs | restore process |
| Employee misuse | عالي | عالي | RBAC + Audit Log | suspicious reports | revoke permissions + audit review |
| License abuse | عالي | متوسط | signed license + device binding | license events | deactivate/reissue license |
| Printer failure | متوسط | عالي | Printer Test Center | support logs | switch printer/settings |
| Power loss | عالي | عالي | auto-save + transactions | recovery logs | recovery mode |
| Bad updates | عالي | متوسط | backup before update + migrations | update log | rollback/restore |
| Scope creep | عالي | عالي | MVP discipline | roadmap review | move to P1/P2 |
| Team task overlap | متوسط | متوسط | clear roles + sprint planning | duplicate work review | task reassignment |
| Overbuilding too many modes early | عالي | عالي | start Retail/Wholesale only | roadmap drift | freeze advanced modes |
| Weak backup discipline | عالي | متوسط | automatic reminders + required backups | backup status | manual/USB restore |
| Slow system after long usage | عالي | متوسط | archive system + indexes | performance reports | archive/vacuum/maintenance |

---

## 26. Final Recommendations

1. ابدأوا بـ **Retail/Grocery + Wholesale** فقط.
2. لا تبنوا كل Store Modes من البداية.
3. ابنوا **Core Platform + Store Profiles** بدل تطبيقات منفصلة.
4. حافظوا على **local-first**.
5. اجعلوا Backend correctness أولوية قبل الواجهة الفاخرة.
6. أضيفوا Audit Logs من البداية.
7. أضيفوا Backup/Restore من البداية.
8. لا تسمحوا بـ hard delete للفواتير.
9. لا تجعلوا المخزون مجرد quantity بدون history.
10. استخدموا Inventory Movement لكل تغيير.
11. طبقوا RBAC وصلاحيات واضحة.
12. طبقوا license system مبكرًا لحماية المنتج.
13. لا تعطوا salespeople source code أو license secrets.
14. اختبروا النظام في محلات حقيقية.
15. تعاملوا مع المشروع كمنتج شركة، وليس كتجربة كود فقط.
16. لا تعدوا العملاء بميزات custom بسرعة.
17. كل ميزة جديدة يجب أن تصنف: P0 / P1 / P2.
18. أي شيء يؤثر على المخزون أو الفواتير أو الترخيص يجب أن يمر بمراجعة Noor.
19. الواجهة يجب أن تكون سريعة ومناسبة للكاشير.
20. النجاح الحقيقي هو أن يعمل النظام يوميًا في محل حقيقي بدون تعطيل البيع أو تخريب البيانات.

---

## Final Product Statement

**AMN RetailOS** يجب أن يكون نظامًا عمليًا، محليًا، سريعًا، آمنًا، وقابلًا للتوسع.  
قوته ليست في أنه يدعم كل أنواع المحلات من اليوم الأول، بل في أنه يبني أساسًا صحيحًا يمكن توسيعه بثقة.

النسخة الأولى الناجحة ليست التي تحتوي أكبر عدد من الميزات، بل التي تجعل محلًا حقيقيًا يبيع، يطبع، يحفظ المخزون، يدير الديون، يغلق وردية، ويسترجع بياناته بأمان.

هذا هو الفرق بين Demo وبرنامج تجاري حقيقي.
