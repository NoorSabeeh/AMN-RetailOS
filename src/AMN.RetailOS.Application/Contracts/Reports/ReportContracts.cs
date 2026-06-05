namespace AMN.RetailOS.Application.Contracts.Reports;

public sealed record CODReportSummaryDto(
    string DeliveryCompany,
    DateOnly PeriodStart,
    DateOnly PeriodEnd,
    long ExpectedAmountMinor,
    long CollectedAmountMinor,
    long RemainingAmountMinor,
    string Status);

