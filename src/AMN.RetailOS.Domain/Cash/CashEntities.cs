using AMN.RetailOS.Domain.Common;
using AMN.RetailOS.Domain.Users;

namespace AMN.RetailOS.Domain.Cash;

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
