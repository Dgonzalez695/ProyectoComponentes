using System.Text.Json;
using proyectoComponentes.Data.Repository;
using proyectoComponentes.Data;
using proyectoComponentes.Interface;
using System.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IProductoRepository, ProductoRepository>();
builder.Services.AddScoped<IClientesRepository, ClienteRepository>();
builder.Services.AddScoped<IfacturaRepository, FacturaRepository>();
// builder.Services.AddScoped<DatabaseConnector>();
var conectionString  = builder.Configuration.GetSection("ConnectionString").Get<string>();
builder.Services.AddSingleton(new DatabaseConnector(conectionString));




var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=CreacionFactura}/{id?}");

app.Run();
