namespace FloraBambini.Web.Catalogo.Dominio;

/// <summary>
/// Marca do fabricante. Não faz parte da árvore de categorias: é uma dimensão separada que
/// funciona como filtro dentro da listagem, sem página nem endereço próprios (ADR-010).
/// </summary>
public class Marca
{
    public int Id { get; set; }

    public required string Nome { get; set; }
}
