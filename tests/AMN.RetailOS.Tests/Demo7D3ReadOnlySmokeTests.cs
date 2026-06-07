using System.Reflection;
using AMN.RetailOS.Application.Interfaces;
using AMN.RetailOS.Infrastructure.DemoData;
using Xunit;

namespace AMN.RetailOS.Tests;

public sealed class Demo7D3ReadOnlySmokeTests
{
    private static readonly string RepoRoot = FindRepoRoot();

    [Fact]
    public void ApplicationQueryInterfacesAreReadOnly()
    {
        var queryInterfaces = new[]
        {
            typeof(IProductCatalogQuery),
            typeof(ILocationQuery),
            typeof(IInventoryPositionQuery),
            typeof(IIncomingShipmentQuery),
            typeof(IReservationQuery),
            typeof(ICustomerQuery),
            typeof(IDeliveryOrderQuery),
            typeof(ICodReportQuery),
            typeof(IAuditSummaryQuery)
        };

        Assert.All(queryInterfaces, queryInterface =>
        {
            Assert.True(queryInterface.IsInterface);
            Assert.All(queryInterface.GetMethods(), method =>
            {
                Assert.True(method.Name.StartsWith("List", StringComparison.Ordinal) || method.Name.StartsWith("Get", StringComparison.Ordinal));
                Assert.True(method.ReturnType.IsGenericType);
                Assert.Equal(typeof(Task<>), method.ReturnType.GetGenericTypeDefinition());
                Assert.DoesNotContain("Create", method.Name, StringComparison.OrdinalIgnoreCase);
                Assert.DoesNotContain("Update", method.Name, StringComparison.OrdinalIgnoreCase);
                Assert.DoesNotContain("Delete", method.Name, StringComparison.OrdinalIgnoreCase);
                Assert.DoesNotContain("Commit", method.Name, StringComparison.OrdinalIgnoreCase);
                Assert.DoesNotContain("Settle", method.Name, StringComparison.OrdinalIgnoreCase);
            });
        });
    }

    [Fact]
    public async Task InMemoryProviderReturnsNonEmptyReadOnlySampleData()
    {
        var provider = new InMemoryDemoDataProvider();

        Assert.NotEmpty(await provider.ListProductsAsync());
        Assert.NotEmpty(await provider.ListLocationsAsync());
        Assert.NotEmpty(await provider.GetInventorySummaryAsync());
        Assert.NotEmpty(await provider.ListIncomingShipmentsAsync());
        Assert.NotEmpty(await provider.ListReservationsAsync());
        Assert.NotEmpty(await provider.ListCustomersAsync());
        Assert.NotEmpty(await provider.ListDeliveryOrdersAsync());
        Assert.NotEmpty(await provider.ListAuditEventsAsync());
    }

    [Fact]
    public async Task InMemoryProviderSupportsProductDetailAndDeliveryBarcodeLookup()
    {
        var provider = new InMemoryDemoDataProvider();

        var product = await provider.GetProductAsync(InMemoryDemoDataProvider.ProductLipstickId);
        var deliveryBarcode = await provider.GetDeliveryOrderByBarcodeAsync(InMemoryDemoDataProvider.SampleDeliveryBarcode);
        var unknownBarcode = await provider.GetDeliveryOrderByBarcodeAsync("UNKNOWN-DEMO-BARCODE");

        Assert.NotNull(product);
        Assert.NotEmpty(product.Variants);
        Assert.NotEmpty(product.Images);
        Assert.NotNull(deliveryBarcode);
        Assert.Equal(InMemoryDemoDataProvider.DeliveryOrderId, deliveryBarcode.DeliveryOrderId);
        Assert.Null(unknownBarcode);
    }

    [Fact]
    public async Task CodReportReturnsDemoPendingCollectionTotals()
    {
        var provider = new InMemoryDemoDataProvider();

        var report = await provider.GetCodReportAsync();

        Assert.True(report.ExpectedAmountMinor > 0);
        Assert.True(report.RemainingAmountMinor >= 0);
        Assert.Equal(report.ExpectedAmountMinor - report.CollectedAmountMinor, report.RemainingAmountMinor);
    }

    [Fact]
    public void ReadOnlyEndpointsAreListedAndWritesRemainNotImplemented()
    {
        var catalogSource = File.ReadAllText(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Api", "Endpoints", "Demo7EndpointCatalog.cs"));
        var endpointSource = File.ReadAllText(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Api", "Endpoints", "Demo7ContractEndpoints.cs"));

        string[] readOnlyRoutes =
        [
            "/api/products/{id}",
            "/api/inventory/summary",
            "/api/delivery-orders/barcode/{barcode}",
            "/api/reports/cod",
            "/api/audit"
        ];

        Assert.All(readOnlyRoutes, route => Assert.Contains(route, catalogSource, StringComparison.Ordinal));
        Assert.Contains("readOnlySmokeEndpointsAvailable = true", endpointSource, StringComparison.Ordinal);
        Assert.Contains("writeOperationsImplemented = false", endpointSource, StringComparison.Ordinal);
        Assert.Contains("MapPost", endpointSource, StringComparison.Ordinal);
        Assert.Contains("MapPatch", endpointSource, StringComparison.Ordinal);
        Assert.Contains("ApiResponses.NotImplemented", endpointSource, StringComparison.Ordinal);
    }

    [Fact]
    public void Demo7D3DoesNotAddMigrationsAppProjectsOrCloudConfiguration()
    {
        Assert.False(Directory.Exists(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Infrastructure", "Migrations")));
        Assert.False(Directory.Exists(Path.Combine(RepoRoot, "apps")));

        var sourceFiles = Directory
            .EnumerateFiles(Path.Combine(RepoRoot, "src"), "*.cs", SearchOption.AllDirectories)
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}bin{Path.DirectorySeparatorChar}", StringComparison.OrdinalIgnoreCase))
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}obj{Path.DirectorySeparatorChar}", StringComparison.OrdinalIgnoreCase))
            .ToArray();

        Assert.DoesNotContain(sourceFiles, path => Path.GetFileName(path).Contains("Migration", StringComparison.OrdinalIgnoreCase));
        Assert.DoesNotContain(sourceFiles, path => File.ReadAllText(path).Contains("Supabase", StringComparison.OrdinalIgnoreCase));
        Assert.DoesNotContain(sourceFiles, path => File.ReadAllText(path).Contains("Firebase", StringComparison.OrdinalIgnoreCase));
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
