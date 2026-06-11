using AMN.RetailOS.Api.Responses;
using AMN.RetailOS.Application.Interfaces;
using AMN.RetailOS.Application.Validation;

namespace AMN.RetailOS.Api.Endpoints;

public static class Demo7ContractEndpoints
{
    public static WebApplication MapDemo7ContractEndpoints(this WebApplication app)
    {
        app.MapGet("/api/contracts/status", () => Results.Ok(new
        {
            product = "AMN RetailOS",
            phase = "DEMO-7-D5",
            contractVersion = "demo-7-d5",
            implementationStatus = "read_only_smoke_endpoints_with_product_variant_barcode_lookup",
            readOnlySmokeEndpointsAvailable = true,
            productVariantBarcodeLookupAvailable = true,
            deliveryBarcodeScope = "order_level",
            barcodeScanningImplemented = false,
            writeOperationsImplemented = false,
            persistenceMode = "in_memory_demo_data",
            databaseMigrationsAdded = false,
            cloudConfigAdded = false,
            androidInDemoScope = true,
            iphonePostponed = true,
            codCutoffPlanning = "Thursday cutoff must be supported in future COD reporting.",
            excelImportStatus = "postponed; future flow is Preview -> Mapping -> Row Validation -> Commit",
            productionReady = false
        }));

        app.MapGet("/api/contracts/routes", () => Results.Ok(new
        {
            phase = "DEMO-7-D5",
            note = "GET routes are read-only smoke endpoints backed by in-memory demo data. Product variant barcode lookup is read-only. Delivery barcode remains order-level. Write operations are not implemented.",
            androidScope = "Android is active for DEMO-7 planning.",
            iphoneScope = "iPhone is postponed.",
            productBarcodeScope = "Variant/Shade barcode is primary for cosmetics lookup; product-level barcode is optional/secondary.",
            deliveryBarcodeScope = "Delivery barcode belongs to the whole delivery order.",
            barcodeScanningStatus = "Camera/image barcode scanning is not implemented.",
            codCutoffPlanning = "Future COD report contract should support cutOffDay=Thursday.",
            excelImportStatus = "Excel import is not implemented.",
            routeGroups = Demo7EndpointCatalog.RouteGroups
        }));

        var products = app.MapGroup("/api/products");
        products.MapGet("/", async (IProductCatalogQuery query, CancellationToken cancellationToken) =>
            ApiResponses.Success(await query.ListProductsAsync(cancellationToken)));
        products.MapGet("/barcode/{barcode}", async (string barcode, IProductCatalogQuery query, CancellationToken cancellationToken) =>
        {
            var validation = Demo7ContractValidators.ValidateBarcodeLookup(barcode);
            if (!validation.IsValid)
            {
                return ApiResponses.ValidationFailed(validation.Errors);
            }

            var result = await query.GetProductVariantByBarcodeAsync(barcode, cancellationToken);
            return result is null
                ? ApiResponses.NotFound("product_barcode_not_found", "Product variant barcode was not found in DEMO-7 in-memory sample data.")
                : ApiResponses.Success(result);
        });
        products.MapGet("/{id:guid}", async (Guid id, IProductCatalogQuery query, CancellationToken cancellationToken) =>
        {
            var product = await query.GetProductAsync(id, cancellationToken);
            return product is null
                ? ApiResponses.NotFound("product_not_found", "Product was not found in DEMO-7 in-memory sample data.")
                : ApiResponses.Success(product);
        });
        products.MapPost("/", () => ApiResponses.NotImplemented("products", "create"));
        products.MapPut("/{id:guid}", () => ApiResponses.NotImplemented("products", "update"));

        var locations = app.MapGroup("/api/locations");
        locations.MapGet("/", async (ILocationQuery query, CancellationToken cancellationToken) =>
            ApiResponses.Success(await query.ListLocationsAsync(cancellationToken)));
        locations.MapPost("/", () => ApiResponses.NotImplemented("locations", "create"));

        var inventory = app.MapGroup("/api/inventory");
        inventory.MapGet("/summary", async (IInventoryPositionQuery query, CancellationToken cancellationToken) =>
            ApiResponses.Success(await query.GetInventorySummaryAsync(cancellationToken)));
        inventory.MapPost("/movements", () => ApiResponses.NotImplemented("inventory", "create_movement"));

        var shipments = app.MapGroup("/api/shipments");
        shipments.MapGet("/", async (IIncomingShipmentQuery query, CancellationToken cancellationToken) =>
            ApiResponses.Success(await query.ListIncomingShipmentsAsync(cancellationToken)));
        shipments.MapPost("/", () => ApiResponses.NotImplemented("shipments", "create"));

        var reservations = app.MapGroup("/api/reservations");
        reservations.MapGet("/", async (IReservationQuery query, CancellationToken cancellationToken) =>
            ApiResponses.Success(await query.ListReservationsAsync(cancellationToken)));
        reservations.MapPost("/", () => ApiResponses.NotImplemented("reservations", "create"));
        reservations.MapPatch("/{id:guid}", () => ApiResponses.NotImplemented("reservations", "update"));

        var customers = app.MapGroup("/api/customers");
        customers.MapGet("/", async (ICustomerQuery query, CancellationToken cancellationToken) =>
            ApiResponses.Success(await query.ListCustomersAsync(cancellationToken)));
        customers.MapPost("/", () => ApiResponses.NotImplemented("customers", "create"));

        var deliveryOrders = app.MapGroup("/api/delivery-orders");
        deliveryOrders.MapGet("/", async (IDeliveryOrderQuery query, CancellationToken cancellationToken) =>
            ApiResponses.Success(await query.ListDeliveryOrdersAsync(cancellationToken)));
        deliveryOrders.MapGet("/barcode/{barcode}", async (string barcode, IDeliveryOrderQuery query, CancellationToken cancellationToken) =>
        {
            var result = await query.GetDeliveryOrderByBarcodeAsync(barcode, cancellationToken);
            return result is null
                ? ApiResponses.NotFound("delivery_barcode_not_found", "Delivery barcode was not found in DEMO-7 in-memory sample data.")
                : ApiResponses.Success(result);
        });
        deliveryOrders.MapPost("/", () => ApiResponses.NotImplemented("delivery_orders", "create"));
        deliveryOrders.MapPatch("/{id:guid}/status", () => ApiResponses.NotImplemented("delivery_orders", "update_status"));

        var sales = app.MapGroup("/api/sales");
        sales.MapGet("/", () => ApiResponses.NotImplemented("sales", "list"));
        sales.MapPost("/commit", () => ApiResponses.NotImplemented("sales", "commit"));

        app.MapGroup("/api/reports/cod")
            .MapGet("/", async (ICodReportQuery query, CancellationToken cancellationToken) =>
                ApiResponses.Success(await query.GetCodReportAsync(cancellationToken)));

        app.MapGroup("/api/audit")
            .MapGet("/", async (IAuditSummaryQuery query, CancellationToken cancellationToken) =>
                ApiResponses.Success(await query.ListAuditEventsAsync(cancellationToken)));

        return app;
    }
}
