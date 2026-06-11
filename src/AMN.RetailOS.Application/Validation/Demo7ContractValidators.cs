using AMN.RetailOS.Application.Contracts.Common;
using AMN.RetailOS.Application.Contracts.Customers;
using AMN.RetailOS.Application.Contracts.DeliveryOrders;
using AMN.RetailOS.Application.Contracts.Locations;
using AMN.RetailOS.Application.Contracts.Products;
using AMN.RetailOS.Application.Contracts.Reservations;
using AMN.RetailOS.Application.Contracts.Sales;
using AMN.RetailOS.Application.Contracts.Shipments;
using AMN.RetailOS.Domain.Common;

namespace AMN.RetailOS.Application.Validation;

public static class Demo7ContractValidators
{
    private static readonly HashSet<string> KnownLocationTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        LocationTypes.Warehouse,
        LocationTypes.Display
    };

    private static readonly HashSet<string> KnownReservationSources = new(StringComparer.OrdinalIgnoreCase)
    {
        ReservationSourceTypes.AvailableStock,
        ReservationSourceTypes.IncomingShipment
    };

    private static readonly HashSet<string> KnownDeliveryStatuses = new(StringComparer.OrdinalIgnoreCase)
    {
        DeliveryOrderStatuses.Draft,
        DeliveryOrderStatuses.Prepared,
        DeliveryOrderStatuses.WithDeliveryCompany,
        DeliveryOrderStatuses.Delivered,
        DeliveryOrderStatuses.Canceled
    };

    public static ValidationResult Validate(CreateProductDraftRequestDto request)
    {
        var errors = new List<ValidationErrorDto>();
        AddRequired(errors, nameof(request.Name), request.Name);
        AddNonEmptyGuid(errors, nameof(request.BaseUnitId), request.BaseUnitId);
        AddNonNegative(errors, nameof(request.SalePriceMinor), request.SalePriceMinor);
        AddNonNegative(errors, nameof(request.CostPriceMinor), request.CostPriceMinor);
        return new ValidationResult(errors);
    }

    public static ValidationResult Validate(UpdateProductDraftRequestDto request)
    {
        var errors = new List<ValidationErrorDto>();
        AddNonEmptyGuid(errors, nameof(request.ProductId), request.ProductId);
        AddRequired(errors, nameof(request.Name), request.Name);
        AddNonEmptyGuid(errors, nameof(request.BaseUnitId), request.BaseUnitId);
        AddNonNegative(errors, nameof(request.SalePriceMinor), request.SalePriceMinor);
        AddNonNegative(errors, nameof(request.CostPriceMinor), request.CostPriceMinor);
        return new ValidationResult(errors);
    }

    public static ValidationResult Validate(ProductVariantDto request)
    {
        var errors = new List<ValidationErrorDto>();
        AddNonEmptyGuid(errors, nameof(request.ProductId), request.ProductId);
        AddRequired(errors, nameof(request.Name), request.Name);
        AddRequired(errors, nameof(request.OptionName), request.OptionName);
        AddRequired(errors, nameof(request.OptionValue), request.OptionValue);
        return new ValidationResult(errors);
    }

    public static ValidationResult Validate(ProductImageMetadataDto request)
    {
        var errors = new List<ValidationErrorDto>();
        AddNonEmptyGuid(errors, nameof(request.ProductId), request.ProductId);
        AddRequired(errors, nameof(request.FileName), request.FileName);
        AddRequired(errors, nameof(request.ContentType), request.ContentType);
        AddRequired(errors, nameof(request.StoragePath), request.StoragePath);
        return new ValidationResult(errors);
    }

    public static ValidationResult Validate(LocationSummaryDto request)
    {
        var errors = new List<ValidationErrorDto>();
        AddRequired(errors, nameof(request.Name), request.Name);
        AddKnownValue(errors, nameof(request.LocationType), request.LocationType, KnownLocationTypes);
        return new ValidationResult(errors);
    }

    public static ValidationResult Validate(ReservationSummaryDto request)
    {
        var errors = new List<ValidationErrorDto>();
        AddNonEmptyGuid(errors, nameof(request.ProductId), request.ProductId);
        AddPositive(errors, nameof(request.QuantityBase), request.QuantityBase);
        AddKnownValue(errors, nameof(request.SourceType), request.SourceType, KnownReservationSources);
        return new ValidationResult(errors);
    }

    public static ValidationResult Validate(DeliveryOrderSummaryDto request)
    {
        var errors = new List<ValidationErrorDto>();
        AddKnownValue(errors, nameof(request.Status), request.Status, KnownDeliveryStatuses);
        AddNonNegative(errors, nameof(request.CodAmountMinor), request.CodAmountMinor);
        return new ValidationResult(errors);
    }

    public static ValidationResult ValidateDeliveryBarcodeAssignment(string barcode)
    {
        var errors = new List<ValidationErrorDto>();
        AddRequired(errors, "Barcode", barcode);
        AddMaxLength(errors, "Barcode", barcode, 64);
        return new ValidationResult(errors);
    }

    public static ValidationResult ValidateBarcodeLookup(string barcode)
    {
        var errors = new List<ValidationErrorDto>();
        AddRequired(errors, "Barcode", barcode);
        AddMaxLength(errors, "Barcode", barcode, 64);
        return new ValidationResult(errors);
    }

    public static ValidationResult Validate(SaleDraftDto request)
    {
        var errors = new List<ValidationErrorDto>();
        if (request.Lines.Count == 0)
        {
            errors.Add(new ValidationErrorDto(nameof(request.Lines), "required", "At least one sale line is required."));
        }

        for (var index = 0; index < request.Lines.Count; index++)
        {
            var line = request.Lines[index];
            AddNonEmptyGuid(errors, $"{nameof(request.Lines)}[{index}].{nameof(line.ProductId)}", line.ProductId);
            AddNonEmptyGuid(errors, $"{nameof(request.Lines)}[{index}].{nameof(line.UnitId)}", line.UnitId);
            AddPositive(errors, $"{nameof(request.Lines)}[{index}].{nameof(line.Quantity)}", line.Quantity);
            AddNonNegative(errors, $"{nameof(request.Lines)}[{index}].{nameof(line.UnitPriceMinor)}", line.UnitPriceMinor);
        }

        AddNonNegative(errors, nameof(request.PriceOverrideTotalMinor), request.PriceOverrideTotalMinor);
        return new ValidationResult(errors);
    }

    public static ValidationResult Validate(IncomingShipmentSummaryDto request)
    {
        var errors = new List<ValidationErrorDto>();
        AddRequired(errors, nameof(request.ReferenceNumber), request.ReferenceNumber);
        AddRequired(errors, nameof(request.Origin), request.Origin);
        return new ValidationResult(errors);
    }

    public static ValidationResult Validate(CustomerSummaryDto request)
    {
        var errors = new List<ValidationErrorDto>();
        AddRequired(errors, nameof(request.Name), request.Name);
        if (request.Phone is not null && request.Phone.Length > 0 && string.IsNullOrWhiteSpace(request.Phone))
        {
            errors.Add(new ValidationErrorDto(nameof(request.Phone), "invalid", "Phone must not be whitespace when provided."));
        }

        return new ValidationResult(errors);
    }

    private static void AddRequired(List<ValidationErrorDto> errors, string field, string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            errors.Add(new ValidationErrorDto(field, "required", $"{field} is required."));
        }
    }

    private static void AddNonEmptyGuid(List<ValidationErrorDto> errors, string field, Guid value)
    {
        if (value == Guid.Empty)
        {
            errors.Add(new ValidationErrorDto(field, "required", $"{field} is required."));
        }
    }

    private static void AddPositive(List<ValidationErrorDto> errors, string field, decimal value)
    {
        if (value <= 0)
        {
            errors.Add(new ValidationErrorDto(field, "positive_required", $"{field} must be positive."));
        }
    }

    private static void AddNonNegative(List<ValidationErrorDto> errors, string field, long value)
    {
        if (value < 0)
        {
            errors.Add(new ValidationErrorDto(field, "non_negative_required", $"{field} cannot be negative."));
        }
    }

    private static void AddKnownValue(List<ValidationErrorDto> errors, string field, string value, IReadOnlySet<string> knownValues)
    {
        if (!knownValues.Contains(value))
        {
            errors.Add(new ValidationErrorDto(field, "unknown_value", $"{field} is not a known value."));
        }
    }

    private static void AddMaxLength(List<ValidationErrorDto> errors, string field, string value, int maxLength)
    {
        if (value.Length > maxLength)
        {
            errors.Add(new ValidationErrorDto(field, "max_length", $"{field} must be {maxLength} characters or fewer."));
        }
    }
}
