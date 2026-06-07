using AMN.RetailOS.Application.Contracts.Audit;
using AMN.RetailOS.Application.Contracts.Customers;
using AMN.RetailOS.Application.Contracts.DeliveryOrders;
using AMN.RetailOS.Application.Contracts.Inventory;
using AMN.RetailOS.Application.Contracts.Locations;
using AMN.RetailOS.Application.Contracts.Products;
using AMN.RetailOS.Application.Contracts.Reports;
using AMN.RetailOS.Application.Contracts.Reservations;
using AMN.RetailOS.Application.Contracts.Shipments;
using AMN.RetailOS.Application.Interfaces;
using AMN.RetailOS.Domain.Common;
using Microsoft.Extensions.DependencyInjection;

namespace AMN.RetailOS.Infrastructure.DemoData;

public static class DemoDataServiceCollectionExtensions
{
    public static IServiceCollection AddDemo7InMemoryQueries(this IServiceCollection services)
    {
        services.AddSingleton<InMemoryDemoDataProvider>();
        services.AddSingleton<IProductCatalogQuery>(provider => provider.GetRequiredService<InMemoryDemoDataProvider>());
        services.AddSingleton<ILocationQuery>(provider => provider.GetRequiredService<InMemoryDemoDataProvider>());
        services.AddSingleton<IInventoryPositionQuery>(provider => provider.GetRequiredService<InMemoryDemoDataProvider>());
        services.AddSingleton<IIncomingShipmentQuery>(provider => provider.GetRequiredService<InMemoryDemoDataProvider>());
        services.AddSingleton<IReservationQuery>(provider => provider.GetRequiredService<InMemoryDemoDataProvider>());
        services.AddSingleton<ICustomerQuery>(provider => provider.GetRequiredService<InMemoryDemoDataProvider>());
        services.AddSingleton<IDeliveryOrderQuery>(provider => provider.GetRequiredService<InMemoryDemoDataProvider>());
        services.AddSingleton<ICodReportQuery>(provider => provider.GetRequiredService<InMemoryDemoDataProvider>());
        services.AddSingleton<IAuditSummaryQuery>(provider => provider.GetRequiredService<InMemoryDemoDataProvider>());
        return services;
    }
}

