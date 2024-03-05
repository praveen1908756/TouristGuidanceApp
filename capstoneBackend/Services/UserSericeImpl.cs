using capstoneBackend.Models;
using capstoneBackend.Repository.Interfaces;
using capstoneBackend.Services.Interfaces;

namespace capstoneBackend.Services
{
    public class UserSericeImpl : IUserService
    {
        private readonly IUserRepo _userRepo;

        public UserSericeImpl(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public Users CreateUser(Users user)
        {
            return _userRepo.CreateUser(user);
        }
        public string LoginUser(Users user)
        {
            return _userRepo.LoginUser(user);
        }
        public string GetRoleByEmail(string email)
        {
            return _userRepo.GetRoleByEmail(email);
        }

        public Users GetUserByEmail(string email)
        {
            return _userRepo.GetUserByEmail(email);
        }

        public string UpdateProfile(Users user)
        {
            return _userRepo.UpdateProfile(user);
        }
    }
}
