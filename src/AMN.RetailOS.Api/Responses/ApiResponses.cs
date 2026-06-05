using AMN.RetailOS.Application.Contracts.Common;

namespace AMN.RetailOS.Api.Responses;

public static class ApiResponses
{
    public static IResult NotImplemented(string routeGroup, string operation)
    {
        var response = new ApiResponseDto<object>(
            Success: false,
            Data: null,
            Error: new ApiErrorDto(
                Code: "not_implemented",
                Message: $"{routeGroup}.{operation} is contract-only in DEMO-7-D2.",
                FieldErrors: []));

        return Results.Json(response, statusCode: StatusCodes.Status501NotImplemented);
    }

    public static IResult ValidationFailed(IReadOnlyList<ValidationErrorDto> errors)
    {
        var response = new ApiResponseDto<object>(
            Success: false,
            Data: null,
            Error: new ApiErrorDto(
                Code: "validation_failed",
                Message: "Request validation failed.",
                FieldErrors: errors));

        return Results.BadRequest(response);
    }
}

