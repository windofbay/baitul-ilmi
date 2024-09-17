using FitrahAPI.RecapAPI;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FitrahAPI;

public class RecapIndexDto
{
    public string? Year { get; set; }
    public List<SelectListItem> Years { get; set; } = new List<SelectListItem>();
    public List<RecapDto>? Recaps { get; set; }
    public OverallRecapDto?  OverallRecap { get; set; }
}
