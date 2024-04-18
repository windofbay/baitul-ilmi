using Microsoft.AspNetCore.Mvc;

namespace FitrahWeb.Controllers;

public class RecapController : Controller
{
    public IActionResult Index()
    {
        return View();
    }   
}
