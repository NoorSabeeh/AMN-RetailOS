using AMN.RetailOS.Domain.Common;

namespace AMN.RetailOS.Domain.Users;

public sealed class User : Entity
{
    public string Username { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Status { get; set; } = EntityStatuses.Active;
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}

public sealed class Role : Entity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}

public sealed class Permission : Entity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
}

public sealed class UserRole
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public Guid RoleId { get; set; }
    public Role Role { get; set; } = null!;
}

public sealed class Session : Entity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public DateTime StartedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? EndedAtUtc { get; set; }
}
