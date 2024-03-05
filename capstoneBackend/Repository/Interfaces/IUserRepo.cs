using capstoneBackend.Models;

namespace capstoneBackend.Repository.Interfaces
{
    public interface IUserRepo
    {
        Users CreateUser(Users user);
        string LoginUser(Users userInput);
        string GetRoleByEmail(string email);
        Users GetUserByEmail(string email);
        string UpdateProfile(Users user);
    }
}
