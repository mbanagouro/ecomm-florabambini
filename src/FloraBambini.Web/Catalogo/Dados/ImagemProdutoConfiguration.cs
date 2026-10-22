using FloraBambini.Web.Catalogo.Dominio;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FloraBambini.Web.Catalogo.Dados;

public sealed class ImagemProdutoConfiguration : IEntityTypeConfiguration<ImagemProduto>
{
    public const int TamanhoMaximoDaChave = 200;

    public void Configure(EntityTypeBuilder<ImagemProduto> imagem)
    {
        imagem.ToTable("ImagensProduto");

        imagem.HasKey(i => i.Id);

        imagem.Property(i => i.ChaveNoArmazenamento).HasMaxLength(TamanhoMaximoDaChave).IsRequired();

        // As imagens pertencem ao produto: sair com ele é o comportamento esperado.
        imagem.HasOne(i => i.Produto)
            .WithMany(p => p.Imagens)
            .HasForeignKey(i => i.ProdutoId)
            .OnDelete(DeleteBehavior.Cascade);

        imagem.HasIndex(i => new { i.ProdutoId, i.Posicao });
    }
}
