using AMN.RetailOS.Domain.Audit;
using AMN.RetailOS.Domain.Backup;
using AMN.RetailOS.Domain.Cash;
using AMN.RetailOS.Domain.Catalog;
using AMN.RetailOS.Domain.Customers;
using AMN.RetailOS.Domain.Inventory;
using AMN.RetailOS.Domain.Licensing;
using AMN.RetailOS.Domain.Sales;
using AMN.RetailOS.Domain.Store;
using AMN.RetailOS.Domain.Suppliers;
using AMN.RetailOS.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace AMN.RetailOS.Infrastructure.Data;

public sealed class RetailOSDbContext(DbContextOptions<RetailOSDbContext> options) : DbContext(options)
{
    public DbSet<Store> Stores => Set<Store>();
    public DbSet<StoreSetting> StoreSettings => Set<StoreSetting>();
    public DbSet<StoreProfile> StoreProfiles => Set<StoreProfile>();
    public DbSet<Setting> Settings => Set<Setting>();

    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Permission> Permissions => Set<Permission>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<Session> Sessions => Set<Session>();

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Unit> Units => Set<Unit>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductBarcode> ProductBarcodes => Set<ProductBarcode>();
    public DbSet<ProductUnitConversion> ProductUnitConversions => Set<ProductUnitConversion>();
    public DbSet<PriceList> PriceLists => Set<PriceList>();

    public DbSet<InventoryMovement> InventoryMovements => Set<InventoryMovement>();
    public DbSet<StockCount> StockCounts => Set<StockCount>();
    public DbSet<StockCountLine> StockCountLines => Set<StockCountLine>();

    public DbSet<InvoiceSequence> InvoiceSequences => Set<InvoiceSequence>();
    public DbSet<Sale> Sales => Set<Sale>();
    public DbSet<SaleLine> SaleLines => Set<SaleLine>();
    public DbSet<Invoice> Invoices => Set<Invoice>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<IdempotencyKey> IdempotencyKeys => Set<IdempotencyKey>();

    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<CustomerAccount> CustomerAccounts => Set<CustomerAccount>();
    public DbSet<CustomerPayment> CustomerPayments => Set<CustomerPayment>();

    public DbSet<Supplier> Suppliers => Set<Supplier>();
    public DbSet<SupplierAccount> SupplierAccounts => Set<SupplierAccount>();
    public DbSet<SupplierPayment> SupplierPayments => Set<SupplierPayment>();
    public DbSet<Purchase> Purchases => Set<Purchase>();
    public DbSet<PurchaseLine> PurchaseLines => Set<PurchaseLine>();

    public DbSet<CashSession> CashSessions => Set<CashSession>();
    public DbSet<CashMovement> CashMovements => Set<CashMovement>();

    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<AppLog> AppLogs => Set<AppLog>();
    public DbSet<ErrorLog> ErrorLogs => Set<ErrorLog>();

    public DbSet<Backup> Backups => Set<Backup>();
    public DbSet<License> Licenses => Set<License>();
    public DbSet<LicenseEvent> LicenseEvents => Set<LicenseEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserRole>().HasKey(userRole => new { userRole.UserId, userRole.RoleId });

        modelBuilder.Entity<Store>().ToTable("stores");
        modelBuilder.Entity<StoreSetting>().ToTable("store_settings");
        modelBuilder.Entity<StoreProfile>().ToTable("store_profiles");
        modelBuilder.Entity<Setting>().ToTable("settings");

        modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<Role>().ToTable("roles");
        modelBuilder.Entity<Permission>().ToTable("permissions");
        modelBuilder.Entity<UserRole>().ToTable("user_roles");
        modelBuilder.Entity<Session>().ToTable("sessions");

        modelBuilder.Entity<Category>().ToTable("categories");
        modelBuilder.Entity<Unit>().ToTable("units");
        modelBuilder.Entity<Product>().ToTable("products");
        modelBuilder.Entity<ProductBarcode>().ToTable("product_barcodes");
        modelBuilder.Entity<ProductUnitConversion>().ToTable("product_unit_conversions");
        modelBuilder.Entity<PriceList>().ToTable("price_lists");

        modelBuilder.Entity<InventoryMovement>().ToTable("inventory_movements");
        modelBuilder.Entity<StockCount>().ToTable("stock_counts");
        modelBuilder.Entity<StockCountLine>().ToTable("stock_count_lines");

        modelBuilder.Entity<InvoiceSequence>().ToTable("invoice_sequences");
        modelBuilder.Entity<Sale>().ToTable("sales");
        modelBuilder.Entity<SaleLine>().ToTable("sale_lines");
        modelBuilder.Entity<Invoice>().ToTable("invoices");
        modelBuilder.Entity<Payment>().ToTable("payments");
        modelBuilder.Entity<IdempotencyKey>().ToTable("idempotency_keys");

        modelBuilder.Entity<Customer>().ToTable("customers");
        modelBuilder.Entity<CustomerAccount>().ToTable("customer_accounts");
        modelBuilder.Entity<CustomerPayment>().ToTable("customer_payments");

        modelBuilder.Entity<Supplier>().ToTable("suppliers");
        modelBuilder.Entity<SupplierAccount>().ToTable("supplier_accounts");
        modelBuilder.Entity<SupplierPayment>().ToTable("supplier_payments");
        modelBuilder.Entity<Purchase>().ToTable("purchases");
        modelBuilder.Entity<PurchaseLine>().ToTable("purchase_lines");

        modelBuilder.Entity<CashSession>().ToTable("cash_sessions");
        modelBuilder.Entity<CashMovement>().ToTable("cash_movements");

        modelBuilder.Entity<AuditLog>().ToTable("audit_logs");
        modelBuilder.Entity<AppLog>().ToTable("app_logs");
        modelBuilder.Entity<ErrorLog>().ToTable("error_logs");

        modelBuilder.Entity<Backup>().ToTable("backups");
        modelBuilder.Entity<License>().ToTable("licenses");
        modelBuilder.Entity<LicenseEvent>().ToTable("license_events");
    }
}
