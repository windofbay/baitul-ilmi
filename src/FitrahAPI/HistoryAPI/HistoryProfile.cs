using System;
using AutoMapper;
using FitrahDataAccess.Models;

namespace FitrahAPI.HistoryAPI;

public class HistoryProfile : Profile
{
    public HistoryProfile()
    {
        CreateMap<History, HistoryDto>().ReverseMap();
        CreateMap<History, HistoryUpsertDto>().ReverseMap();
        CreateMap<History, HistoryIndexDto>().ReverseMap();
    }
}
