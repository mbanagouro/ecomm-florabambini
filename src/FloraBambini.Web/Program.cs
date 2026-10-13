using FloraBambini.Web.Compartilhado.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllersWithViews()
    .AddRazorOptions(opcoes => opcoes.ViewLocationExpanders.Add(new LocalizadorDeViewsPorModulo()));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.MapAreaControllerRoute(
    name: "admin",
    areaName: "Admin",
    pattern: "admin/{controller}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "loja",
    pattern: "{controller}/{action=Index}/{id?}");

app.Run();
