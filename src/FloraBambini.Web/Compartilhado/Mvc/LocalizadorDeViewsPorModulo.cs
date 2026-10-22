using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Razor;

namespace FloraBambini.Web.Compartilhado.Mvc;

/// <summary>
/// Faz o MVC procurar as views dentro da pasta do módulo de negócio do controller (ADR-001):
/// <c>/{Modulo}/Loja/Views</c> para a loja e <c>/{Modulo}/{Area}/Views</c> para uma área,
/// com <c>/Compartilhado/Views</c> como último recurso. O módulo é o primeiro segmento do
/// namespace do controller depois do namespace raiz da aplicação.
/// </summary>
public sealed class LocalizadorDeViewsPorModulo : IViewLocationExpander
{
    private const string ChaveDoModulo = "modulo";
    private const string PastaDaLoja = "Loja";

    private static readonly string PrefixoDoNamespaceRaiz =
        typeof(LocalizadorDeViewsPorModulo).Assembly.GetName().Name + ".";

    public void PopulateValues(ViewLocationExpanderContext context)
    {
        if (context.ActionContext.ActionDescriptor is ControllerActionDescriptor acao
            && ModuloDe(acao.ControllerTypeInfo.Namespace) is { } modulo)
        {
            context.Values[ChaveDoModulo] = modulo;
        }
    }

    public IEnumerable<string> ExpandViewLocations(
        ViewLocationExpanderContext context,
        IEnumerable<string> viewLocations)
    {
        if (context.Values.TryGetValue(ChaveDoModulo, out var modulo))
        {
            var pasta = string.IsNullOrEmpty(context.AreaName) ? PastaDaLoja : context.AreaName;

            yield return $"/{modulo}/{pasta}/Views/{{1}}/{{0}}.cshtml";
            yield return $"/{modulo}/{pasta}/Views/Shared/{{0}}.cshtml";
        }

        yield return "/Compartilhado/Views/{0}.cshtml";
    }

    private static string? ModuloDe(string? namespaceDoController)
    {
        if (namespaceDoController is null
            || !namespaceDoController.StartsWith(PrefixoDoNamespaceRaiz, StringComparison.Ordinal))
        {
            return null;
        }

        var resto = namespaceDoController[PrefixoDoNamespaceRaiz.Length..];
        var fim = resto.IndexOf('.');

        return fim < 0 ? resto : resto[..fim];
    }
}
