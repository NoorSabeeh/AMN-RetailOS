using Xunit;

namespace AMN.RetailOS.Tests;

public sealed class Demo7D4DocumentationAndFeedbackTests
{
    private static readonly string RepoRoot = FindRepoRoot();

    [Fact]
    public void ContractDocumentationExistsAndListsReadOnlyEndpoints()
    {
        var path = Path.Combine(RepoRoot, "docs", "25_DEMO_7_API_CONTRACTS_AND_SMOKE_RESPONSES.md");

        Assert.True(File.Exists(path));

        var content = File.ReadAllText(path);
        Assert.Contains("GET /api/products", content, StringComparison.Ordinal);
        Assert.Contains("GET /api/products/{id}", content, StringComparison.Ordinal);
        Assert.Contains("GET /api/inventory/summary", content, StringComparison.Ordinal);
        Assert.Contains("GET /api/delivery-orders/barcode/{barcode}", content, StringComparison.Ordinal);
        Assert.Contains("GET /api/reports/cod", content, StringComparison.Ordinal);
        Assert.Contains("in-memory demo data", content, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public void Demo7DocsCaptureAndroidActiveAndIphonePostponed()
    {
        var implementationPlan = File.ReadAllText(Path.Combine(RepoRoot, "docs", "24_DEMO_7_IMPLEMENTATION_PLAN.md"));
        var qaPlan = File.ReadAllText(Path.Combine(RepoRoot, "docs", "16_FIELD_FEEDBACK_AND_QA_PLAN.md"));
        var contractDoc = File.ReadAllText(Path.Combine(RepoRoot, "docs", "25_DEMO_7_API_CONTRACTS_AND_SMOKE_RESPONSES.md"));

        Assert.Contains("Android is active in DEMO-7 scope", implementationPlan, StringComparison.Ordinal);
        Assert.Contains("Android is active in DEMO-7 scope", qaPlan, StringComparison.Ordinal);
        Assert.Contains("Android is active in DEMO-7 scope", contractDoc, StringComparison.Ordinal);
        Assert.Contains("iPhone remains postponed", implementationPlan, StringComparison.Ordinal);
        Assert.Contains("iPhone remains postponed", qaPlan, StringComparison.Ordinal);
    }

    [Fact]
    public void Demo7DocsCaptureCodThursdayAndExcelImportPlanning()
    {
        var apiContracts = File.ReadAllText(Path.Combine(RepoRoot, "docs", "14_API_SERVICE_CONTRACTS_DRAFT.md"));
        var qaPlan = File.ReadAllText(Path.Combine(RepoRoot, "docs", "16_FIELD_FEEDBACK_AND_QA_PLAN.md"));
        var contractDoc = File.ReadAllText(Path.Combine(RepoRoot, "docs", "25_DEMO_7_API_CONTRACTS_AND_SMOKE_RESPONSES.md"));

        Assert.Contains("cutOffDay=Thursday", apiContracts, StringComparison.Ordinal);
        Assert.Contains("Thursday cutoff", qaPlan, StringComparison.Ordinal);
        Assert.Contains("cutOffDay=Thursday", contractDoc, StringComparison.Ordinal);
        Assert.Contains("Preview -> Dynamic Column Mapping -> Row Validation -> Commit", qaPlan, StringComparison.Ordinal);
        Assert.Contains("Preview -> Mapping -> Row Validation -> Commit", apiContracts, StringComparison.Ordinal);
    }

    [Fact]
    public void Demo7DocsCaptureAliAndMurtadhaFeedbackTopics()
    {
        var implementationPlan = File.ReadAllText(Path.Combine(RepoRoot, "docs", "24_DEMO_7_IMPLEMENTATION_PLAN.md"));
        var qaPlan = File.ReadAllText(Path.Combine(RepoRoot, "docs", "16_FIELD_FEEDBACK_AND_QA_PLAN.md"));
        var contractDoc = File.ReadAllText(Path.Combine(RepoRoot, "docs", "25_DEMO_7_API_CONTRACTS_AND_SMOKE_RESPONSES.md"));

        Assert.Contains("Variant/Shade barcode", implementationPlan, StringComparison.Ordinal);
        Assert.Contains("Delivery barcode belongs to the whole order", implementationPlan, StringComparison.Ordinal);
        Assert.Contains("StockLot", implementationPlan, StringComparison.Ordinal);
        Assert.Contains("Deposit/down payment is postponed", implementationPlan, StringComparison.Ordinal);
        Assert.Contains("Sale defaults from Display/Showroom", implementationPlan, StringComparison.Ordinal);
        Assert.Contains("Scenario 22 - Variant/Shade Barcode Correctness", qaPlan, StringComparison.Ordinal);
        Assert.Contains("Scenario 23 - Instagram Delivery Order + Delivery Barcode + COD Flow", qaPlan, StringComparison.Ordinal);
        Assert.Contains("Scenario 24 - Price Override + Audit Log", qaPlan, StringComparison.Ordinal);
        Assert.Contains("Delivery company barcode belongs to the whole order", contractDoc, StringComparison.Ordinal);
    }

    [Fact]
    public void ContractMetadataMentionsD4ScopeWithoutEnablingWrites()
    {
        var endpointSource = File.ReadAllText(Path.Combine(RepoRoot, "src", "AMN.RetailOS.Api", "Endpoints", "Demo7ContractEndpoints.cs"));

        Assert.Contains("androidInDemoScope = true", endpointSource, StringComparison.Ordinal);
        Assert.Contains("iphonePostponed = true", endpointSource, StringComparison.Ordinal);
        Assert.Contains("cutOffDay=Thursday", endpointSource, StringComparison.Ordinal);
        Assert.Contains("Excel import is not implemented", endpointSource, StringComparison.Ordinal);
        Assert.Contains("writeOperationsImplemented = false", endpointSource, StringComparison.Ordinal);
        Assert.Contains("ApiResponses.NotImplemented", endpointSource, StringComparison.Ordinal);
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
