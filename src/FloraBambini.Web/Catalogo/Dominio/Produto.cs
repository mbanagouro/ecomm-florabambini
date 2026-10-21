namespace FloraBambini.Web.Catalogo.Dominio;

/// <summary>
/// Item à venda. Tem versão de linha para concorrência otimista, porque o estoque também será
/// alterado por pedidos (ADR-007). Preço é <c>decimal</c> de ponta a ponta (ADR-003). As regras
/// de preço promocional, estoque e situação entram nas tarefas seguintes; aqui só há a estrutura.
/// </summary>
public class Produto
{
    public int Id { get; set; }

    public required string Nome { get; set; }

    public required string Slug { get; set; }

    public int CategoriaId { get; set; }

    public Categoria? Categoria { get; set; }

    public int MarcaId { get; set; }

    public Marca? Marca { get; set; }

    public decimal Preco { get; set; }

    public decimal? PrecoPromocional { get; set; }

    public int Estoque { get; set; }

    public string? Descricao { get; set; }

    public SituacaoDoProduto Situacao { get; set; } = SituacaoDoProduto.Inativo;

    public DateTime DataDeCadastro { get; set; }

    /// <summary>Coluna de versão de linha, gerida pelo banco (ADR-007).</summary>
    public byte[] Versao { get; set; } = [];

    public List<ImagemProduto> Imagens { get; set; } = [];
}

public enum SituacaoDoProduto
{
    Ativo = 1,
    Inativo = 2,
}
