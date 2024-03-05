using capstoneBackend.Models;
using capstoneBackend.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace capstoneBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public UserController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        private string GenerateJwtToken(Users user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserID.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.UserEmail),
                new Claim(ClaimTypes.Role, user.UserRole)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("/register")]
        public IActionResult CreateUser([FromBody] Users users)
        {
            var user = _userService.CreateUser(users);
            if (user == null || user.UserEmail == null)
            {
                return Json(new { message = "User Already Exists... Try Again!" });
            }
            else
            {
                return Json(new { message = "User Registered!" });
            }
        }

        [HttpPost("/login")]
        public IActionResult LoginUser([FromBody] Users users)
        {
            string res = _userService.LoginUser(users);
            if(res == "Logged In!")
            {
                var authToken = GenerateJwtToken(users);
                return Ok(new { message = res, email = users.UserEmail, authToken = authToken });
            }
            else
            {
                return Ok(new { message = res, authToken = "" });
            }
        }
     
        [HttpGet("/getRoleByEmail")]
        public IActionResult GetRoleByEmail([FromBody]string email)
        {
            var res = _userService.GetRoleByEmail(email);
            return Ok(res);
        }

        [HttpGet("/getUserByEmail")]
        public IActionResult GetUserByEmail(string email)
        {
            var res = _userService.GetUserByEmail(email);
            return Ok(res);
        }

        [HttpPut("/updateProfile")]
        public IActionResult UpdateProfile(Users users)
        {
            var res = _userService.UpdateProfile(users);
            return Ok(new { message = res, AuthenticationToken = GenerateJwtToken(users) });
        }
    }
}
