
using Microsoft.AspNetCore.Authentication.Cookies;
using FitrahDataAccess;
using FitrahWeb;

namespace TrollMarketWeb;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        IServiceCollection services = builder.Services;
        IConfiguration configuration = builder.Configuration;
        services.AddControllersWithViews();
        services.AddBusinessService();
        Dependencies.ConfigureService(builder.Configuration, builder.Services);
        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
        .AddCookie(options => {
            options.Cookie.Name = "AuthCookie";
            options.LoginPath = "/Login";
            options.ExpireTimeSpan = TimeSpan.FromMinutes(720);
            options.AccessDeniedPath = "/AccessDenied";
        });
        services.AddAuthorization();

        var app = builder.Build();
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllerRoute(
            name: "default",
            pattern : "{controller=Dashboard}/{action=Index}"
        );
        app.UseStaticFiles();
        app.Run();
        CreateHostBuilder(args).Build().Run();
    }
    public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<StartupBase>();
            webBuilder.UseUrls("http://localhost:5003", "https://localhost:5004");
        });
}
