var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/health", () => Results.Ok(new { status = "ok", service = "AMN.RetailOS.Api" }));

app.MapGet("/api/contracts/status", () => Results.Ok(new
{
    product = "AMN RetailOS",
    phase = "DEMO-7-G0+D1",
    contractVersion = "demo-7-d1",
    implementationStatus = "contracts_and_model_baseline_only",
    featuresImplemented = false
}));

app.Run();
