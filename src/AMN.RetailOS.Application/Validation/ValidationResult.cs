using AMN.RetailOS.Application.Contracts.Common;

namespace AMN.RetailOS.Application.Validation;

public sealed record ValidationResult(IReadOnlyList<ValidationErrorDto> Errors)
{
    public bool IsValid => Errors.Count == 0;

    public static ValidationResult Success { get; } = new([]);

    public static ValidationResult From(params ValidationErrorDto[] errors)
    {
        return new ValidationResult(errors);
    }
}

