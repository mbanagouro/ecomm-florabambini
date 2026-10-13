using System.Net;
using FloraBambini.Tests.Infra;

namespace FloraBambini.Tests.Compartilhado.Mvc;

public class LocalizadorDeViewsPorModuloTests : IClassFixture<AplicacaoDeTeste>
{
    private readonly HttpClient _cliente;

    public LocalizadorDeViewsPorModuloTests(AplicacaoDeTeste aplicacao)
    {
        _cliente = aplicacao.CreateClient();
    }

    [Fact]
    public async Task Aplicacao_sobe_e_responde()
    {
        var resposta = await _cliente.GetAsync("/exemplo");

        Assert.Equal(HttpStatusCode.OK, resposta.StatusCode);
    }

    [Theory]
    [InlineData("/exemplo", "Catalogo/Loja/Views")]
    [InlineData("/admin/exemplo", "Catalogo/Admin/Views")]
    public async Task View_de_modulo_e_localizada_na_raiz_e_na_area_Admin(string rota, string pastaEsperada)
    {
        var resposta = await _cliente.GetAsync(rota);
        var html = await resposta.Content.ReadAsStringAsync();

        Assert.Equal(HttpStatusCode.OK, resposta.StatusCode);
        Assert.Contains(pastaEsperada, html);
    }
}
