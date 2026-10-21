using FloraBambini.Web.Catalogo.Dominio;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FloraBambini.Web.Catalogo.Dados;

public sealed class ProdutoConfiguration : IEntityTypeConfiguration<Produto>
{
    public const int TamanhoMaximoDoNome = 150;
    public const int TamanhoMaximoDoSlug = 150;

    public void Configure(EntityTypeBuilder<Produto> produto)
    {
        produto.ToTable("Produtos");

        produto.HasKey(p => p.Id);

        produto.Property(p => p.Nome).HasMaxLength(TamanhoMaximoDoNome).IsRequired();
        produto.Property(p => p.Slug).HasMaxLength(TamanhoMaximoDoSlug).IsRequired();
        // Texto formatado e saneado (RN-20): o HTML passa de qualquer limite fixo razoável.
        produto.Property(p => p.Descricao).HasColumnType("nvarchar(max)");

        // Dinheiro é decimal de ponta a ponta (ADR-003).
        produto.Property(p => p.Preco).HasColumnType("decimal(10,2)");
        produto.Property(p => p.PrecoPromocional).HasColumnType("decimal(10,2)");

        produto.Property(p => p.Situacao).HasConversion<int>();

        // Concorrência otimista: o estoque também é alterado por pedidos (ADR-007).
        produto.Property(p => p.Versao).IsRowVersion();

        // Excluir categoria ou marca com produto é recusado pelo banco, nunca em cascata.
        produto.HasOne(p => p.Categoria)
            .WithMany()
            .HasForeignKey(p => p.CategoriaId)
            .OnDelete(DeleteBehavior.Restrict);

        produto.HasOne(p => p.Marca)
            .WithMany()
            .HasForeignKey(p => p.MarcaId)
            .OnDelete(DeleteBehavior.Restrict);

        produto.HasIndex(p => p.Slug).IsUnique();
    }
}
