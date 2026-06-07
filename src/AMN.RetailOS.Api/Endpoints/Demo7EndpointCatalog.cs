namespace AMN.RetailOS.Api.Endpoints;

public static class Demo7EndpointCatalog
{
    public static readonly string[] RouteGroups =
    [
        "/api/contracts/status",
        "/api/contracts/routes",
        "/api/products",
        "/api/products/{id}",
        "/api/locations",
        "/api/inventory",
        "/api/inventory/summary",
        "/api/shipments",
        "/api/reservations",
        "/api/customers",
        "/api/delivery-orders",
        "/api/delivery-orders/barcode/{barcode}",
        "/api/sales",
        "/api/reports/cod",
        "/api/audit"
    ];
}
