using FitrahDataAccess.Models;

namespace FitrahBusiness;

public class AccountRepository : IAccountRepository
{
    private readonly FitrahContext _dbContext;

    public AccountRepository(FitrahContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<Account> Get()
    {
        return _dbContext.Accounts.ToList();
    }
}
