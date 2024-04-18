using Microsoft.AspNetCore.Mvc;


namespace FitrahWeb.Controllers;

public class DashboardController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
