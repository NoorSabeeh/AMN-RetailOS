using AMN.RetailOS.Domain.Catalog;
using AMN.RetailOS.Domain.Common;

namespace AMN.RetailOS.Domain.Inventory;

public sealed class Location : Entity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string LocationType { get; set; } = LocationTypes.Warehouse;
    public string Status { get; set; } = EntityStatuses.Active;
}

public sealed class StockLot : Entity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid? ProductVariantId { get; set; }
    public ProductVariant? ProductVariant { get; set; }
    public Guid LocationId { get; set; }
    public Location Location { get; set; } = null!;
    public string LotCode { get; set; } = string.Empty;
    public DateOnly? ExpiryDate { get; set; }
    public decimal QuantityBase { get; set; }
    public string Status { get; set; } = EntityStatuses.Active;
}

public sealed class InventoryMovement : Entity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid? ProductVariantId { get; set; }
    public ProductVariant? ProductVariant { get; set; }
    public Guid UnitId { get; set; }
    public Unit Unit { get; set; } = null!;
    public Guid? LocationId { get; set; }
    public Location? Location { get; set; }
    public Guid? StockLotId { get; set; }
    public StockLot? StockLot { get; set; }
    public string MovementType { get; set; } = InventoryMovementTypes.Adjustment;
    public decimal QuantityBase { get; set; }
    public string SourceType { get; set; } = string.Empty;
    public Guid? SourceId { get; set; }
    public Guid? UserId { get; set; }
    public string Reason { get; set; } = string.Empty;
}

public sealed class StockCount : Entity
{
    public string Status { get; set; } = DocumentStatuses.Open;
    public Guid? UserId { get; set; }
    public ICollection<StockCountLine> Lines { get; set; } = new List<StockCountLine>();
}

public sealed class StockCountLine : Entity
{
    public Guid StockCountId { get; set; }
    public StockCount StockCount { get; set; } = null!;
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public decimal CountedQuantityBase { get; set; }
}

public sealed class IncomingShipment : Entity
{
    public string ReferenceNumber { get; set; } = string.Empty;
    public string Origin { get; set; } = string.Empty;
    public DateOnly? ExpectedDate { get; set; }
    public string Status { get; set; } = DocumentStatuses.Expected;
    public ICollection<IncomingShipmentLine> Lines { get; set; } = new List<IncomingShipmentLine>();
}

public sealed class IncomingShipmentLine : Entity
{
    public Guid IncomingShipmentId { get; set; }
    public IncomingShipment IncomingShipment { get; set; } = null!;
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid? ProductVariantId { get; set; }
    public ProductVariant? ProductVariant { get; set; }
    public decimal QuantityBase { get; set; }
    public DateOnly? ExpiryDate { get; set; }
}

public sealed class Reservation : Entity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid? ProductVariantId { get; set; }
    public ProductVariant? ProductVariant { get; set; }
    public Guid? CustomerId { get; set; }
    public Guid? LocationId { get; set; }
    public Location? Location { get; set; }
    public Guid? IncomingShipmentId { get; set; }
    public IncomingShipment? IncomingShipment { get; set; }
    public string SourceType { get; set; } = ReservationSourceTypes.AvailableStock;
    public decimal QuantityBase { get; set; }
    public string Status { get; set; } = DocumentStatuses.Reserved;
}
