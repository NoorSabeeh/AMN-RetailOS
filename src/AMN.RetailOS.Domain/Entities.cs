namespace AMN.RetailOS.Domain;

public abstract class Entity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAtUtc { get; set; }
}

public sealed class Store : Entity
{
    public string Name { get; set; } = string.Empty;
    public string CurrencyCode { get; set; } = "IQD";
    public string Language { get; set; } = "ar";
    public string Status { get; set; } = EntityStatuses.Active;
    public ICollection<StoreProfile> Profiles { get; set; } = new List<StoreProfile>();
}

public sealed class StoreSetting : Entity
{
    public Guid StoreId { get; set; }
    public Store Store { get; set; } = null!;
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}

public sealed class StoreProfile : Entity
{
    public Guid StoreId { get; set; }
    public Store Store { get; set; } = null!;
    public string Code { get; set; } = StoreProfileCodes.RetailGrocery;
    public bool IsEnabled { get; set; } = true;
}

public sealed class Setting : Entity
{
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}

public sealed class User : Entity
{
    public string Username { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Status { get; set; } = EntityStatuses.Active;
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}

public sealed class Role : Entity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}

public sealed class Permission : Entity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
}

public sealed class UserRole
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public Guid RoleId { get; set; }
    public Role Role { get; set; } = null!;
}

public sealed class Session : Entity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public DateTime StartedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? EndedAtUtc { get; set; }
}

public sealed class Category : Entity
{
    public string Name { get; set; } = string.Empty;
    public Guid? ParentCategoryId { get; set; }
    public Category? ParentCategory { get; set; }
    public string Status { get; set; } = EntityStatuses.Active;
}

public sealed class Unit : Entity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Status { get; set; } = EntityStatuses.Active;
}

public sealed class Product : Entity
{
    public Guid? CategoryId { get; set; }
    public Category? Category { get; set; }
    public Guid BaseUnitId { get; set; }
    public Unit BaseUnit { get; set; } = null!;
    public string Sku { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public long SalePriceMinor { get; set; }
    public long CostPriceMinor { get; set; }
    public bool AllowNegativeStock { get; set; }
    public string Status { get; set; } = EntityStatuses.Active;
    public ICollection<ProductBarcode> Barcodes { get; set; } = new List<ProductBarcode>();
}

public sealed class ProductBarcode : Entity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid UnitId { get; set; }
    public Unit Unit { get; set; } = null!;
    public string Barcode { get; set; } = string.Empty;
}

public sealed class ProductUnitConversion : Entity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid FromUnitId { get; set; }
    public Unit FromUnit { get; set; } = null!;
    public Guid ToUnitId { get; set; }
    public Unit ToUnit { get; set; } = null!;
    public decimal Factor { get; set; }
}

public sealed class PriceList : Entity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public string Name { get; set; } = "Default";
    public long PriceMinor { get; set; }
    public string Status { get; set; } = EntityStatuses.Active;
}

public sealed class InventoryMovement : Entity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid UnitId { get; set; }
    public Unit Unit { get; set; } = null!;
    public string MovementType { get; set; } = InventoryMovementTypes.Adjustment;
    public decimal QuantityBase { get; set; }
    public string SourceType { get; set; } = string.Empty;
    public Guid? SourceId { get; set; }
    public Guid? UserId { get; set; }
    public string Reason { get; set; } = string.Empty;
}

public sealed class StockCount : Entity
{
    public string Status { get; set; } = DocumentStatuses.Open;
    public Guid? UserId { get; set; }
    public ICollection<StockCountLine> Lines { get; set; } = new List<StockCountLine>();
}

public sealed class StockCountLine : Entity
{
    public Guid StockCountId { get; set; }
    public StockCount StockCount { get; set; } = null!;
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public decimal CountedQuantityBase { get; set; }
}

public sealed class InvoiceSequence : Entity
{
    public string Code { get; set; } = "SALE";
    public long NextNumber { get; set; } = 1;
    public string Prefix { get; set; } = string.Empty;
}

public sealed class Sale : Entity
{
    public string Status { get; set; } = DocumentStatuses.Draft;
    public Guid? CustomerId { get; set; }
    public Customer? Customer { get; set; }
    public Guid? CashSessionId { get; set; }
    public CashSession? CashSession { get; set; }
    public long TotalMinor { get; set; }
    public string IdempotencyKey { get; set; } = string.Empty;
    public ICollection<SaleLine> Lines { get; set; } = new List<SaleLine>();
}

public sealed class SaleLine : Entity
{
    public Guid SaleId { get; set; }
    public Sale Sale { get; set; } = null!;
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid UnitId { get; set; }
    public Unit Unit { get; set; } = null!;
    public decimal Quantity { get; set; }
    public decimal QuantityBase { get; set; }
    public long UnitPriceMinor { get; set; }
    public long LineTotalMinor { get; set; }
}

