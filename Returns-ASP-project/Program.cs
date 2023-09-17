using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Returns_ASP_project.Data;
using Returns_ASP_project.Domain.Entities;
using Returns_ASP_project.Services;
using Returns_ASP_project.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add Db Context
builder.Services.AddDbContext<Entities>(options =>
options.UseSqlServer(
        builder.Configuration.GetConnectionString("Returns")
    ));

// Add services to the container.
builder.Services.AddScoped<IReportService, ReportService>();
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

builder.Services.AddScoped<Entities>();

var app = builder.Build();

var entities = app.Services.CreateScope().ServiceProvider.GetService<Entities>();
entities?.Database.EnsureCreated();

#region REGION - Data
//use when I don't want seeding to occur over and over again in db.


if (!entities.Customers.Any())
{
    Customer[] customers = new Customer[]
{
    new ( Guid.NewGuid(),
        "Spar",
        "SPA001",
        "admin@spar.co.za",
        "123 Testing"
        ),
    new ( Guid.NewGuid(),
        "Checkers",
        "CHK001",
        "admin@checkers.co.za",
        "123 Testing"
        ),
    new ( Guid.NewGuid(),
        "Shoprite",
        "SHO001",
        "admin@shoprite.co.za",
        null
        ),
    new ( Guid.NewGuid(),
        "Woolworths",
        "WLW001",
        "admin@woolworths.co.za",
        "123 Testing"
        ),
    new ( Guid.NewGuid(),
        "Pick n Pay",
        "PNP001",
        "admin@pnp.co.za",
        "123 Testing"
        ),
};
    entities?.Customers.AddRange(customers);
}

if (!entities.Products.Any())
{
    Product[] products = new Product[]
{
    new (Guid.NewGuid(),
        "Bread",
        "BR001",
        17.00m,
        0.70m),
    new (Guid.NewGuid(),
        "Eggs",
        "EGG01",
        7.00m,
        0.50m),
    new (Guid.NewGuid(),
        "Milk",
        "ML001",
        13.00m,
        1.00m),
};
    entities?.Products.AddRange(products);
}

if (!entities.Owners.Any())
{
    Owner[] owners = new Owner[]
{
    new (Guid.NewGuid(), "John", "Jefferson"),
    new (Guid.NewGuid(), "Mary", "Flintstone"),
    new (Guid.NewGuid(), "Paul", "Warrowsky")
};
    entities?.Owners.AddRange(owners);
}

if (!entities.Faults.Any())
{

    Fault[] faults = new Fault[]
    {
    new (Guid.NewGuid(), "Sour", "A short description of the fault"),
    new (Guid.NewGuid(), "Mouldy", "A description"),
    new (Guid.NewGuid(), "Expired", "This is the description of the fault")
    };
    entities?.Faults.AddRange(faults);
}


entities?.SaveChanges();

#region Region - Return Data

//Return[] returns = new Return[]
//{
//            new (Guid.NewGuid(),
//                new DateTime(2022,04,14),
//                c
//                "Bread",
//                10,
//                null,
//                "John",
//                "Mouldy",
//                "555555",
//                16,
//                true,
//                "",
//                Guid.NewGuid(),
//                DateTime.Now.Date
//                ),
//            new ( Guid.NewGuid(),
//                new DateTime(2022,08,25),
//                "Checkers",
//                "Milk",
//                35,
//                new DateTime(2022, 09, 19),
//                "Mary",
//                "Sour",
//                "333333",
//                35,
//                false,
//                "testing",
//                Guid.NewGuid(),
//                DateTime.Now.Date
//                )
//};


//entities?.Returns.AddRange(returns);

#endregion



#endregion

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
