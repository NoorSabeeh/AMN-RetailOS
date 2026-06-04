using AMN.RetailOS.Domain.Common;

namespace AMN.RetailOS.Domain.Catalog;

public sealed class Category : Entity
{
    public string Name { get; set; } = string.Empty;
    public Guid? ParentCategoryId { get; set; }
    public Category? ParentCategory { get; set; }
    public string Status { get; set; } = EntityStatuses.Active;
}

public sealed class Unit : Entity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Status { get; set; } = EntityStatuses.Active;
}

public sealed class Product : Entity
{
    public Guid? CategoryId { get; set; }
    public Category? Category { get; set; }
    public Guid BaseUnitId { get; set; }
    public Unit BaseUnit { get; set; } = null!;
    public string Sku { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public long SalePriceMinor { get; set; }
    public long CostPriceMinor { get; set; }
    public bool AllowNegativeStock { get; set; }
    public string Status { get; set; } = EntityStatuses.Active;
    public ICollection<ProductBarcode> Barcodes { get; set; } = new List<ProductBarcode>();
}

public sealed class ProductBarcode : Entity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid UnitId { get; set; }
    public Unit Unit { get; set; } = null!;
    public string Barcode { get; set; } = string.Empty;
}

public sealed class ProductUnitConversion : Entity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid FromUnitId { get; set; }
    public Unit FromUnit { get; set; } = null!;
    public Guid ToUnitId { get; set; }
    public Unit ToUnit { get; set; } = null!;
    public decimal Factor { get; set; }
}

public sealed class PriceList : Entity
{
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public string Name { get; set; } = "Default";
    public long PriceMinor { get; set; }
    public string Status { get; set; } = EntityStatuses.Active;
}
