using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace FloraBambini.Web.Catalogo.Dominio;

/// <summary>
/// Segmento de endereço de categoria e de produto (RN-03, ADR-010): só letras minúsculas sem
/// acento, dígitos e hífen, sem hífen repetido nem nas pontas.
/// </summary>
public static partial class Slug
{
    /// <summary>
    /// Sugere o slug a partir de um nome: tira os acentos, passa para minúsculas e troca
    /// espaço e pontuação por hífen. Devolve texto vazio quando o nome não tem letra nem dígito.
    /// </summary>
    public static string GerarAPartirDe(string nome)
    {
        var semAcentos = new StringBuilder(nome.Length);

        foreach (var caractere in nome.Normalize(NormalizationForm.FormD))
        {
            if (CharUnicodeInfo.GetUnicodeCategory(caractere) != UnicodeCategory.NonSpacingMark)
            {
                semAcentos.Append(char.ToLowerInvariant(caractere));
            }
        }

        return ForaDoPadrao().Replace(semAcentos.ToString(), "-").Trim('-');
    }

    /// <summary>Diz se um slug digitado está no formato aceito.</summary>
    public static bool EhValido(string? slug) =>
        !string.IsNullOrEmpty(slug) && Padrao().IsMatch(slug);

    [GeneratedRegex(@"^[a-z0-9]+(?:-[a-z0-9]+)*\z")]
    private static partial Regex Padrao();

    [GeneratedRegex("[^a-z0-9]+")]
    private static partial Regex ForaDoPadrao();
}
