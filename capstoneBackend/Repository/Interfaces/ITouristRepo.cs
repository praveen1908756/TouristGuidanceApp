using capstoneBackend.Models;

namespace capstoneBackend.Repository.Interfaces
{
    public interface ITouristRepo
    {
        List<City> GetCities();
        List<Places> GetPlacesByID(int id);
        void AddCity(City city);
        string DeleteCity(int id);
        string DeletePlace(int id);
        string AddPlace(Places places);
        void BookPlace(Bookings book);
        City GetCity(int id);
        Places GetPlace(int id);
        List<Bookings> GetBookings(string email);
    }
}
