namespace FloraBambini.Web.Catalogo.Dominio;

/// <summary>
/// Nó da árvore de categorias (ADR-010). Categoria sem pai é raiz: as linhas Flora e Bambini
/// são categorias raiz, não um tipo diferente de entidade. As regras de unicidade de slug,
/// profundidade e ciclo entram nas tarefas seguintes; aqui só há a estrutura.
/// </summary>
public class Categoria
{
    public int Id { get; set; }

    public required string Nome { get; set; }

    public required string Slug { get; set; }

    public int? CategoriaPaiId { get; set; }

    public Categoria? CategoriaPai { get; set; }

    /// <summary>Posição entre as categorias irmãs, em ordem crescente.</summary>
    public int Posicao { get; set; }
}
