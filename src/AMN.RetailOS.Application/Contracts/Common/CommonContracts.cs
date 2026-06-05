namespace AMN.RetailOS.Application.Contracts.Common;

public sealed record ValidationIssueDto(string Field, string Code, string Message);

public sealed record StandardErrorResponseDto(
    string ErrorCode,
    string Message,
    IReadOnlyList<ValidationIssueDto> ValidationIssues);

public sealed record PagedResultDto<TItem>(
    IReadOnlyList<TItem> Items,
    int Page,
    int PageSize,
    int TotalCount);

