using FloraBambini.Web.Catalogo.Dominio;

namespace FloraBambini.Tests.Catalogo;

public class SlugTests
{
    [Theory]
    [InlineData("Shampoo de Camomila", "shampoo-de-camomila")]
    [InlineData("Acessórios", "acessorios")]
    [InlineData("Óleo  de Coco — 100 ml", "oleo-de-coco-100-ml")]
    [InlineData("  Banho & Higiene!  ", "banho-higiene")]
    [InlineData("Proteção Solar", "protecao-solar")]
    [InlineData("!!!", "")]
    public void Slug_e_gerado_sem_acentos_e_com_hifens(string nome, string esperado)
    {
        Assert.Equal(esperado, Slug.GerarAPartirDe(nome));
    }

    [Theory]
    [InlineData("acessorios")]
    [InlineData("shampoo-de-camomila")]
    [InlineData("kit-2")]
    public void Slug_valido_e_aceito(string slug)
    {
        Assert.True(Slug.EhValido(slug));
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("Acessorios")]
    [InlineData("acessórios")]
    [InlineData("shampoo de camomila")]
    [InlineData("shampoo--camomila")]
    [InlineData("-shampoo")]
    [InlineData("shampoo-")]
    [InlineData("shampoo/camomila")]
    [InlineData("shampoo\n")]
    public void Slug_invalido_e_recusado(string? slug)
    {
        Assert.False(Slug.EhValido(slug));
    }
}
