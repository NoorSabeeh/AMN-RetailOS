using AMN.RetailOS.Domain.Cash;
using AMN.RetailOS.Domain.Catalog;
using AMN.RetailOS.Domain.Common;
using AMN.RetailOS.Domain.Customers;

namespace AMN.RetailOS.Domain.Sales;

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
    public Guid? ProductVariantId { get; set; }
    public ProductVariant? ProductVariant { get; set; }
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

public sealed class DeliveryOrder : Entity
{
    public Guid? SaleId { get; set; }
    public Sale? Sale { get; set; }
    public Guid? CustomerId { get; set; }
    public Customer? Customer { get; set; }
    public string Channel { get; set; } = "instagram";
    public string DeliveryCompany { get; set; } = string.Empty;
    public string Status { get; set; } = DeliveryOrderStatuses.Draft;
    public long CodAmountMinor { get; set; }
    public ICollection<DeliveryBarcode> Barcodes { get; set; } = new List<DeliveryBarcode>();
}

public sealed class DeliveryBarcode : Entity
{
    public Guid DeliveryOrderId { get; set; }
    public DeliveryOrder DeliveryOrder { get; set; } = null!;
    public string Barcode { get; set; } = string.Empty;
    public string BarcodeType { get; set; } = "delivery_company_order";
}

public sealed class CODCollection : Entity
{
    public string DeliveryCompany { get; set; } = string.Empty;
    public DateOnly CollectionDate { get; set; }
    public long ExpectedAmountMinor { get; set; }
    public long CollectedAmountMinor { get; set; }
    public string Status { get; set; } = CodCollectionStatuses.Pending;
    public string Notes { get; set; } = string.Empty;
}
