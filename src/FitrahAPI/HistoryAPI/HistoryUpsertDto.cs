using Microsoft.AspNetCore.Mvc.Rendering;

namespace FitrahAPI.HistoryAPI;

public class HistoryUpsertDto
{
    public string? Code { get; set; } 
    public string MuzakkiName { get; set; } = null!;
    public string Address { get; set; } = null!;
    public int? Quantity { get; set; }
    public decimal? FitrahMoney { get; set; }
    public decimal? FitrahRice { get; set; }
    public decimal? InfaqMoney { get; set; }
    public decimal? InfaqRice { get; set; }
    public decimal? FidiyaMoney { get; set; }
    public decimal? FidiyaRice { get; set; }
    public decimal? MaalMoney { get; set; }
    public decimal? MaalRice { get; set; }
    public string AmilUsername { get; set; } = null!;
    public string? Note { get; set; }
    public List<SelectListItem> Amils { get; set; } = new List<SelectListItem>();
    public DateTime Date { get; set; } 
}
