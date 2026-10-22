using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;

namespace FloraBambini.Tests.Infra;

/// <summary>
/// Sobe a aplicação em memória para os testes de integração. Usa um ambiente próprio para
/// que os testes não dependam de user secrets nem de nada registrado só em <c>Development</c>.
/// </summary>
public class AplicacaoDeTeste : WebApplicationFactory<Program>
{
    public const string Ambiente = "Testing";

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment(Ambiente);
    }
}
