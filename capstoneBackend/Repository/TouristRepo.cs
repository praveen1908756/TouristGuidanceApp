using capstoneBackend.Models;
using capstoneBackend.Repository.Interfaces;
using System.Data.SqlClient;
using System.Runtime.Intrinsics.Arm;

namespace capstoneBackend.Repository
{
    public class TouristRepo : ITouristRepo
    {
        string connectionString = "";

        public TouristRepo()
        {
            connectionString = @"Data Source=APINP-ELPTSSU5O\SQLEXPRESS;Initial Catalog=touristCapstone;Persist Security Info=True;User ID=tap2023;Password=tap2023;Encrypt=False;MultipleActiveResultSets=true;";
        }

        public List<City> GetCities()
        {
            List<City> cities = new List<City>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd;
                SqlDataReader rdr;
                string query = $"SELECT * FROM Cities";
                cmd = new SqlCommand(query, con);
                rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    City city = new City();
                    city.CityID = Int32.Parse(rdr["CityID"].ToString());
                    city.CityName = rdr["CityName"].ToString();
                    city.CityRating = float.Parse(rdr["CityRating"].ToString());
                    city.StartMonthToVisit = rdr["StartMonthToVisit"].ToString();
                    city.EndMonthToVisit = rdr["EndMonthToVisit"].ToString();
                    city.CityDesc = rdr["CityDesc"].ToString();
                    city.CityImg = rdr["CityImg"].ToString();
                    city.CityCoords = rdr["CityCoords"].ToString();

                    cities.Add(city);
                }
                con.Close();

