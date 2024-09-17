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

    [HttpGet]
    public IActionResult Get(string? name,string? address, string? period,int page=1, int pageSize=10)
    {
        try
        {
            string currentYear;
            if (name==null && address==null && period==null){
                currentYear = DateTime.Now.Year.ToString();
                var dto = _service.Get(page,pageSize,name??"",address??"",currentYear);
                return Ok(new ResponseDTO<HistoryIndexDto>(){
                    Message = ConstantConfigs.MESSAGE_GET("Riwayat"),
                    Status = ConstantConfigs.STATUS_OK,
                    Data = dto   
                });
            } 
            else {
                var dto = _service.Get(page,pageSize,name??"",address??"",period??"");
                return Ok(new ResponseDTO<HistoryIndexDto>(){
                    Message = ConstantConfigs.MESSAGE_GET("Riwayat"),
                    Status = ConstantConfigs.STATUS_OK,
                    Data = dto   
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
    [HttpGet("insert")]
    public IActionResult Get()
    {
        try
        {
            var dto = _service.Get();
            return Ok(new ResponseDTO<HistoryUpsertDto>(){
                Message = "Form berhasil didapatkan",
                Status = ConstantConfigs.STATUS_OK,
                Data = dto
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
    [HttpPost]
    public IActionResult Insert(HistoryUpsertDto history) 
    {
        try
        {
            var dto = _service.Insert(history);
            return Ok(new ResponseDTO<string>(){
                Message = ConstantConfigs.MESSAGE_POST("Riwayat"),
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
    [HttpGet("{code}/edit")]
    public IActionResult Edit(string code)
    {
        try
        {
            var dto = _service.Get(code);
            return Ok(new ResponseDTO<HistoryUpsertDto>(){
                Message = ConstantConfigs.MESSAGE_GET("Riwayat"),
                Status = ConstantConfigs.STATUS_OK,
                Data = dto
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
    [HttpPatch("{code}/edit")]
    public IActionResult Edit(HistoryUpsertDto history)
    {
        try
        {
            var dto = _service.Update(history);
            return Ok(new ResponseDTO<string>(){
                Message = ConstantConfigs.MESSAGE_PUT("Riwayat"),
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
}
