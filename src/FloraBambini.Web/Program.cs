using FloraBambini.Web.Compartilhado.Mvc;
using FloraBambini.Web.Dados;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddControllersWithViews()
    .AddRazorOptions(opcoes => opcoes.ViewLocationExpanders.Add(new LocalizadorDeViewsPorModulo()));

builder.Services.AddDbContext<LojaDbContext>(opcoes =>
{
    var conexao = builder.Configuration.GetConnectionString(LojaDbContext.NomeDaConexao)
        ?? throw new InvalidOperationException(
            $"Connection string '{LojaDbContext.NomeDaConexao}' não configurada. " +
            "Em desenvolvimento, defina com 'dotnet user-secrets set ConnectionStrings:Loja \"...\"'.");

    opcoes.UseSqlServer(conexao);
});

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
