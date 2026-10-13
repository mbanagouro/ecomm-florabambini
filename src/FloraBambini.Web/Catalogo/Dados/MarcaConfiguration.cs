using FloraBambini.Web.Catalogo.Dominio;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FloraBambini.Web.Catalogo.Dados;

public sealed class MarcaConfiguration : IEntityTypeConfiguration<Marca>
{
    public const int TamanhoMaximoDoNome = 100;

    // Collation explícita para que a unicidade sem distinção de maiúsculas não dependa
    // da collation padrão do banco.
    private const string ComparacaoSemDistincaoDeMaiusculas = "SQL_Latin1_General_CP1_CI_AS";

    public void Configure(EntityTypeBuilder<Marca> marca)
    {
        marca.ToTable("Marcas");

        marca.HasKey(m => m.Id);

        marca.Property(m => m.Nome)
            .HasMaxLength(TamanhoMaximoDoNome)
            .UseCollation(ComparacaoSemDistincaoDeMaiusculas)
            .IsRequired();

        marca.HasIndex(m => m.Nome).IsUnique();
    }
}
