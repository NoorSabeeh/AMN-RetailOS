using AMN.RetailOS.Application.Contracts.Common;

namespace AMN.RetailOS.Api.Responses;

public static class ApiResponses
{
    public static IResult Success<TData>(TData data)
    {
        var response = new ApiResponseDto<TData>(
            Success: true,
            Data: data,
            Error: null);

        return Results.Ok(response);
    }

    public static IResult NotFound(string code, string message)
    {
        var response = new ApiResponseDto<object>(
            Success: false,
            Data: null,
            Error: new ApiErrorDto(
                Code: code,
                Message: message,
                FieldErrors: []));

        return Results.NotFound(response);
    }

    public static IResult NotImplemented(string routeGroup, string operation)
    {
        var response = new ApiResponseDto<object>(
            Success: false,
            Data: null,
            Error: new ApiErrorDto(
                Code: "not_implemented",
                Message: $"{routeGroup}.{operation} is not implemented in DEMO-7 read-only smoke mode.",
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
