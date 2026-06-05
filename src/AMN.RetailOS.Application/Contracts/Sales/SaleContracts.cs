namespace AMN.RetailOS.Application.Contracts.Sales;

public sealed record SaleDraftDto(
    Guid? CustomerId,
    IReadOnlyList<SaleDraftLineDto> Lines,
    long PriceOverrideTotalMinor,
    string PriceOverrideReason);

public sealed record SaleDraftLineDto(
    Guid ProductId,
    Guid? ProductVariantId,
    Guid UnitId,
    decimal Quantity,
    long UnitPriceMinor);

public sealed record SaleSummaryDto(
    Guid Id,
    Guid? CustomerId,
    string Status,
    long TotalMinor,
    int LineCount);

