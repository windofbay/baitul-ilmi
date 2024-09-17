using Microsoft.AspNetCore.Mvc;

namespace FitrahAPI.HistoryAPI;
[ApiController]
[Route("api/[controller]")]
public class HistoryController : ControllerBase
{
    private readonly HistoryService _service;

    public HistoryController(HistoryService service)
    {
        _service = service;
    }

    [HttpGet("histories")]
    public IActionResult Get(string? name,string? address, string? period,int page=1, int pageSize=10)
    {
        //GATAU KENAPA ITU KLO PARAMETERNYA PAKE "year" value-nya jadi NULL
        //terus, JADI GW GANTI PAKE "period"
        string currentYear;
        if (name==null && address==null && period==null){
            currentYear = DateTime.Now.Year.ToString();
            var dto = _service.Get(page,pageSize,name,address,currentYear);
            return Ok(dto);
        } 
        else {
            var dto = _service.Get(page,pageSize,name,address,period);
            return Ok(dto);
        }
    }
    [HttpGet("insert")]
    public IActionResult Get()
    {
        var dto = _service.Get();
        return Ok(dto);
    }
    [HttpPost]
    public IActionResult Insert(HistoryUpsertDto history) 
    {
        var dto = _service.Insert(history);
        return Created("Insert",dto);
    }
    [HttpGet("{code}/edit")]
    public IActionResult Edit(string code)
    {
        var dto = _service.Get(code);
        return Ok(dto);
    }
    [HttpPatch("{code}/edit")]
    public IActionResult Edit(HistoryUpsertDto history)
    {
        var dto = _service.Update(history);
        return Ok(dto);
    }
}
