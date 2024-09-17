using FitrahAPI.Helper;
using FitrahBusiness;
using FitrahBusiness.Interfaces;
using FitrahDataAccess.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FitrahAPI.HistoryAPI;

public class HistoryService
{
    private readonly IHistoryRepository _historyRepository;
    private readonly IAccountRepository _accountRepository;
    private readonly IRecapRepository _recapRepository;
    public HistoryService(IHistoryRepository historyRepository, IAccountRepository accountRepository, IRecapRepository recapRepository)
    {
        _historyRepository = historyRepository;
        _accountRepository = accountRepository;
        _recapRepository = recapRepository;
    }

    public HistoryIndexDto Get(int page, int pageSize, string name, string address, string year)
    {
        var model = _historyRepository.Get(page,pageSize,name,address,year)
        .Select(history=>new HistoryDto(){
            MuzakkiName = history.MuzakkiName,
            Address = history.Address,
            Quantity = history.Quantity,
            Date = Convertion.ConvertToIndonesianDate(history.Date),
            FitrahMoney = Convertion.ConvertToRupiahTwoZeros(history.FitrahMoney)??"-",
            FitrahRice = history.FitrahRice??0,
            InfaqMoney = Convertion.ConvertToRupiahTwoZeros(history.InfaqMoney)??"-",
            InfaqRice = history.InfaqRice??0,
            FidiyaMoney = Convertion.ConvertToRupiahTwoZeros(history.FidiyaMoney)??"-",
            FidiyaRice = history.FidiyaRice??0,
            MaalMoney = Convertion.ConvertToRupiahTwoZeros(history.MaalMoney)??"-",
            MaalRice = history.MaalRice??0,
            AmilUsername = history.AmilUsername,
            Code = history.Code
        });
        return new HistoryIndexDto(){
            Histories = model.ToList(),
            Pagination = new PaginationDto(){
                PageSize = pageSize,
                Page = page,
                TotalRows = _historyRepository.Count(name,address, year)
            },
            Name = name??"",
            Address = address??"",
            Year = year??"",
            Years = GetYears()
        };
    }
    public HistoryDto Insert(HistoryUpsertDto dto)
    {
        //untuk situasi pada waktu pergantian hari
        var recap = _recapRepository.Get(dto.Date);
        if(recap==null){
            var newRecap = new Recap(){
                Date = dto.Date
            };
            _recapRepository.Insert(newRecap);
        };  
        var model = new History(){
            MuzakkiName  = dto.MuzakkiName,
            Address = dto.Address,
            Quantity = dto.Quantity,
            FitrahMoney = dto.FitrahMoney,
            FitrahRice = dto.FitrahRice,
            InfaqMoney = dto.InfaqMoney,
            InfaqRice = dto.InfaqRice,
            FidiyaMoney = dto.FidiyaMoney,
            FidiyaRice = dto.FidiyaRice,
            MaalMoney = dto.MaalMoney,
            MaalRice = dto.MaalRice,
            AmilUsername = dto.AmilUsername,
            Note = dto.Note,
            Code = GenerateCode(dto.MuzakkiName),
            Date = dto.Date
        };
        var inserted = _historyRepository.Insert(model);
        return new HistoryDto(){
            Code = inserted.Code,
            MuzakkiName = inserted.MuzakkiName,
            Date = Convertion.ConvertToIndonesianDate(inserted.Date),
            AmilUsername = inserted.AmilUsername
        };
    }

    public HistoryUpsertDto Get()
    {
        return new HistoryUpsertDto(){

            Amils = GetAmils()
        };
    }
    public HistoryUpsertDto Get(string code)
    {
        var model = _historyRepository.Get(code);
        return new HistoryUpsertDto(){
            Code = model.Code,
            MuzakkiName = model.MuzakkiName,
            Address = model.Address,
            Quantity = model.Quantity,
            FidiyaMoney = model.FidiyaMoney,
            FidiyaRice = model.FidiyaRice,
            FitrahMoney = model.FitrahMoney,
            FitrahRice = model.FitrahRice,
            InfaqMoney = model.InfaqMoney,
            InfaqRice = model.InfaqRice,
            MaalMoney = model.MaalMoney,
            MaalRice = model.MaalRice,
            AmilUsername = model.AmilUsername,
            Note = model.Note,
            Date = model.Date,
            Amils = GetAmils()
        };
    }
    public HistoryUpsertDto Update(HistoryUpsertDto dto)
    {
        var model = _historyRepository.Get(dto.Code);
        model.MuzakkiName = dto.MuzakkiName;
        model.Quantity = dto.Quantity;
        model.Address = dto.Address;
        model.FitrahMoney = dto.FitrahMoney;
        model.FitrahRice = dto.FitrahRice;
        model.InfaqMoney = dto.InfaqMoney;
        model.InfaqRice = dto.InfaqRice;
        model.MaalMoney = dto.MaalMoney;
        model.MaalRice = dto.MaalRice;
        model.FidiyaMoney = dto.FidiyaMoney;
        model.FidiyaRice = dto.FidiyaRice;
        model.Note = dto.Note;
        model.AmilUsername = dto.AmilUsername;
        model.Date = dto.Date;
        var updated = _historyRepository.Update(model);
        return new HistoryUpsertDto (){
            Code = updated.Code,
            MuzakkiName = updated.MuzakkiName,
            Quantity = updated.Quantity,
            FitrahMoney = updated.FitrahMoney,
            FitrahRice = updated.FitrahRice,
            FidiyaMoney = updated.FidiyaMoney,
            FidiyaRice = updated.FidiyaRice,
            InfaqMoney = updated.InfaqMoney,
            InfaqRice = updated.InfaqRice,
            MaalMoney = updated.MaalMoney,
            MaalRice = updated.MaalRice,
            Note = updated.Note,
            Date = updated.Date
        };
    }
    private List<SelectListItem> GetYears()
    {
        var models = _historyRepository.GetYears();
        List<SelectListItem> years = models
        .Select(year => 
            new SelectListItem(){
                Text = year.ToString(),
                Value = year.ToString()
            }
        )
        .ToList();
        return years;
    }
    private List<SelectListItem> GetAmils()
    {
        var models = _accountRepository.Get();
        List<SelectListItem> amils = models
        .Select(account => 
            new SelectListItem(){
                Text = account.Username,
                Value = account.Username
        })
        .ToList();
        return amils;
    }
    private  Random random = new Random();



    private  string GenerateCode(string name)
    {
        string nameCode = name.Substring(0, Math.Min(name.Length, 3)).ToUpper();
        string dateCode = DateTime.Today.ToString("yyyyMMdd");
        string randomNumber = random.Next(100, 1000).ToString();
        string code = $"{nameCode}{dateCode}{randomNumber}";
        return code;
    }   
}
