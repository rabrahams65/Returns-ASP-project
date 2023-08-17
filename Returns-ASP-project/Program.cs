using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Returns_ASP_project.Data;
using Returns_ASP_project.Domain.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add Db Context
builder.Services.AddDbContext<Entities>(options =>
options.UseInMemoryDatabase(databaseName: "Returns"),
ServiceLifetime.Singleton);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen( c =>
{
    c.AddServer(new OpenApiServer
    {
        Description = "Development Server",
        Url = "https://localhost:7273"
    });

    c.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"] + e.ActionDescriptor.RouteValues["controller"]}");
});

builder.Services.AddSingleton<Entities>();

var app = builder.Build();

var entities = app.Services.CreateScope().ServiceProvider.GetService<Entities>();

Return[] returns = new Return[]
{
    new (Guid.NewGuid(),
                new DateTime(2022,04,14),
                "Spar",
                "Bread",
                10,
                null,
                "John",
                "Mouldy",
                "555555",
                16,
                true,
                ""
                ),
            new ( Guid.NewGuid(),
                new DateTime(2022,08,25),
                "Checkers",
                "Milk",
                35,
                new DateTime(2022, 09, 19),
                "Mary",
                "Sour",
                "333333",
                35,
                false,
                "testing"
                ),
            new ( Guid.NewGuid(),
                new DateTime(2022,12,31),
                "Woolworths",
                "Eggs",
                12,
                new DateTime(2023, 01, 01),
                "Paul",
                "Expired",
                "888888",
                6,
                false,
                "testing"
                )
};
entities.Returns.AddRange(returns);

entities.SaveChanges();


app.UseCors(builder => builder.WithOrigins("*")
.AllowAnyMethod().AllowAnyHeader());

app.UseSwagger().UseSwaggerUI();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