public sealed class InMemoryDemoDataProvider :
    IProductCatalogQuery,
    ILocationQuery,
    IInventoryPositionQuery,
    IIncomingShipmentQuery,
    IReservationQuery,
    ICustomerQuery,
    IDeliveryOrderQuery,
    ICodReportQuery,
    IAuditSummaryQuery
{
    public static readonly Guid UnitPieceId = Guid.Parse("11111111-1111-1111-1111-111111111111");
    public static readonly Guid ProductLipstickId = Guid.Parse("22222222-2222-2222-2222-222222222222");
    public static readonly Guid ProductSerumId = Guid.Parse("33333333-3333-3333-3333-333333333333");
    public static readonly Guid VariantRoseId = Guid.Parse("44444444-4444-4444-4444-444444444444");
    public static readonly Guid WarehouseLocationId = Guid.Parse("55555555-5555-5555-5555-555555555555");
    public static readonly Guid DisplayLocationId = Guid.Parse("66666666-6666-6666-6666-666666666666");
    public static readonly Guid ShipmentId = Guid.Parse("77777777-7777-7777-7777-777777777777");
    public static readonly Guid CustomerId = Guid.Parse("88888888-8888-8888-8888-888888888888");
    public static readonly Guid ReservationId = Guid.Parse("99999999-9999-9999-9999-999999999999");
    public static readonly Guid DeliveryOrderId = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa");
    public const string SampleDeliveryBarcode = "DEMO-DEL-0001";

    private static readonly ProductDetailDto LipstickDetail = new(
        Id: ProductLipstickId,
        Sku: "DEMO-COS-LIP-001",
        Name: "Demo Matte Lip Color",
        CategoryId: null,
        BaseUnitId: UnitPieceId,
        SalePriceMinor: 12000,
        CostPriceMinor: 7000,
        Status: EntityStatuses.Active,
        Variants:
        [
            new ProductVariantDto(
                Id: VariantRoseId,
                ProductId: ProductLipstickId,
                Name: "Rose Shade",
                OptionName: "shade",
                OptionValue: "rose",
                SkuSuffix: "ROSE",
                Status: EntityStatuses.Active)
        ],
        Images:
        [
            new ProductImageMetadataDto(
                Id: Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                ProductId: ProductLipstickId,
                ProductVariantId: VariantRoseId,
                FileName: "demo-lip-color-rose.jpg",
                ContentType: "image/jpeg",
                StoragePath: "demo/products/demo-lip-color-rose.jpg",
                IsPrimary: true,
                Status: EntityStatuses.Active)
        ]);

    private static readonly ProductDetailDto SerumDetail = new(
        Id: ProductSerumId,
        Sku: "DEMO-COS-SER-001",
        Name: "Demo Vitamin Serum",
        CategoryId: null,
        BaseUnitId: UnitPieceId,
        SalePriceMinor: 25000,
        CostPriceMinor: 16000,
        Status: EntityStatuses.Active,
        Variants: [],
        Images:
        [
            new ProductImageMetadataDto(
                Id: Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                ProductId: ProductSerumId,
                ProductVariantId: null,
                FileName: "demo-vitamin-serum.jpg",
                ContentType: "image/jpeg",
                StoragePath: "demo/products/demo-vitamin-serum.jpg",
                IsPrimary: true,
                Status: EntityStatuses.Active)
        ]);

    private static readonly ProductDetailDto[] ProductDetails = [LipstickDetail, SerumDetail];

    private static readonly LocationSummaryDto[] Locations =
    [
        new(WarehouseLocationId, "WH-01", "Demo Main Warehouse", LocationTypes.Warehouse, EntityStatuses.Active),
        new(DisplayLocationId, "DSP-01", "Demo Showroom Display", LocationTypes.Display, EntityStatuses.Active)
    ];

    private static readonly InventoryPositionSummaryDto[] Inventory =
    [
        new(ProductLipstickId, VariantRoseId, WarehouseLocationId, Guid.Parse("dddddddd-dddd-dddd-dddd-dddddddddddd"), 48, DateOnly.FromDateTime(DateTime.UtcNow.Date.AddMonths(18))),
        new(ProductLipstickId, VariantRoseId, DisplayLocationId, Guid.Parse("eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"), 8, DateOnly.FromDateTime(DateTime.UtcNow.Date.AddMonths(18))),
        new(ProductSerumId, null, WarehouseLocationId, Guid.Parse("ffffffff-ffff-ffff-ffff-ffffffffffff"), 24, DateOnly.FromDateTime(DateTime.UtcNow.Date.AddMonths(12)))
    ];

    private static readonly IncomingShipmentSummaryDto[] Shipments =
    [
        new(ShipmentId, "DEMO-CN-001", "China", DateOnly.FromDateTime(DateTime.UtcNow.Date.AddDays(14)), DocumentStatuses.Expected, 2)
    ];

    private static readonly ReservationSummaryDto[] Reservations =
    [
        new(ReservationId, ProductLipstickId, VariantRoseId, CustomerId, DisplayLocationId, null, ReservationSourceTypes.AvailableStock, 2, DocumentStatuses.Reserved)
    ];

    private static readonly CustomerSummaryDto[] Customers =
    [
        new(CustomerId, "Demo Instagram Customer", "", EntityStatuses.Active)
    ];

    private static readonly DeliveryOrderSummaryDto[] DeliveryOrders =
    [
        new(DeliveryOrderId, null, CustomerId, "instagram", "Demo Delivery Company", DeliveryOrderStatuses.Prepared, 24000)
    ];

    private static readonly AuditEventSummaryDto[] AuditEvents =
    [
        new(Guid.Parse("12121212-1212-1212-1212-121212121212"), null, "demo_price_override_reviewed", "DeliveryOrder", DeliveryOrderId, DateTime.UtcNow.AddMinutes(-30)),
        new(Guid.Parse("13131313-1313-1313-1313-131313131313"), null, "demo_status_changed", "DeliveryOrder", DeliveryOrderId, DateTime.UtcNow.AddMinutes(-15))
    ];

    public Task<IReadOnlyList<ProductSummaryDto>> ListProductsAsync(CancellationToken cancellationToken = default)
    {
        IReadOnlyList<ProductSummaryDto> result = ProductDetails
            .Select(product => new ProductSummaryDto(product.Id, product.Sku, product.Name, product.SalePriceMinor, product.Status))
            .ToArray();

        return Task.FromResult(result);
    }

    public Task<ProductDetailDto?> GetProductAsync(Guid productId, CancellationToken cancellationToken = default)
    {
        return Task.FromResult(ProductDetails.FirstOrDefault(product => product.Id == productId));
    }

    public Task<IReadOnlyList<LocationSummaryDto>> ListLocationsAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyList<LocationSummaryDto>>(Locations);
    }

    public Task<IReadOnlyList<InventoryPositionSummaryDto>> GetInventorySummaryAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyList<InventoryPositionSummaryDto>>(Inventory);
    }

    public Task<IReadOnlyList<IncomingShipmentSummaryDto>> ListIncomingShipmentsAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyList<IncomingShipmentSummaryDto>>(Shipments);
    }

    public Task<IReadOnlyList<ReservationSummaryDto>> ListReservationsAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyList<ReservationSummaryDto>>(Reservations);
    }

    public Task<IReadOnlyList<CustomerSummaryDto>> ListCustomersAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyList<CustomerSummaryDto>>(Customers);
    }

    public Task<IReadOnlyList<DeliveryOrderSummaryDto>> ListDeliveryOrdersAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyList<DeliveryOrderSummaryDto>>(DeliveryOrders);
    }

    public Task<DeliveryBarcodeLookupResponseDto?> GetDeliveryOrderByBarcodeAsync(string barcode, CancellationToken cancellationToken = default)
    {
        if (!string.Equals(barcode, SampleDeliveryBarcode, StringComparison.OrdinalIgnoreCase))
        {
            return Task.FromResult<DeliveryBarcodeLookupResponseDto?>(null);
        }

        var order = DeliveryOrders[0];
        return Task.FromResult<DeliveryBarcodeLookupResponseDto?>(new DeliveryBarcodeLookupResponseDto(
            Barcode: SampleDeliveryBarcode,
            DeliveryOrderId: order.Id,
            DeliveryCompany: order.DeliveryCompany,
            Status: order.Status));
    }

    public Task<CODReportSummaryDto> GetCodReportAsync(CancellationToken cancellationToken = default)
    {
        var report = new CODReportSummaryDto(
            DeliveryCompany: "Demo Delivery Company",
            PeriodStart: DateOnly.FromDateTime(DateTime.UtcNow.Date.AddDays(-7)),
            PeriodEnd: DateOnly.FromDateTime(DateTime.UtcNow.Date),
            ExpectedAmountMinor: 24000,
            CollectedAmountMinor: 0,
            RemainingAmountMinor: 24000,
            Status: CodCollectionStatuses.Pending);

        return Task.FromResult(report);
    }

    public Task<IReadOnlyList<AuditEventSummaryDto>> ListAuditEventsAsync(CancellationToken cancellationToken = default)
    {
        return Task.FromResult<IReadOnlyList<AuditEventSummaryDto>>(AuditEvents);
    }
}
