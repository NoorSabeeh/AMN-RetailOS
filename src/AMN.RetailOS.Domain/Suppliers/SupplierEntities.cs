using AMN.RetailOS.Domain.Catalog;
using AMN.RetailOS.Domain.Common;

namespace AMN.RetailOS.Domain.Suppliers;

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
