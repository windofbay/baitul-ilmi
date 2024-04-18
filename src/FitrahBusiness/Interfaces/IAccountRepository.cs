using FitrahDataAccess.Models;

namespace FitrahBusiness;

public interface IAccountRepository
{
    List<Account> Get();
}
