using System.Xml.Linq;
using AMN.RetailOS.Domain.Common;
using AMN.RetailOS.Domain.Inventory;
using AMN.RetailOS.Domain.Store;
using AMN.RetailOS.Infrastructure.Data;
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
}
