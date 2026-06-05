using System.Xml.Linq;
using AMN.RetailOS.Application.Contracts.Audit;
using AMN.RetailOS.Application.Contracts.Common;
using AMN.RetailOS.Application.Contracts.Customers;
using AMN.RetailOS.Application.Contracts.DeliveryOrders;
using AMN.RetailOS.Application.Contracts.Inventory;
using AMN.RetailOS.Application.Contracts.Locations;
using AMN.RetailOS.Application.Contracts.Products;
using AMN.RetailOS.Application.Contracts.Reports;
using AMN.RetailOS.Application.Contracts.Reservations;
using AMN.RetailOS.Application.Contracts.Sales;
using AMN.RetailOS.Application.Contracts.Shipments;
using AMN.RetailOS.Domain.Audit;
using AMN.RetailOS.Domain.Catalog;
using AMN.RetailOS.Domain.Common;
using AMN.RetailOS.Domain.Customers;
using AMN.RetailOS.Domain.Inventory;
using AMN.RetailOS.Domain.Sales;
using AMN.RetailOS.Domain.Store;
using AMN.RetailOS.Domain.Users;
using AMN.RetailOS.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace AMN.RetailOS.Tests;

public sealed class FoundationalSkeletonTests
{
    private static readonly string RepoRoot = FindRepoRoot();

