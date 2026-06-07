using AMN.RetailOS.Api.Endpoints;
using AMN.RetailOS.Infrastructure.DemoData;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddDemo7InMemoryQueries();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/health", () => Results.Ok(new { status = "ok", service = "AMN.RetailOS.Api" }));

app.MapDemo7ContractEndpoints();

app.Run();
