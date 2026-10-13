using Microsoft.AspNetCore.Mvc;

namespace FloraBambini.Web.Catalogo.Admin;

// Controller de exemplo da T-01: prova a convenção de views por módulo na área. Sai na T-24.
[Area("Admin")]
public class ExemploController : Controller
{
    public IActionResult Index() => View();
}
