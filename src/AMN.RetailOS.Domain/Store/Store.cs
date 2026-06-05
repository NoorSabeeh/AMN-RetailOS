using AMN.RetailOS.Domain.Common;

namespace AMN.RetailOS.Domain.Store;

public sealed class Organization : Entity
{
    public string Name { get; set; } = string.Empty;
    public string CurrencyCode { get; set; } = "IQD";
    public string Status { get; set; } = EntityStatuses.Active;
}

public sealed class Store : Entity
{
    public Guid? OrganizationId { get; set; }
    public Organization? Organization { get; set; }
    public string Name { get; set; } = string.Empty;
    public string CurrencyCode { get; set; } = "IQD";
    public string Language { get; set; } = "ar";
    public string Status { get; set; } = EntityStatuses.Active;
    public ICollection<StoreProfile> Profiles { get; set; } = new List<StoreProfile>();
}

public sealed class StoreSetting : Entity
{
    public Guid StoreId { get; set; }
    public Store Store { get; set; } = null!;
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}

public sealed class StoreProfile : Entity
{
    public Guid StoreId { get; set; }
    public Store Store { get; set; } = null!;
    public string Code { get; set; } = StoreProfileCodes.RetailGrocery;
    public bool IsEnabled { get; set; } = true;
}

public sealed class Setting : Entity
{
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}
