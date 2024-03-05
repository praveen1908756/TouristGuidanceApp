using capstoneBackend.Models;

namespace capstoneBackend.Services.Interfaces
{
    public interface IUserService
    {
        Users CreateUser(Users user);
        string LoginUser(Users user);
        string GetRoleByEmail(string email);
        Users GetUserByEmail(string email);
        string UpdateProfile(Users user);
    }
}
