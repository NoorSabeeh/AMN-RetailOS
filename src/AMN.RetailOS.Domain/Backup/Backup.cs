using AMN.RetailOS.Domain.Common;

namespace AMN.RetailOS.Domain.Backup;

public sealed class Backup : Entity
{
    public string DestinationPath { get; set; } = string.Empty;
    public long FileSizeBytes { get; set; }
    public string VerificationStatus { get; set; } = BackupStatuses.Pending;
    public string ErrorMessage { get; set; } = string.Empty;
}