    [Fact]
    public void SolutionAndCoreProjectFilesExist()
    {
        Assert.True(File.Exists(Path.Combine(RepoRoot, "amn-retailos.sln")));
        Assert.True(File.Exists(Path.Combine(RepoRoot, "Directory.Build.props")));
        Assert.True(File.Exists(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Domain", "AMN.RetailOS.Domain.csproj")));
        Assert.True(File.Exists(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Application", "AMN.RetailOS.Application.csproj")));
        Assert.True(File.Exists(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Infrastructure", "AMN.RetailOS.Infrastructure.csproj")));
        Assert.True(File.Exists(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Api", "AMN.RetailOS.Api.csproj")));
        Assert.True(File.Exists(Path.Combine(RepoRoot, "tests", "AMN.RetailOS.Tests", "AMN.RetailOS.Tests.csproj")));
    }

    [Fact]
    public void DomainAssemblyContainsExpectedMarkers()
    {
        Assert.Equal("AMN.RetailOS.Domain", typeof(Store).Assembly.GetName().Name);
        Assert.Equal("retail_grocery", StoreProfileCodes.RetailGrocery);
        Assert.Equal("sale", InventoryMovementTypes.Sale);
        Assert.Equal("active", EntityStatuses.Active);
    }

    [Fact]
    public void DomainProjectDoesNotReferenceApplicationApiOrInfrastructure()
    {
        var references = ReadProjectReferenceIncludes(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Domain", "AMN.RetailOS.Domain.csproj"));

        Assert.DoesNotContain(references, r => ContainsSegment(r, "AMN.RetailOS.Application"));
        Assert.DoesNotContain(references, r => ContainsSegment(r, "AMN.RetailOS.Api"));
        Assert.DoesNotContain(references, r => ContainsSegment(r, "AMN.RetailOS.Infrastructure"));
    }

    [Fact]
    public void ApplicationProjectReferencesDomainOnlyAndNotApiOrInfrastructure()
    {
        var references = ReadProjectReferenceIncludes(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Application", "AMN.RetailOS.Application.csproj"));

        Assert.Contains(references, r => ContainsSegment(r, "AMN.RetailOS.Domain"));
        Assert.DoesNotContain(references, r => ContainsSegment(r, "AMN.RetailOS.Api"));
        Assert.DoesNotContain(references, r => ContainsSegment(r, "AMN.RetailOS.Infrastructure"));
    }

    [Fact]
    public void InfrastructureProjectDoesNotReferenceApi()
    {
        var references = ReadProjectReferenceIncludes(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Infrastructure", "AMN.RetailOS.Infrastructure.csproj"));

        Assert.Contains(references, r => ContainsSegment(r, "AMN.RetailOS.Application"));
        Assert.Contains(references, r => ContainsSegment(r, "AMN.RetailOS.Domain"));
        Assert.DoesNotContain(references, r => ContainsSegment(r, "AMN.RetailOS.Api"));
    }

    [Fact]
    public void ApiProjectMayReferenceApplicationAndInfrastructureAsCompositionRoot()
    {
        var references = ReadProjectReferenceIncludes(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Api", "AMN.RetailOS.Api.csproj"));

        Assert.Contains(references, r => ContainsSegment(r, "AMN.RetailOS.Application"));
        Assert.Contains(references, r => ContainsSegment(r, "AMN.RetailOS.Infrastructure"));
    }

    [Fact]
    public void DomainModelIsSplitIntoFocusedFolders()
    {
        var domainRoot = Path.Combine(RepoRoot, "src", "AMN.RetailOS.Domain");
        var sourceFiles = Directory
            .EnumerateFiles(domainRoot, "*.cs", SearchOption.AllDirectories)
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}bin{Path.DirectorySeparatorChar}", StringComparison.OrdinalIgnoreCase))
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}obj{Path.DirectorySeparatorChar}", StringComparison.OrdinalIgnoreCase))
            .ToArray();

        var relativeFolders = sourceFiles
            .Select(path => Path.GetRelativePath(domainRoot, Path.GetDirectoryName(path)!))
            .Where(folder => folder != ".")
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        Assert.True(sourceFiles.Length >= 10);
        Assert.Contains("Common", relativeFolders);
        Assert.Contains("Catalog", relativeFolders);
        Assert.Contains("Inventory", relativeFolders);
        Assert.Contains("Sales", relativeFolders);
        Assert.Contains("Store", relativeFolders);
    }

    [Fact]
    public void DbContextSkeletonExistsWithoutMigrations()
    {
        Assert.Equal("AMN.RetailOS.Infrastructure", typeof(RetailOSDbContext).Assembly.GetName().Name);
        Assert.True(File.Exists(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Infrastructure", "Data", "RetailOSDbContext.cs")));
        Assert.False(Directory.Exists(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Infrastructure", "Migrations")));
    }

    [Fact]
    public void Demo7DomainModelTypesExist()
    {
        var requiredTypes = new[]
        {
            typeof(Organization),
            typeof(User),
            typeof(Role),
            typeof(Permission),
            typeof(Product),
            typeof(ProductVariant),
            typeof(ProductImage),
            typeof(Location),
            typeof(StockLot),
            typeof(InventoryMovement),
            typeof(IncomingShipment),
            typeof(Reservation),
            typeof(Customer),
            typeof(DeliveryOrder),
            typeof(DeliveryBarcode),
            typeof(Sale),
            typeof(SaleLine),
            typeof(CODCollection),
            typeof(AuditLog)
        };

        Assert.All(requiredTypes, type => Assert.Equal("AMN.RetailOS.Domain", type.Assembly.GetName().Name));
    }

    [Fact]
    public void Demo7ApplicationContractDtoTypesExist()
    {
        var requiredTypes = new[]
        {
            typeof(ProductSummaryDto),
            typeof(ProductDetailDto),
            typeof(CreateProductDraftRequestDto),
            typeof(UpdateProductDraftRequestDto),
            typeof(ProductVariantDto),
            typeof(ProductImageMetadataDto),
            typeof(LocationSummaryDto),
            typeof(InventoryPositionSummaryDto),
            typeof(IncomingShipmentSummaryDto),
            typeof(ReservationSummaryDto),
            typeof(CustomerSummaryDto),
            typeof(DeliveryOrderSummaryDto),
            typeof(DeliveryBarcodeLookupResponseDto),
            typeof(SaleDraftDto),
            typeof(SaleSummaryDto),
            typeof(CODReportSummaryDto),
            typeof(AuditEventSummaryDto),
            typeof(ApiErrorDto),
            typeof(ApiResponseDto<object>),
            typeof(ValidationErrorDto),
            typeof(StandardErrorResponseDto)
        };

        Assert.All(requiredTypes, type =>
        {
            Assert.Equal("AMN.RetailOS.Application", type.Assembly.GetName().Name);
            Assert.StartsWith("AMN.RetailOS.Application.Contracts.", type.Namespace, StringComparison.Ordinal);
        });
    }

    [Fact]
    public void ApplicationContractsStayDtoOnly()
    {
        var contractTypes = typeof(ProductSummaryDto).Assembly
            .GetTypes()
            .Where(type => type.Namespace?.StartsWith("AMN.RetailOS.Application.Contracts.", StringComparison.Ordinal) == true)
            .ToArray();

        Assert.NotEmpty(contractTypes);
        Assert.All(contractTypes, type => Assert.EndsWith("Dto", StripGenericArity(type.Name)));
        Assert.DoesNotContain(contractTypes, type => type.Name.Contains("Service", StringComparison.OrdinalIgnoreCase));
        Assert.DoesNotContain(contractTypes, type => type.Name.Contains("Rule", StringComparison.OrdinalIgnoreCase));
    }

    [Fact]
    public void DbContextExposesDemo7EntitySets()
    {
        var dbSetProperties = typeof(RetailOSDbContext)
            .GetProperties()
            .Where(property => property.PropertyType.IsGenericType)
            .Where(property => property.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>))
            .ToDictionary(
                property => property.PropertyType.GetGenericArguments()[0],
                property => property.Name);

        var requiredEntityTypes = new[]
        {
            typeof(Organization),
            typeof(ProductVariant),
            typeof(ProductImage),
            typeof(Location),
            typeof(StockLot),
            typeof(IncomingShipment),
            typeof(Reservation),
            typeof(DeliveryOrder),
            typeof(DeliveryBarcode),
            typeof(CODCollection)
        };

        Assert.All(requiredEntityTypes, type => Assert.True(dbSetProperties.ContainsKey(type), $"{type.Name} DbSet is missing."));
    }

    [Fact]
    public void Demo7PhaseDoesNotCreateClientAppProjectsOrMigrations()
    {
        Assert.False(Directory.Exists(Path.Combine(RepoRoot, "apps")));
        Assert.False(Directory.Exists(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Infrastructure", "Migrations")));
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

    private static IReadOnlyList<string> ReadProjectReferenceIncludes(string projectPath)
    {
        var xml = XDocument.Load(projectPath);
        var includes = xml
            .Descendants("ProjectReference")
            .Select(node => node.Attribute("Include")?.Value)
            .Where(value => !string.IsNullOrWhiteSpace(value))
            .Select(value => value!.Replace('\\', '/'))
            .ToArray();

        return includes;
    }

    private static bool ContainsSegment(string path, string segment)
    {
        return path.Contains(segment, StringComparison.OrdinalIgnoreCase);
    }

    private static string StripGenericArity(string typeName)
    {
        var arityIndex = typeName.IndexOf('`', StringComparison.Ordinal);
        return arityIndex >= 0 ? typeName[..arityIndex] : typeName;
    }
}
