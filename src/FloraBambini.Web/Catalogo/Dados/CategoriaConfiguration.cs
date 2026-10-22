using FloraBambini.Web.Catalogo.Dominio;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FloraBambini.Web.Catalogo.Dados;

public sealed class CategoriaConfiguration : IEntityTypeConfiguration<Categoria>
{
    public const int TamanhoMaximoDoNome = 100;
    public const int TamanhoMaximoDoSlug = 100;

    public void Configure(EntityTypeBuilder<Categoria> categoria)
    {
        categoria.ToTable("Categorias");

        categoria.HasKey(c => c.Id);

        categoria.Property(c => c.Nome).HasMaxLength(TamanhoMaximoDoNome).IsRequired();
        categoria.Property(c => c.Slug).HasMaxLength(TamanhoMaximoDoSlug).IsRequired();

        // Excluir uma categoria com filhas nunca apaga a subárvore em cascata (ADR-010, RN-07).
        categoria.HasOne(c => c.CategoriaPai)
            .WithMany()
            .HasForeignKey(c => c.CategoriaPaiId)
            .OnDelete(DeleteBehavior.Restrict);

        // O slug é único entre irmãs, não globalmente. No SQL Server o índice único trata NULL
        // como valor igual, então ele também impede duas raízes com o mesmo slug. O filtro é
        // removido de propósito: por convenção o EF acrescenta "WHERE CategoriaPaiId IS NOT NULL"
        // a índice único sobre coluna anulável, o que deixaria as raízes repetirem o slug.
        categoria.HasIndex(c => new { c.CategoriaPaiId, c.Slug })
            .IsUnique()
            .HasFilter(null);
    }
}
