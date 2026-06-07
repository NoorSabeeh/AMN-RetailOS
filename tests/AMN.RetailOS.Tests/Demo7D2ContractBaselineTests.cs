using AMN.RetailOS.Application.Contracts.Customers;
using AMN.RetailOS.Application.Contracts.DeliveryOrders;
using AMN.RetailOS.Application.Contracts.Locations;
using AMN.RetailOS.Application.Contracts.Products;
using AMN.RetailOS.Application.Contracts.Reservations;
using AMN.RetailOS.Application.Contracts.Sales;
using AMN.RetailOS.Application.Contracts.Shipments;
using AMN.RetailOS.Application.Validation;
using AMN.RetailOS.Domain.Common;
using Xunit;

namespace AMN.RetailOS.Tests;

public sealed class Demo7D2ContractBaselineTests
{
    private static readonly string RepoRoot = FindRepoRoot();

    [Fact]
    public void ProductValidationRejectsMissingNameAndNegativePrices()
    {
        var request = new CreateProductDraftRequestDto(
            Sku: "COS-001",
            Name: " ",
            CategoryId: null,
            BaseUnitId: Guid.Empty,
            SalePriceMinor: -1,
            CostPriceMinor: -1);

        var result = Demo7ContractValidators.Validate(request);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, error => error.Field == nameof(request.Name));
        Assert.Contains(result.Errors, error => error.Field == nameof(request.BaseUnitId));
        Assert.Contains(result.Errors, error => error.Field == nameof(request.SalePriceMinor));
        Assert.Contains(result.Errors, error => error.Field == nameof(request.CostPriceMinor));
    }

    [Fact]
    public void ValidationRejectsNegativeQuantityAndPrices()
    {
        var request = new SaleDraftDto(
            CustomerId: null,
            Lines:
            [
                new SaleDraftLineDto(
                    ProductId: Guid.NewGuid(),
                    ProductVariantId: null,
                    UnitId: Guid.NewGuid(),
                    Quantity: 0,
                    UnitPriceMinor: -1)
            ],
            PriceOverrideTotalMinor: -1,
            PriceOverrideReason: string.Empty);

        var result = Demo7ContractValidators.Validate(request);

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, error => error.Field.Contains(nameof(SaleDraftLineDto.Quantity), StringComparison.Ordinal));
        Assert.Contains(result.Errors, error => error.Field.Contains(nameof(SaleDraftLineDto.UnitPriceMinor), StringComparison.Ordinal));
        Assert.Contains(result.Errors, error => error.Field == nameof(request.PriceOverrideTotalMinor));
    }

    [Fact]
    public void ValidationRejectsUnknownLocationReservationAndDeliveryValues()
    {
        var location = Demo7ContractValidators.Validate(new LocationSummaryDto(
            Id: Guid.NewGuid(),
            Code: "L1",
            Name: "Main",
            LocationType: "unknown",
            Status: EntityStatuses.Active));

        var reservation = Demo7ContractValidators.Validate(new ReservationSummaryDto(
            Id: Guid.NewGuid(),
            ProductId: Guid.NewGuid(),
            ProductVariantId: null,
            CustomerId: null,
            LocationId: null,
            IncomingShipmentId: null,
            SourceType: "unknown",
            QuantityBase: 1,
            Status: DocumentStatuses.Reserved));

        var deliveryOrder = Demo7ContractValidators.Validate(new DeliveryOrderSummaryDto(
            Id: Guid.NewGuid(),
            SaleId: null,
            CustomerId: null,
            Channel: "instagram",
            DeliveryCompany: "demo",
            Status: "unknown",
            CodAmountMinor: 0));

        Assert.False(location.IsValid);
        Assert.False(reservation.IsValid);
        Assert.False(deliveryOrder.IsValid);
    }

    [Fact]
    public void ValidationAcceptsMinimalValidExamples()
    {
        var product = Demo7ContractValidators.Validate(new CreateProductDraftRequestDto(
            Sku: "COS-001",
            Name: "Lipstick",
            CategoryId: null,
            BaseUnitId: Guid.NewGuid(),
            SalePriceMinor: 1000,
            CostPriceMinor: 700));

        var variant = Demo7ContractValidators.Validate(new ProductVariantDto(
            Id: Guid.NewGuid(),
            ProductId: Guid.NewGuid(),
            Name: "Shade 01",
            OptionName: "shade",
            OptionValue: "01",
            SkuSuffix: "01",
            Status: EntityStatuses.Active));

        var image = Demo7ContractValidators.Validate(new ProductImageMetadataDto(
            Id: Guid.NewGuid(),
            ProductId: Guid.NewGuid(),
            ProductVariantId: null,
            FileName: "product.jpg",
            ContentType: "image/jpeg",
            StoragePath: "products/product.jpg",
            IsPrimary: true,
            Status: EntityStatuses.Active));

        var location = Demo7ContractValidators.Validate(new LocationSummaryDto(
            Id: Guid.NewGuid(),
            Code: "WH",
            Name: "Warehouse",
            LocationType: LocationTypes.Warehouse,
            Status: EntityStatuses.Active));

        var reservation = Demo7ContractValidators.Validate(new ReservationSummaryDto(
            Id: Guid.NewGuid(),
            ProductId: Guid.NewGuid(),
            ProductVariantId: null,
            CustomerId: null,
            LocationId: Guid.NewGuid(),
            IncomingShipmentId: null,
            SourceType: ReservationSourceTypes.AvailableStock,
            QuantityBase: 1,
            Status: DocumentStatuses.Reserved));

        var delivery = Demo7ContractValidators.Validate(new DeliveryOrderSummaryDto(
            Id: Guid.NewGuid(),
            SaleId: null,
            CustomerId: null,
            Channel: "instagram",
            DeliveryCompany: "demo",
            Status: DeliveryOrderStatuses.Draft,
            CodAmountMinor: 1000));

        var sale = Demo7ContractValidators.Validate(new SaleDraftDto(
            CustomerId: null,
            Lines:
            [
                new SaleDraftLineDto(
                    ProductId: Guid.NewGuid(),
                    ProductVariantId: null,
                    UnitId: Guid.NewGuid(),
                    Quantity: 1,
                    UnitPriceMinor: 1000)
            ],
            PriceOverrideTotalMinor: 0,
            PriceOverrideReason: string.Empty));

        var shipment = Demo7ContractValidators.Validate(new IncomingShipmentSummaryDto(
            Id: Guid.NewGuid(),
            ReferenceNumber: "CN-001",
            Origin: "China",
            ExpectedDate: null,
            Status: DocumentStatuses.Expected,
            LineCount: 1));

        var customer = Demo7ContractValidators.Validate(new CustomerSummaryDto(
            Id: Guid.NewGuid(),
            Name: "Customer",
            Phone: "",
            Status: EntityStatuses.Active));

        Assert.All(
            [product, variant, image, location, reservation, delivery, sale, shipment, customer],
            result => Assert.True(result.IsValid));
    }

    [Fact]
    public void DeliveryBarcodeAssignmentRejectsEmptyBarcode()
    {
        var result = Demo7ContractValidators.ValidateDeliveryBarcodeAssignment(" ");

        Assert.False(result.IsValid);
        Assert.Contains(result.Errors, error => error.Field == "Barcode");
    }

    [Fact]
    public void ApiRouteSurfaceDefinesRequiredDemo7RouteGroups()
    {
        var source = File.ReadAllText(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Api", "Endpoints", "Demo7EndpointCatalog.cs"));

        string[] requiredRoutes =
        [
            "/api/contracts/status",
            "/api/products",
            "/api/locations",
            "/api/inventory",
            "/api/shipments",
            "/api/reservations",
            "/api/customers",
            "/api/delivery-orders",
            "/api/sales",
            "/api/reports/cod",
            "/api/audit"
        ];

        Assert.All(requiredRoutes, route => Assert.Contains(route, source, StringComparison.Ordinal));
    }

    [Fact]
    public void ApiPlaceholdersReturnDocumentedNotImplementedResponses()
    {
        var source = File.ReadAllText(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Api", "Endpoints", "Demo7ContractEndpoints.cs"));
        var responseSource = File.ReadAllText(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Api", "Responses", "ApiResponses.cs"));

        Assert.Contains("ApiResponses.NotImplemented", source, StringComparison.Ordinal);
        Assert.Contains("Status501NotImplemented", responseSource, StringComparison.Ordinal);
        Assert.Contains("writeOperationsImplemented = false", source, StringComparison.Ordinal);
    }

    private static string FindRepoRoot()
    {
        var cursor = new DirectoryInfo(AppContext.BaseDirectory);
        while (cursor is not null)
        {
            if (File.Exists(Path.Combine(cursor.FullName, "amn-retailos.sln")))
            {
                return cursor.FullName;
            }

            cursor = cursor.Parent;
        }

        throw new InvalidOperationException("Repository root not found from test runtime path.");
    }
}
