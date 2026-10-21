namespace FloraBambini.Web.Catalogo.Dominio;

/// <summary>
/// Imagem de um produto. O arquivo vive no armazenamento de blobs (ADR-002); o banco guarda só
/// a chave a partir da qual as versões da imagem são localizadas.
/// </summary>
public class ImagemProduto
{
    public int Id { get; set; }

    public int ProdutoId { get; set; }

    public Produto? Produto { get; set; }

    /// <summary>Posição entre as imagens do produto, em ordem crescente.</summary>
    public int Posicao { get; set; }

    public required string ChaveNoArmazenamento { get; set; }
}
