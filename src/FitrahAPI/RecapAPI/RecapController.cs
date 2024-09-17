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
        try
        {
            string currentYear;
            if (period==null){
                currentYear = DateTime.Now.Year.ToString();
                var dto = _service.Get(currentYear);
                return Ok(new ResponseDTO<RecapIndexDto>(){
                    Message = ConstantConfigs.MESSAGE_GET("Rekap"),
                    Status = ConstantConfigs.STATUS_OK,
                    Data = dto,
                });
            } 
            else {
                var dto = _service.Get(period);
                return Ok(new ResponseDTO<RecapIndexDto>(){
                    Message = ConstantConfigs.MESSAGE_GET("Rekap"),
                    Status = ConstantConfigs.STATUS_OK,
                    Data = dto,
                });
            }      
        }
        catch (System.Exception)
        {
            return BadRequest(new ResponseDTO<string>(){
                Message = ConstantConfigs.MESSAGE_FAILED,
                Status = ConstantConfigs.STATUS_FAILED,
            });
        }

    }
    [HttpGet("{date}")]
    public IActionResult Get(DateTime date)
    {
        try
        {
            var dto = _service.Get(date);
            return Ok(new ResponseDTO<RecapUpsertDto>(){
                Message = ConstantConfigs.MESSAGE_GET("Rekap"),
                Status = ConstantConfigs.STATUS_OK,
                Data = dto,
            });
        }
        catch (System.Exception)
        {
            return BadRequest(new ResponseDTO<string>(){
                Message = ConstantConfigs.MESSAGE_FAILED,
                Status = ConstantConfigs.STATUS_FAILED,
            });
        }

    }
    [HttpPatch("{date}")]
    public IActionResult Upload([FromForm] RecapUpsertDto dto)
    {
        try
        {
            var result = _service.Upload(dto);
            return Ok(new ResponseDTO<string>(){
                Message = ConstantConfigs.MESSAGE_PUT(result),
                Status = ConstantConfigs.STATUS_OK
            });
        }
        catch (System.Exception)
        {
            return BadRequest(new ResponseDTO<string>(){
                Message = ConstantConfigs.MESSAGE_FAILED,
                Status = ConstantConfigs.STATUS_FAILED,
            });
        }

    }
    
    [HttpGet("image/{fileName}")]
    public IActionResult GetImage(string fileName)
    {
        var path = Path.Combine(Directory.GetCurrentDirectory(), "Images", fileName);
        var image = System.IO.File.OpenRead(path);
        return File(image, "image/jpeg");
    }
}
