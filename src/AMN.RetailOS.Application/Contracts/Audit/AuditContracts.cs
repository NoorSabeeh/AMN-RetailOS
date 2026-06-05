namespace AMN.RetailOS.Application.Contracts.Audit;

public sealed record AuditEventSummaryDto(
    Guid Id,
    Guid? UserId,
    string Action,
    string EntityName,
    Guid? EntityId,
    DateTime CreatedAtUtc);
