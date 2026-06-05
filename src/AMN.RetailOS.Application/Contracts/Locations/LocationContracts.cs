namespace AMN.RetailOS.Application.Contracts.Locations;

public sealed record LocationSummaryDto(
    Guid Id,
    string Code,
    string Name,
    string LocationType,
    string Status);

