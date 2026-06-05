namespace AMN.RetailOS.Application.Contracts.Reservations;

public sealed record ReservationSummaryDto(
    Guid Id,
    Guid ProductId,
    Guid? ProductVariantId,
    Guid? CustomerId,
    Guid? LocationId,
    Guid? IncomingShipmentId,
    string SourceType,
    decimal QuantityBase,
    string Status);

