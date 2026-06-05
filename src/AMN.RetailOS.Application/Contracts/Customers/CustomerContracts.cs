namespace AMN.RetailOS.Application.Contracts.Customers;

public sealed record CustomerSummaryDto(
    Guid Id,
    string Name,
    string Phone,
    string Status);

