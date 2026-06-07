using AMN.RetailOS.Application.Contracts.Audit;
using AMN.RetailOS.Application.Contracts.Customers;
using AMN.RetailOS.Application.Contracts.DeliveryOrders;
using AMN.RetailOS.Application.Contracts.Inventory;
using AMN.RetailOS.Application.Contracts.Locations;
using AMN.RetailOS.Application.Contracts.Products;
using AMN.RetailOS.Application.Contracts.Reports;
using AMN.RetailOS.Application.Contracts.Reservations;
using AMN.RetailOS.Application.Contracts.Shipments;

namespace AMN.RetailOS.Application.Interfaces;

public interface IProductCatalogQuery
{
    Task<IReadOnlyList<ProductSummaryDto>> ListProductsAsync(CancellationToken cancellationToken = default);

    Task<ProductDetailDto?> GetProductAsync(Guid productId, CancellationToken cancellationToken = default);
}

public interface ILocationQuery
{
    Task<IReadOnlyList<LocationSummaryDto>> ListLocationsAsync(CancellationToken cancellationToken = default);
}

public interface IInventoryPositionQuery
{
    Task<IReadOnlyList<InventoryPositionSummaryDto>> GetInventorySummaryAsync(CancellationToken cancellationToken = default);
}

public interface IIncomingShipmentQuery
{
    Task<IReadOnlyList<IncomingShipmentSummaryDto>> ListIncomingShipmentsAsync(CancellationToken cancellationToken = default);
}

public interface IReservationQuery
{
    Task<IReadOnlyList<ReservationSummaryDto>> ListReservationsAsync(CancellationToken cancellationToken = default);
}

public interface ICustomerQuery
{
    Task<IReadOnlyList<CustomerSummaryDto>> ListCustomersAsync(CancellationToken cancellationToken = default);
}

public interface IDeliveryOrderQuery
{
    Task<IReadOnlyList<DeliveryOrderSummaryDto>> ListDeliveryOrdersAsync(CancellationToken cancellationToken = default);

    Task<DeliveryBarcodeLookupResponseDto?> GetDeliveryOrderByBarcodeAsync(string barcode, CancellationToken cancellationToken = default);
}

public interface ICodReportQuery
{
    Task<CODReportSummaryDto> GetCodReportAsync(CancellationToken cancellationToken = default);
}

public interface IAuditSummaryQuery
{
    Task<IReadOnlyList<AuditEventSummaryDto>> ListAuditEventsAsync(CancellationToken cancellationToken = default);
}
