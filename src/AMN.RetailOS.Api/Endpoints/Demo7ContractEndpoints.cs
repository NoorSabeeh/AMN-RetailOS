using AMN.RetailOS.Api.Responses;

namespace AMN.RetailOS.Api.Endpoints;

public static class Demo7ContractEndpoints
{
    public static WebApplication MapDemo7ContractEndpoints(this WebApplication app)
    {
        app.MapGet("/api/contracts/status", () => Results.Ok(new
        {
            product = "AMN RetailOS",
            phase = "DEMO-7-D2",
            contractVersion = "demo-7-d2",
            implementationStatus = "api_surface_and_validation_baseline_only",
            featuresImplemented = false
        }));

        app.MapGet("/api/contracts/routes", () => Results.Ok(new
        {
            phase = "DEMO-7-D2",
            note = "Route groups are contract-first placeholders. Product behavior is not implemented.",
            routeGroups = Demo7EndpointCatalog.RouteGroups
        }));

        app.MapGroup("/api/products")
            .MapGet("/", () => ApiResponses.NotImplemented("products", "list"));

        app.MapGroup("/api/locations")
            .MapGet("/", () => ApiResponses.NotImplemented("locations", "list"));

        app.MapGroup("/api/inventory")
            .MapGet("/", () => ApiResponses.NotImplemented("inventory", "position"));

        app.MapGroup("/api/shipments")
            .MapGet("/", () => ApiResponses.NotImplemented("shipments", "list"));

        app.MapGroup("/api/reservations")
            .MapGet("/", () => ApiResponses.NotImplemented("reservations", "list"));

        app.MapGroup("/api/customers")
            .MapGet("/", () => ApiResponses.NotImplemented("customers", "list"));

        app.MapGroup("/api/delivery-orders")
            .MapGet("/", () => ApiResponses.NotImplemented("delivery_orders", "list"));

        app.MapGroup("/api/sales")
            .MapGet("/", () => ApiResponses.NotImplemented("sales", "list"));

        app.MapGroup("/api/reports/cod")
            .MapGet("/", () => ApiResponses.NotImplemented("reports.cod", "summary"));

        app.MapGroup("/api/audit")
            .MapGet("/", () => ApiResponses.NotImplemented("audit", "list"));

        return app;
    }
}
