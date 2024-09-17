using Microsoft.AspNetCore.Mvc.Rendering;

namespace FitrahAPI.HistoryAPI;

public class HistoryIndexDto
{
    public PaginationDto Pagination { get; set; }  = new PaginationDto();
    public List<HistoryDto> Histories { get; set; } = new List<HistoryDto>();
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Year { get; set; }
    public List<SelectListItem> Years { get; set; } = new List<SelectListItem>();

}
