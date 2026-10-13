using Microsoft.EntityFrameworkCore;

namespace FloraBambini.Web.Dados;

/// <summary>
/// Contexto único da loja. Os módulos consultam e gravam direto por ele, sem repositório
/// genérico por cima (ADR-002); o mapeamento de cada entidade fica na pasta <c>Dados</c>
/// do módulo dela e é descoberto pelo assembly.
/// </summary>
public class LojaDbContext(DbContextOptions<LojaDbContext> options) : DbContext(options)
{
    public const string NomeDaConexao = "Loja";

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(LojaDbContext).Assembly);
    }
}
