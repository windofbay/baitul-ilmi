namespace FitrahAPI.RecapAPI;

public class RecapUpsertDto
{
    public DateTime Date { get; set; }
    public IFormFile? Image{ get; set; }
    public string? ImageName { get; set; }

}
