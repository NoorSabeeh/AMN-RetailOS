namespace AMN.RetailOS.Application.Contracts.Inventory;

public sealed record InventoryPositionSummaryDto(
    Guid ProductId,
    Guid? ProductVariantId,
    Guid LocationId,
    Guid? StockLotId,
    decimal QuantityBase,
    DateOnly? ExpiryDate);

