﻿using Microsoft.AspNetCore.Mvc;

namespace FitrahWeb.Controllers;

public class HistoryController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