                return cities;
            }
        }

        public List<Places> GetPlacesByID(int id)
        {
            List<Places> places = new List<Places>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd;
                SqlDataReader rdr;
                string query = $"SELECT * FROM Places WHERE CityID = {id}";
                cmd = new SqlCommand(query, con);
                rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    Places place = new Places();
                    place.CityID = Int32.Parse(rdr["CityID"].ToString());
                    place.PlaceID = Int32.Parse(rdr["PlaceID"].ToString());
                    place.PlaceName = rdr["PlaceName"].ToString();
                    place.PlaceRating = float.Parse(rdr["PlaceRating"].ToString());
                    place.DistFromCity = Int32.Parse(rdr["DistFromCity"].ToString());
                    place.PlaceDesc = rdr["PlaceDesc"].ToString();
                    place.PlaceImg = rdr["PlaceImg"].ToString();
                    place.PlaceCoords = rdr["PlaceCoords"].ToString();
                    place.OpeningHour = rdr["OpeningHour"].ToString();
                    place.ClosingHour = rdr["ClosingHour"].ToString();
                    place.Contact = rdr["Contact"].ToString();
                    places.Add(place);
                }
                con.Close();

                return places;
            }
        }

        public void AddCity(City city)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO Cities (CityID, CityName, CityRating, StartMonthToVisit, EndMonthToVisit, CityDesc, CityImg, CityCoords) values((SELECT MAX(CityID) FROM Cities) + 1, @CityName, @CityRating, @StartMonthToVisit, @EndMonthToVisit, @CityDesc, @CityImg, @CityCoords);";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@CityName", city.CityName);
                cmd.Parameters.AddWithValue("@CityRating", city.CityRating);
                cmd.Parameters.AddWithValue("@StartMonthToVisit", city.StartMonthToVisit);
                cmd.Parameters.AddWithValue("@EndMonthToVisit", city.EndMonthToVisit);
                cmd.Parameters.AddWithValue("@CityDesc", city.CityDesc);
                cmd.Parameters.AddWithValue("@CityImg", city.CityImg);
                cmd.Parameters.AddWithValue("@CityCoords", city.CityCoords);

                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public City GetCity(int id)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Cities WHERE CityID=@CityID";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@CityID", id);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                City city = new City();
                while (rdr.Read())
                {
                    city.CityID = Int32.Parse(rdr["CityID"].ToString());
                    city.CityName = rdr["CityName"].ToString();
                    city.CityRating = float.Parse(rdr["CityRating"].ToString());
                    city.StartMonthToVisit = rdr["StartMonthToVisit"].ToString();
                    city.EndMonthToVisit = rdr["EndMonthToVisit"].ToString();
                    city.CityDesc = rdr["CityDesc"].ToString();
                    city.CityImg = rdr["CityImg"].ToString();
                    city.CityCoords = rdr["CityCoords"].ToString();
                }
                return city;
            }
        }

        public Places GetPlace(int placeID)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Places WHERE PlaceID=@PlaceID";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@PlaceID", placeID);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                Places place = new Places();
                while (rdr.Read())
                {
                    place.CityID = Int32.Parse(rdr["CityID"].ToString());
                    place.PlaceID = Int32.Parse(rdr["PlaceID"].ToString());
                    place.PlaceName = rdr["PlaceName"].ToString();
                    place.PlaceRating = float.Parse(rdr["PlaceRating"].ToString());
                    place.DistFromCity = Int32.Parse(rdr["DistFromCity"].ToString());
                    place.PlaceDesc = rdr["PlaceDesc"].ToString();
                    place.PlaceImg = rdr["PlaceImg"].ToString();
                    place.PlaceCoords = rdr["PlaceCoords"].ToString();
                    place.OpeningHour = rdr["OpeningHour"].ToString();
                    place.ClosingHour = rdr["ClosingHour"].ToString();
                    place.Contact = rdr["Contact"].ToString();
                }
                return place;
            }
        }

        public string AddPlace(Places city)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO Places (CityID, PlaceID, PlaceName, PlaceRating, DistFromCity, PlaceDesc, PlaceImg, PlaceCoords, OpeningHour, ClosingHour, Contact) values(@CityID, (SELECT MAX(PlaceID) FROM Places) + 1, @PlaceName, @PlaceRating, @DistFromCity, @PlaceDesc, @PlaceImg, @PlaceCoords, @OpeningHour, @ClosingHour, @Contact);";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@CityID", city.CityID + 1);
                cmd.Parameters.AddWithValue("@PlaceName", city.PlaceName);
                cmd.Parameters.AddWithValue("@PlaceRating", city.PlaceRating);
                cmd.Parameters.AddWithValue("@DistFromCity", city.DistFromCity);
                cmd.Parameters.AddWithValue("@PlaceDesc", city.PlaceDesc);
                cmd.Parameters.AddWithValue("@PlaceImg", city.PlaceImg);
                cmd.Parameters.AddWithValue("@PlaceCoords", city.PlaceCoords);
                cmd.Parameters.AddWithValue("@OpeningHour", city.OpeningHour);
                cmd.Parameters.AddWithValue("@ClosingHour", city.ClosingHour);
                cmd.Parameters.AddWithValue("@Contact", city.Contact);

                con.Open();
                cmd.ExecuteNonQuery();
            }
            return "Place Created!";
        }
        
        public void BookPlace(Bookings book)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "INSERT INTO Bookings (UserEmail, CityName, PlaceName, PlaceRating, PlaceImg, Contact, OpeningHour, ClosingHour, StartMonthToVisit, EndMonthToVisit) values(@UserEmail, @CityName, @PlaceName, @PlaceRating, @PlaceImg, @Contact, @OpeningHour, @ClosingHour, @StartMonthToVisit, @EndMonthToVisit);";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@UserEmail", book.UserEmail);
                cmd.Parameters.AddWithValue("@PlaceName", book.PlaceName);
                cmd.Parameters.AddWithValue("@CityName", book.CityName);
                cmd.Parameters.AddWithValue("@PlaceRating", book.PlaceRating);
                cmd.Parameters.AddWithValue("@PlaceImg", book.PlaceImg);
                cmd.Parameters.AddWithValue("@Contact", book.Contact);
                cmd.Parameters.AddWithValue("@OpeningHour", book.OpeningHour);
                cmd.Parameters.AddWithValue("@ClosingHour", book.ClosingHour);
                cmd.Parameters.AddWithValue("@StartMonthToVisit", book.StartMonthToVisit);
                cmd.Parameters.AddWithValue("@EndMonthToVisit", book.EndMonthToVisit);

                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
        public List<Bookings> GetBookings(string email)
        {
            List<Bookings> bookings = new List<Bookings>();
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "SELECT * FROM Bookings WHERE UserEmail=@EmailID";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@EmailID", email);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    Bookings book = new Bookings();
                    book.UserEmail = rdr["UserEmail"].ToString();
                    book.CityName = rdr["CityName"].ToString();
                    book.PlaceName = rdr["PlaceName"].ToString();
                    book.PlaceRating = float.Parse(rdr["PlaceRating"].ToString());
                    book.PlaceImg = rdr["PlaceImg"].ToString();
                    book.Contact = Int32.Parse(rdr["Contact"].ToString());
                    book.OpeningHour = rdr["OpeningHour"].ToString();
                    book.ClosingHour = rdr["ClosingHour"].ToString();
                    book.StartMonthToVisit = rdr["StartMonthToVisit"].ToString();
                    book.EndMonthToVisit = rdr["EndMonthToVisit"].ToString();

                    bookings.Add(book);
                }
                return bookings;
            }
        }

        public string DeleteCity(int cityID)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "DELETE FROM Cities WHERE CityID=@CityID";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@CityID", cityID);
                con.Open();
                cmd.ExecuteNonQuery();
            }

            return "City Deleted!";
        }

        public string DeletePlace(int placeID)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string query = "DELETE FROM Places WHERE PlaceID=@PlaceID";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@PlaceID", placeID);
                con.Open();
                cmd.ExecuteNonQuery();
            }

            return "Place Deleted!";
        }
    }
}
