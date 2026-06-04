using AMN.RetailOS.Domain.Common;

namespace AMN.RetailOS.Domain.Licensing;

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
