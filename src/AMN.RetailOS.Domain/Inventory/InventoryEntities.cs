using AMN.RetailOS.Domain.Catalog;
using AMN.RetailOS.Domain.Common;

namespace AMN.RetailOS.Domain.Inventory;

public sealed class InventoryMovement : Entity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid UnitId { get; set; }
    public Unit Unit { get; set; } = null!;
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
