using FloraBambini.Tests.Infra;
using FloraBambini.Web.Catalogo.Dominio;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace FloraBambini.Tests.Catalogo;

public class IndicesDeCategoriaEMarcaTests(BancoDeTeste banco) : IClassFixture<BancoDeTeste>
{
    // Códigos do SQL Server para violação de índice único e de restrição única.
    private static readonly int[] ViolacoesDeUnicidade = [2601, 2627];

    [Fact]
    public async Task Indice_recusa_slug_repetido_entre_irmas_e_entre_raizes()
    {
        await using var contexto = banco.CriarContexto();

        // Entre raízes: duas categorias sem pai com o mesmo slug.
        contexto.Set<Categoria>().Add(new Categoria { Nome = "Flora", Slug = "flora-raiz" });
        await contexto.SaveChangesAsync();

        contexto.Set<Categoria>().Add(new Categoria { Nome = "Outra Flora", Slug = "flora-raiz" });
        await AssertViolaUnicidade(contexto);
        contexto.ChangeTracker.Clear();

        // Entre irmãs: duas filhas do mesmo pai com o mesmo slug.
        var pai = new Categoria { Nome = "Bambini", Slug = "bambini-irmas" };
        contexto.Set<Categoria>().Add(pai);
        await contexto.SaveChangesAsync();

        contexto.Set<Categoria>().Add(new Categoria { Nome = "Cabelo", Slug = "cabelo", CategoriaPaiId = pai.Id });
        await contexto.SaveChangesAsync();

        contexto.Set<Categoria>().Add(new Categoria { Nome = "Cabelos", Slug = "cabelo", CategoriaPaiId = pai.Id });
        await AssertViolaUnicidade(contexto);
    }

    [Fact]
    public async Task Indice_aceita_mesmo_slug_sob_pais_diferentes()
    {
        await using var contexto = banco.CriarContexto();

        var flora = new Categoria { Nome = "Flora", Slug = "flora-pais" };
        var bambini = new Categoria { Nome = "Bambini", Slug = "bambini-pais" };
        contexto.Set<Categoria>().AddRange(flora, bambini);
        await contexto.SaveChangesAsync();

        contexto.Set<Categoria>().AddRange(
            new Categoria { Nome = "Cabelo", Slug = "cabelo", CategoriaPaiId = flora.Id },
            new Categoria { Nome = "Cabelo", Slug = "cabelo", CategoriaPaiId = bambini.Id });

        await contexto.SaveChangesAsync();

        Assert.Equal(2, await contexto.Set<Categoria>()
            .CountAsync(c => c.Slug == "cabelo" && (c.CategoriaPaiId == flora.Id || c.CategoriaPaiId == bambini.Id)));
    }

    [Fact]
    public async Task Exclusao_de_categoria_com_filha_e_recusada_pelo_banco()
    {
        await using var contexto = banco.CriarContexto();

        var pai = new Categoria { Nome = "Flora", Slug = "flora-exclusao" };
        contexto.Set<Categoria>().Add(pai);
        await contexto.SaveChangesAsync();

        contexto.Set<Categoria>().Add(new Categoria { Nome = "Cabelo", Slug = "cabelo", CategoriaPaiId = pai.Id });
        await contexto.SaveChangesAsync();

        // O delete em lote vai direto ao banco, sem a validação do rastreador do EF.
        var falha = await Assert.ThrowsAnyAsync<Exception>(
            () => contexto.Set<Categoria>().Where(c => c.Id == pai.Id).ExecuteDeleteAsync());

        var sql = Assert.IsType<SqlException>(falha.GetBaseException());
        Assert.Equal(547, sql.Number); // violação de chave estrangeira
    }

    [Fact]
    public async Task Indice_recusa_marca_repetida_sem_distinguir_maiusculas()
    {
        await using var contexto = banco.CriarContexto();

        contexto.Set<Marca>().Add(new Marca { Nome = "Natura" });
        await contexto.SaveChangesAsync();

        contexto.Set<Marca>().Add(new Marca { Nome = "NATURA" });
        await AssertViolaUnicidade(contexto);
    }

    private static async Task AssertViolaUnicidade(DbContext contexto)
    {
        var falha = await Assert.ThrowsAsync<DbUpdateException>(() => contexto.SaveChangesAsync());

        var sql = Assert.IsType<SqlException>(falha.InnerException);
        Assert.Contains(sql.Number, ViolacoesDeUnicidade);
    }
}
