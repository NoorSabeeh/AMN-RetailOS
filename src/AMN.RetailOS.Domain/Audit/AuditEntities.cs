using AMN.RetailOS.Domain.Common;

namespace AMN.RetailOS.Domain.Audit;

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
