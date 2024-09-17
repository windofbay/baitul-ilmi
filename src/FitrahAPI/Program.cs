using System.Text;
using FitrahDataAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
namespace FitrahAPI;

public class Program
{
    public static void Main(string[] args)
    {
        var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                            policy  =>
                            {
                                policy.AllowAnyOrigin()
                                .AllowAnyMethod()
                                .AllowAnyHeader() ;
                            });
        });
        builder.Services.AddSwaggerGen();
        IConfiguration configuration = builder.Configuration;
        IServiceCollection services = builder.Services;
        services.AddControllers();
        services.AddBusinessService();
        services.AddSwaggerGen(
            options => {
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "FitrahAPI", Version = "v1" });
                
            }
        );
        Dependencies.ConfigureService(configuration,services);

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(option => {
                option.TokenValidationParameters = new TokenValidationParameters(){
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value)
                    ),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        var app = builder.Build();
        
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseRouting();
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseCors(MyAllowSpecificOrigins);
        app.MapControllers();
        app.Run();
    }
}