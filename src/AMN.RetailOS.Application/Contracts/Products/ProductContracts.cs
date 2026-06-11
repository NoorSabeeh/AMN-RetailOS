using AMN.RetailOS.Application.Contracts.Inventory;

namespace AMN.RetailOS.Application.Contracts.Products;

public sealed record ProductSummaryDto(
    Guid Id,
    string Sku,
    string Name,
    long SalePriceMinor,
    string Status);

public sealed record ProductDetailDto(
    Guid Id,
    string Sku,
    string Name,
    Guid? CategoryId,
    Guid BaseUnitId,
    long SalePriceMinor,
    long CostPriceMinor,
    string Status,
    IReadOnlyList<ProductVariantDto> Variants,
    IReadOnlyList<ProductImageMetadataDto> Images);

public sealed record CreateProductDraftRequestDto(
    string Sku,
    string Name,
    Guid? CategoryId,
    Guid BaseUnitId,
    long SalePriceMinor,
    long CostPriceMinor);

public sealed record UpdateProductDraftRequestDto(
    Guid ProductId,
    string Sku,
    string Name,
    Guid? CategoryId,
    Guid BaseUnitId,
    long SalePriceMinor,
    long CostPriceMinor,
    string Status);

public sealed record ProductVariantDto(
    Guid Id,
    Guid ProductId,
    string Name,
    string OptionName,
    string OptionValue,
    string Sku,
    string SkuSuffix,
    string Barcode,
    string Status);

public sealed record ProductImageMetadataDto(
    Guid Id,
    Guid ProductId,
    Guid? ProductVariantId,
    string FileName,
    string ContentType,
    string StoragePath,
    bool IsPrimary,
    string Status);

public sealed record ProductVariantBarcodeLookupResponseDto(
    string Barcode,
    string MatchType,
    Guid? ProductId,
    string? ProductName,
    Guid? VariantId,
    string? VariantName,
    string? ShadeName,
    string? Sku,
    IReadOnlyList<ProductImageMetadataDto> Images,
    IReadOnlyList<InventoryPositionSummaryDto> Inventory,
    string? Warning);
