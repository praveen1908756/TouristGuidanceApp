using capstoneBackend.Models;
using capstoneBackend.Repository.Interfaces;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;

namespace capstoneBackend.Repository
{
    public class UserRepo : IUserRepo
    {
        string connectionString = "";

        public UserRepo()
        {
            connectionString = @"Data Source=APINP-ELPTSSU5O\SQLEXPRESS;Initial Catalog=touristCapstone;Persist Security Info=True;User ID=tap2023;Password=tap2023;Encrypt=False;MultipleActiveResultSets=true;";
        }

        public Users CreateUser(Users userInput)
        {
            List<Users> users = new List<Users>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd;
                SqlDataReader rdr;

                string query = $"SELECT * FROM Users";
                cmd = new SqlCommand(query, con);
                rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    Users user = new Users();
                    user.UserID = Int32.Parse(rdr["UserID"].ToString());
                    user.UserRole = rdr["UserRole"].ToString();
                    user.UserName = rdr["UserName"].ToString();
                    user.UserEmail = rdr["Email"].ToString();
                    user.Contact = long.Parse(rdr["Contact"].ToString());
                    user.Password = rdr["Password"].ToString();

                    users.Add(user);
                }
                con.Close();

                foreach (var x in users)
                {
                    Console.WriteLine(x);
                    if (x.UserEmail == userInput.UserEmail)
                    {
                        return new Users();
                    }
                }
            }

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO Users (UserRole, UserName, Email, Contact, Password) values(@UserRole, @UserName, @Email, @Contact, @Password)";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@UserRole", userInput.UserRole);
                cmd.Parameters.AddWithValue("@UserName", userInput.UserName);
                cmd.Parameters.AddWithValue("@Email", userInput.UserEmail);
                cmd.Parameters.AddWithValue("@Contact", userInput.Contact);
                userInput.Password = hashPassword(userInput.Password);    // hash password
                cmd.Parameters.AddWithValue("@Password", userInput.Password);

                con.Open();
                cmd.ExecuteNonQuery();
            }
            return userInput;
        }

        public string LoginUser(Users userInput)        // check if user exists and return required
        {
            List<Users> users = new List<Users>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd;
                SqlDataReader rdr;

                string query = $"SELECT * FROM Users";
                cmd = new SqlCommand(query, con);
                rdr = cmd.ExecuteReader();
                
                while (rdr.Read())
                {
                    Users user = new Users();
                    user.UserID = Int32.Parse(rdr["UserID"].ToString());
                    user.UserRole = rdr["UserRole"].ToString();
                    user.UserName = rdr["UserName"].ToString();
                    user.UserEmail = rdr["Email"].ToString();
                    user.Contact = long.Parse(rdr["Contact"].ToString());
                    user.Password = rdr["Password"].ToString();

                    users.Add(user);
                }
                con.Close();

                foreach(var x in users)
                {
                    Console.WriteLine(x);
                    if(x.UserEmail == userInput.UserEmail)
                    {
                        if (x.Password == hashPassword(userInput.Password))
                        {
                            return "Logged In!";
                        }
                        else
                        {
                            return "Wrong Password";
                        }
                    }
                }
                return "Email ID Not Registered... Try Again!";
            }
        }

        public string GetRoleByEmail(string email)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd;
                SqlDataReader rdr;

                string query = "SELECT UserRole FROM Users WHERE Email = @Email";
                cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@Email", email);
                rdr = cmd.ExecuteReader();

                while(rdr.Read())
                {
                    return rdr["UserRole"].ToString();
                }
                return null;
            }
        }

        public Users GetUserByEmail(string email)
        {
            using(SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd;
                SqlDataReader rdr;

                string query = "SELECT * FROM Users WHERE Email = @Email";
                cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@Email", email);
                rdr = cmd.ExecuteReader();

                Users user = new Users();
                while (rdr.Read())
                {
                    user.UserID = Int32.Parse(rdr["UserID"].ToString());
                    user.UserRole = rdr["UserRole"].ToString();
                    user.UserName = rdr["UserName"].ToString();
                    user.UserEmail = rdr["Email"].ToString();
                    user.Contact = long.Parse(rdr["Contact"].ToString());
                    user.Password = rdr["Password"].ToString();
                }
                return user;
            }
        }

        public string UpdateProfile(Users user)
        {
            using(SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd;
                SqlDataReader rdr;

                string query = "UPDATE Users SET UserRole=@UserRole, UserName=@UserName, Contact=@Contact, Password=@Password WHERE Email=@Email";
                cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@UserRole", user.UserRole);
                cmd.Parameters.AddWithValue("@UserName", user.UserName);
                cmd.Parameters.AddWithValue("@Email", user.UserEmail);
                cmd.Parameters.AddWithValue("@Contact", user.Contact);
                user.Password = hashPassword(user.Password);
                cmd.Parameters.AddWithValue("@Password", user.Password);
                rdr = cmd.ExecuteReader();

                return "Profile Updated!";
            }
        }

        public string hashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] arr = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder sb = new StringBuilder();
                foreach (var i in arr)
                {
                    sb.Append(i.ToString("x2"));
                }
                return sb.ToString();
            }
        }
    }
}
