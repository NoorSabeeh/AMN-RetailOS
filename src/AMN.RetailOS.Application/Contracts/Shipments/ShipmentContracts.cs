namespace AMN.RetailOS.Application.Contracts.Shipments;

public sealed record IncomingShipmentSummaryDto(
    Guid Id,
    string ReferenceNumber,
    string Origin,
    DateOnly? ExpectedDate,
    string Status,
    int LineCount);

