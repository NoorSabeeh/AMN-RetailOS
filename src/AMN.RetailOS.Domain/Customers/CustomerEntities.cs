using AMN.RetailOS.Domain.Common;

namespace AMN.RetailOS.Domain.Customers;

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
