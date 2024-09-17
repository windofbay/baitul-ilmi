using Microsoft.AspNetCore.Mvc;

namespace FitrahAPI.RecapAPI;
[Route("api/[controller]")]
[ApiController]
public class RecapController : ControllerBase
{
    private readonly RecapService _service;

    public RecapController(RecapService service)
    {
        _service = service;
    }
    [HttpGet]
    public IActionResult Get(string? period="")
    {
        string currentYear;
        if (period==null){
            currentYear = DateTime.Now.Year.ToString();
            var dto = _service.Get(currentYear);
            return Ok(dto);
        } 
        else {
            var dto = _service.Get(period);
            return Ok(dto);
        }
    }
    [HttpGet("{date}")]
    public IActionResult Get(DateTime date)
    {
        var dto = _service.Get(date);
        return Ok(dto);
    }
    [HttpPatch("{date}")]
    public IActionResult Upload([FromForm] RecapUpsertDto dto)
    {
        var result = _service.Upload(dto);
        return Ok(result);
    }
    [HttpGet("image/{fileName}")]
    public IActionResult GetImage(string fileName)
    {
        var path = Path.Combine(Directory.GetCurrentDirectory(), "Images", fileName);
        var image = System.IO.File.OpenRead(path);
        return File(image, "image/jpeg");
    }
}
