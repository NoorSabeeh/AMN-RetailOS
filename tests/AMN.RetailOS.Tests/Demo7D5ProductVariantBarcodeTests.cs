using AMN.RetailOS.Application.Contracts.Products;
using AMN.RetailOS.Application.Validation;
using AMN.RetailOS.Domain.Common;
using AMN.RetailOS.Infrastructure.DemoData;
using Xunit;

namespace AMN.RetailOS.Tests;

public sealed class Demo7D5ProductVariantBarcodeTests
{
    private static readonly string RepoRoot = FindRepoRoot();

    [Fact]
    public void ProductVariantBarcodeLookupDtoExistsForClientContracts()
    {
        Assert.Equal(nameof(ProductVariantBarcodeLookupResponseDto), typeof(ProductVariantBarcodeLookupResponseDto).Name);
    }

    [Fact]
    public async Task InMemoryProviderResolvesKnownVariantBarcodeToExactShade()
    {
        var provider = new InMemoryDemoDataProvider();

        var lookup = await provider.GetProductVariantByBarcodeAsync(InMemoryDemoDataProvider.SampleVariantRoseBarcode);

        Assert.NotNull(lookup);
        Assert.Equal(ProductBarcodeMatchTypes.VariantBarcode, lookup.MatchType);
        Assert.Equal(InMemoryDemoDataProvider.ProductLipstickId, lookup.ProductId);
        Assert.Equal(InMemoryDemoDataProvider.VariantRoseId, lookup.VariantId);
        Assert.Equal("rose", lookup.ShadeName);
        Assert.NotEmpty(lookup.Images);
        Assert.NotEmpty(lookup.Inventory);
    }

    [Fact]
    public async Task ProductLevelBarcodeIsSecondaryAndWarnsClientToChooseVariant()
    {
        var provider = new InMemoryDemoDataProvider();

        var lookup = await provider.GetProductVariantByBarcodeAsync(InMemoryDemoDataProvider.SampleProductBarcode);

        Assert.NotNull(lookup);
        Assert.Equal(ProductBarcodeMatchTypes.ProductBarcode, lookup.MatchType);
        Assert.Equal(InMemoryDemoDataProvider.ProductLipstickId, lookup.ProductId);
        Assert.Null(lookup.VariantId);
        Assert.NotNull(lookup.Warning);
        Assert.Contains("variant", lookup.Warning, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task UnknownAndDeliveryBarcodesDoNotResolveAsProductVariantBarcodes()
    {
        var provider = new InMemoryDemoDataProvider();

        var unknownProductBarcode = await provider.GetProductVariantByBarcodeAsync("UNKNOWN-DEMO-BARCODE");
        var deliveryAsProductBarcode = await provider.GetProductVariantByBarcodeAsync(InMemoryDemoDataProvider.SampleDeliveryBarcode);
        var deliveryLookup = await provider.GetDeliveryOrderByBarcodeAsync(InMemoryDemoDataProvider.SampleDeliveryBarcode);

        Assert.Null(unknownProductBarcode);
        Assert.Null(deliveryAsProductBarcode);
        Assert.NotNull(deliveryLookup);
        Assert.Equal(InMemoryDemoDataProvider.DeliveryOrderId, deliveryLookup.DeliveryOrderId);
    }

    [Fact]
    public void ProductBarcodeLookupRouteAndMetadataAreDocumentedInApiSource()
    {
        var catalogSource = File.ReadAllText(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Api", "Endpoints", "Demo7EndpointCatalog.cs"));
        var endpointSource = File.ReadAllText(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Api", "Endpoints", "Demo7ContractEndpoints.cs"));

        Assert.Contains("/api/products/barcode/{barcode}", catalogSource, StringComparison.Ordinal);
        Assert.Contains("GetProductVariantByBarcodeAsync", endpointSource, StringComparison.Ordinal);
        Assert.Contains("product_barcode_not_found", endpointSource, StringComparison.Ordinal);
        Assert.Contains("deliveryBarcodeScope = \"order_level\"", endpointSource, StringComparison.Ordinal);
        Assert.Contains("barcodeScanningImplemented = false", endpointSource, StringComparison.Ordinal);
        Assert.Contains("ApiResponses.NotImplemented", endpointSource, StringComparison.Ordinal);
    }

    [Fact]
    public void BarcodeLookupValidationRejectsEmptyOrTooLongBarcode()
    {
        var empty = Demo7ContractValidators.ValidateBarcodeLookup(" ");
        var tooLong = Demo7ContractValidators.ValidateBarcodeLookup(new string('1', 65));
        var valid = Demo7ContractValidators.ValidateBarcodeLookup(InMemoryDemoDataProvider.SampleVariantRoseBarcode);

        Assert.False(empty.IsValid);
        Assert.False(tooLong.IsValid);
        Assert.True(valid.IsValid);
    }

    [Fact]
    public void Demo7D5DoesNotAddMigrationsOrClientAppProjects()
    {
        Assert.False(Directory.Exists(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Infrastructure", "Migrations")));
        Assert.False(Directory.Exists(Path.Combine(RepoRoot, "apps")));
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
