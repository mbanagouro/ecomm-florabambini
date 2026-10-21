using FloraBambini.Tests.Infra;
using FloraBambini.Web.Catalogo.Dominio;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace FloraBambini.Tests.Catalogo;

public class IndicesERestricoesDeProdutoTests(BancoDeTeste banco) : IClassFixture<BancoDeTeste>
{
    // Códigos do SQL Server para violação de índice único e de restrição única.
    private static readonly int[] ViolacoesDeUnicidade = [2601, 2627];

    [Fact]
    public async Task Banco_recusa_excluir_categoria_ou_marca_com_produto()
    {
        await using var contexto = banco.CriarContexto();

        var categoria = new Categoria { Nome = "Flora", Slug = "flora-exclusao-produto" };
        var marca = new Marca { Nome = "Marca com produto" };
        contexto.Add(new Produto { Nome = "Sabonete", Slug = "sabonete-exclusao", Categoria = categoria, Marca = marca, Preco = 19.90m });
        await contexto.SaveChangesAsync();

        // O delete em lote vai direto ao banco, sem a validação do rastreador do EF.
        var porCategoria = await Assert.ThrowsAnyAsync<Exception>(
            () => contexto.Set<Categoria>().Where(c => c.Id == categoria.Id).ExecuteDeleteAsync());
        Assert.Equal(547, Assert.IsType<SqlException>(porCategoria.GetBaseException()).Number);

        var porMarca = await Assert.ThrowsAnyAsync<Exception>(
            () => contexto.Set<Marca>().Where(m => m.Id == marca.Id).ExecuteDeleteAsync());
        Assert.Equal(547, Assert.IsType<SqlException>(porMarca.GetBaseException()).Number);
    }

    [Fact]
    public async Task Indice_recusa_slug_de_produto_repetido()
    {
        await using var contexto = banco.CriarContexto();

        var categoria = new Categoria { Nome = "Bambini", Slug = "bambini-slug-produto" };
        var marca = new Marca { Nome = "Marca slug repetido" };
        contexto.Add(new Produto { Nome = "Creme", Slug = "creme-repetido", Categoria = categoria, Marca = marca, Preco = 30m });
        await contexto.SaveChangesAsync();

        // Mesmo slug, mesma categoria e outra categoria: o índice é global.
        contexto.Add(new Produto { Nome = "Outro creme", Slug = "creme-repetido", CategoriaId = categoria.Id, MarcaId = marca.Id, Preco = 31m });

        var falha = await Assert.ThrowsAsync<DbUpdateException>(() => contexto.SaveChangesAsync());

        var sql = Assert.IsType<SqlException>(falha.InnerException);
        Assert.Contains(sql.Number, ViolacoesDeUnicidade);
    }
}
