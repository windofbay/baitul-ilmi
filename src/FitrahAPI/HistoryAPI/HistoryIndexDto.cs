using Microsoft.AspNetCore.Mvc.Rendering;

namespace FitrahAPI.HistoryAPI;

public class HistoryIndexDto
{
    public PaginationDto Pagination { get; set; }
    public List<HistoryDto> Histories { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Year { get; set; }
    public List<SelectListItem> Years { get; set; } = new List<SelectListItem>();
    //public List<SelectListItem> Categories { get; set; }

}
