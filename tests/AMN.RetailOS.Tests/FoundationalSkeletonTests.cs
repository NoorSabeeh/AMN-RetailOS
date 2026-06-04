using System.Xml.Linq;
using AMN.RetailOS.Domain;
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
    public void DomainProjectDoesNotReferenceApiOrInfrastructure()
    {
        var references = ReadProjectReferenceIncludes(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Domain", "AMN.RetailOS.Domain.csproj"));

        Assert.DoesNotContain(references, r => ContainsSegment(r, "AMN.RetailOS.Api"));
        Assert.DoesNotContain(references, r => ContainsSegment(r, "AMN.RetailOS.Infrastructure"));
    }

    [Fact]
    public void ApplicationProjectReferencesDomainOnlyAndNotApi()
    {
        var references = ReadProjectReferenceIncludes(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Application", "AMN.RetailOS.Application.csproj"));

        Assert.Contains(references, r => ContainsSegment(r, "AMN.RetailOS.Domain"));
        Assert.DoesNotContain(references, r => ContainsSegment(r, "AMN.RetailOS.Api"));
    }

    [Fact]
    public void InfrastructureProjectDoesNotReferenceApi()
    {
        var references = ReadProjectReferenceIncludes(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Infrastructure", "AMN.RetailOS.Infrastructure.csproj"));

        Assert.Contains(references, r => ContainsSegment(r, "AMN.RetailOS.Application"));
        Assert.Contains(references, r => ContainsSegment(r, "AMN.RetailOS.Domain"));
        Assert.DoesNotContain(references, r => ContainsSegment(r, "AMN.RetailOS.Api"));
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
