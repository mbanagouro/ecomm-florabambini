using Microsoft.AspNetCore.Routing.Patterns;

namespace FloraBambini.Web.Catalogo.Servicos;

/// <summary>
/// Endereços da aplicação que uma categoria raiz não pode ocupar (RN-04). A lista sai das rotas
/// registradas, para que rota nova de qualquer módulo entre sozinha, e tem como piso os
/// segmentos fixos do PRD, que valem mesmo antes de a rota correspondente existir.
/// </summary>
public sealed class EnderecosReservados
{
    private static readonly string[] SegmentosFixos = ["produto", "admin", "carrinho", "checkout", "conta"];

    private readonly EndpointDataSource _rotas;

    public EnderecosReservados(EndpointDataSource rotas)
    {
        _rotas = rotas;
    }

    /// <summary>Diz se o slug de uma categoria raiz colide com um endereço da aplicação.</summary>
    public bool EhReservado(string slug) => Listar().Contains(slug);

    /// <summary>
    /// Primeiros segmentos fixos das rotas, mais os segmentos do PRD. Numa rota convencional
    /// como <c>{controller}/{action}</c>, o primeiro segmento é o nome do controller.
    /// </summary>
    public IReadOnlySet<string> Listar()
    {
        var reservados = new HashSet<string>(SegmentosFixos, StringComparer.OrdinalIgnoreCase);

        foreach (var rota in _rotas.Endpoints.OfType<RouteEndpoint>())
        {
            if (PrimeiroSegmentoFixo(rota.RoutePattern) is { } segmento)
            {
                reservados.Add(segmento.ToLowerInvariant());
            }
        }

        return reservados;
    }

    private static string? PrimeiroSegmentoFixo(RoutePattern padrao)
    {
        if (padrao.PathSegments is not [{ Parts: [var parte] }, ..])
        {
            return null;
        }

        return parte switch
        {
            RoutePatternLiteralPart literal => literal.Content,
            RoutePatternParameterPart parametro
                when padrao.RequiredValues.TryGetValue(parametro.Name, out var valor)
                    && valor is string texto
                    && texto.Length > 0 => texto,
            _ => null,
        };
    }
}