public sealed class Invoice : Entity
{
    public Guid SaleId { get; set; }
    public Sale Sale { get; set; } = null!;
    public string InvoiceNumber { get; set; } = string.Empty;
    public string Status { get; set; } = DocumentStatuses.Created;
    public long TotalMinor { get; set; }
}

public sealed class Payment : Entity
{
    public Guid SaleId { get; set; }
    public Sale Sale { get; set; } = null!;
    public string Method { get; set; } = PaymentMethods.Cash;
    public long AmountMinor { get; set; }
    public string IdempotencyKey { get; set; } = string.Empty;
}

public sealed class IdempotencyKey : Entity
{
    public string Key { get; set; } = string.Empty;
    public string Operation { get; set; } = string.Empty;
    public string ResponseJson { get; set; } = string.Empty;
}

public sealed class Customer : Entity
{
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Status { get; set; } = EntityStatuses.Active;
}

public sealed class CustomerAccount : Entity
{
    public Guid CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;
    public string EntryType { get; set; } = LedgerEntryTypes.Debit;
    public long AmountMinor { get; set; }
    public string SourceType { get; set; } = string.Empty;
    public Guid? SourceId { get; set; }
}

public sealed class CustomerPayment : Entity
{
    public Guid CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;
    public long AmountMinor { get; set; }
    public string IdempotencyKey { get; set; } = string.Empty;
}

public sealed class Supplier : Entity
{
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Status { get; set; } = EntityStatuses.Active;
}

public sealed class SupplierAccount : Entity
{
    public Guid SupplierId { get; set; }
    public Supplier Supplier { get; set; } = null!;
    public string EntryType { get; set; } = LedgerEntryTypes.Credit;
    public long AmountMinor { get; set; }
    public string SourceType { get; set; } = string.Empty;
    public Guid? SourceId { get; set; }
}

public sealed class SupplierPayment : Entity
{
    public Guid SupplierId { get; set; }
    public Supplier Supplier { get; set; } = null!;
    public long AmountMinor { get; set; }
    public string IdempotencyKey { get; set; } = string.Empty;
}

public sealed class Purchase : Entity
{
    public Guid SupplierId { get; set; }
    public Supplier Supplier { get; set; } = null!;
    public string Status { get; set; } = DocumentStatuses.Created;
    public long TotalMinor { get; set; }
    public string IdempotencyKey { get; set; } = string.Empty;
    public ICollection<PurchaseLine> Lines { get; set; } = new List<PurchaseLine>();
}

public sealed class PurchaseLine : Entity
{
    public Guid PurchaseId { get; set; }
    public Purchase Purchase { get; set; } = null!;
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid UnitId { get; set; }
    public Unit Unit { get; set; } = null!;
    public decimal Quantity { get; set; }
    public decimal QuantityBase { get; set; }
    public long UnitCostMinor { get; set; }
}

public sealed class CashSession : Entity
{
    public Guid OpenedByUserId { get; set; }
    public User OpenedByUser { get; set; } = null!;
    public DateTime OpenedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? ClosedAtUtc { get; set; }
    public string Status { get; set; } = DocumentStatuses.Open;
    public long OpeningCashMinor { get; set; }
    public long ExpectedCashMinor { get; set; }
    public long? CountedCashMinor { get; set; }
    public string VarianceReason { get; set; } = string.Empty;
}

public sealed class CashMovement : Entity
{
    public Guid CashSessionId { get; set; }
    public CashSession CashSession { get; set; } = null!;
    public string MovementType { get; set; } = string.Empty;
    public long AmountMinor { get; set; }
    public string Reason { get; set; } = string.Empty;
}

public sealed class AuditLog : Entity
{
    public Guid? UserId { get; set; }
    public string Action { get; set; } = string.Empty;
    public string EntityName { get; set; } = string.Empty;
    public Guid? EntityId { get; set; }
    public string DetailsJson { get; set; } = "{}";
}

public sealed class AppLog : Entity
{
    public string Level { get; set; } = "Information";
    public string Message { get; set; } = string.Empty;
    public string DetailsJson { get; set; } = "{}";
}

public sealed class ErrorLog : Entity
{
    public string Message { get; set; } = string.Empty;
    public string StackTrace { get; set; } = string.Empty;
}

public sealed class Backup : Entity
{
    public string DestinationPath { get; set; } = string.Empty;
    public long FileSizeBytes { get; set; }
    public string VerificationStatus { get; set; } = BackupStatuses.Pending;
    public string ErrorMessage { get; set; } = string.Empty;
}

public sealed class License : Entity
{
    public string Status { get; set; } = LicenseStatuses.Unlicensed;
    public string LicensePublicId { get; set; } = string.Empty;
    public DateTime? ExpiresAtUtc { get; set; }
}

public sealed class LicenseEvent : Entity
{
    public string EventType { get; set; } = string.Empty;
    public string DetailsJson { get; set; } = "{}";
}
