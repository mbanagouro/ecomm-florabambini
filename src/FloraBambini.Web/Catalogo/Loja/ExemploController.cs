using Microsoft.AspNetCore.Mvc;

namespace FloraBambini.Web.Catalogo.Loja;

// Controller de exemplo da T-01: prova a convenção de views por módulo. Sai na T-24.
public class ExemploController : Controller
{
    public IActionResult Index() => View();
}
