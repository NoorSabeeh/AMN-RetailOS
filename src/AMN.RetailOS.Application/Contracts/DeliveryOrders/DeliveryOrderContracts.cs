namespace AMN.RetailOS.Application.Contracts.DeliveryOrders;

public sealed record DeliveryOrderSummaryDto(
    Guid Id,
    Guid? SaleId,
    Guid? CustomerId,
    string Channel,
    string DeliveryCompany,
    string Status,
    long CodAmountMinor);

public sealed record DeliveryBarcodeLookupResponseDto(
    string Barcode,
    Guid? DeliveryOrderId,
    string? DeliveryCompany,
    string? Status);

