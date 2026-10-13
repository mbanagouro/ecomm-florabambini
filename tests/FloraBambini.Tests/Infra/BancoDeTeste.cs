using FloraBambini.Web.Dados;
using Microsoft.EntityFrameworkCore;

namespace FloraBambini.Tests.Infra;

/// <summary>
/// Banco SQL Server LocalDB exclusivo de uma classe de teste: nasce vazio, recebe as migrations
/// e é apagado ao final. Cada instância usa um nome próprio, o que permite rodar classes de
/// teste em paralelo. Usar como <c>IClassFixture&lt;BancoDeTeste&gt;</c>.
/// </summary>
public sealed class BancoDeTeste : IAsyncLifetime
{
    public const string PrefixoDoNome = "FloraBambini_Testes_";

    private const string Servidor = @"Server=(localdb)\MSSQLLocalDB;Integrated Security=true;TrustServerCertificate=true";

    private readonly DbContextOptions<LojaDbContext> _opcoes;

    public BancoDeTeste()
    {
        Nome = PrefixoDoNome + Guid.NewGuid().ToString("N");
        ConnectionString = $"{Servidor};Database={Nome}";
        _opcoes = new DbContextOptionsBuilder<LojaDbContext>().UseSqlServer(ConnectionString).Options;
    }

    public string Nome { get; }

    public string ConnectionString { get; }

    /// <summary>Connection string do servidor, sem banco: serve para conferir o que existe nele.</summary>
    public static string ConnectionStringDoServidor => $"{Servidor};Database=master";

    public LojaDbContext CriarContexto() => new(_opcoes);

    public async Task InitializeAsync()
    {
        await using var contexto = CriarContexto();
        await contexto.Database.MigrateAsync();
    }

    public async Task DisposeAsync()
    {
        await using var contexto = CriarContexto();
        await contexto.Database.EnsureDeletedAsync();
    }
}
