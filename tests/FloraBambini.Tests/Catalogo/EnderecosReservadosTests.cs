using FloraBambini.Tests.Infra;
using FloraBambini.Web.Catalogo.Servicos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Routing.Patterns;
using Microsoft.Extensions.DependencyInjection;

namespace FloraBambini.Tests.Catalogo;

public class EnderecosReservadosTests : IClassFixture<AplicacaoDeTeste>
{
    private readonly AplicacaoDeTeste _aplicacao;

    public EnderecosReservadosTests(AplicacaoDeTeste aplicacao)
    {
        _aplicacao = aplicacao;
    }

    [Theory]
    [InlineData("produto")]
    [InlineData("admin")]
    [InlineData("carrinho")]
    [InlineData("checkout")]
    [InlineData("conta")]
    public void CA_04_Slug_de_rota_existente_e_reservado(string slug)
    {
        var enderecos = new EnderecosReservados(Rotas());

        Assert.True(enderecos.EhReservado(slug));
    }

    [Fact]
    public void Slug_que_nao_e_rota_nao_e_reservado()
    {
        var enderecos = new EnderecosReservados(Rotas());

        Assert.False(enderecos.EhReservado("flora"));
    }

    [Fact]
    public void Primeiro_segmento_fixo_de_rota_registrada_e_reservado()
    {
        var enderecos = new EnderecosReservados(Rotas(
            RoutePatternFactory.Parse("Pedidos/{id}"),
            RoutePatternFactory.Parse("{controller}/{action}", defaults: null, parameterPolicies: null,
                requiredValues: new { controller = "Entrega", action = "Index" })));

        Assert.True(enderecos.EhReservado("pedidos"));
        Assert.True(enderecos.EhReservado("entrega"));
    }

    [Fact]
    public void Controller_da_rota_convencional_da_aplicacao_e_reservado()
    {
        var enderecos = new EnderecosReservados(_aplicacao.Services.GetRequiredService<EndpointDataSource>());

        Assert.True(enderecos.EhReservado("exemplo"));
    }

    [Fact]
    public void Rota_que_comeca_por_parametro_livre_nao_reserva_nada()
    {
        var enderecos = new EnderecosReservados(Rotas(RoutePatternFactory.Parse("{**caminho}")));

        Assert.Equal(["admin", "carrinho", "checkout", "conta", "produto"], enderecos.Listar().Order());
    }

    private static EndpointDataSource Rotas(params RoutePattern[] padroes) =>
        new DefaultEndpointDataSource(padroes.Select(padrao =>
            new RouteEndpoint(_ => Task.CompletedTask, padrao, order: 0, EndpointMetadataCollection.Empty, displayName: null)));
}
