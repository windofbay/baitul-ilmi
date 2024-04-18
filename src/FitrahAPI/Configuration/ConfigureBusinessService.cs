using FitrahAPI.HistoryAPI;
using FitrahAPI.RecapAPI;
using FitrahBusiness;
using FitrahBusiness.Interfaces;
using FitrahBusiness.Repositories;

namespace FitrahAPI;

public static class ConfigureBusinessService
{
    public static IServiceCollection AddBusinessService(this IServiceCollection services)
    {
        services.AddScoped<IHistoryRepository,HistoryRepository>();
        services.AddScoped<IAccountRepository,AccountRepository>();
        services.AddScoped<HistoryService>();
        services.AddScoped<RecapService>();
        services.AddScoped<IRecapRepository,RecapRepository>();
        return services;
    }
}
