using capstoneBackend.Models;

namespace capstoneBackend.Services.Interfaces
{
    public interface ITouristService
    {
        List<City> GetCities();
        List<Places> GetPlacesByID(int id);
        void AddCity(City city);
        string DeleteCity(int id);
        string DeletePlace(int id);
        string AddPlace(Places place);
        City GetCity(int id);
        Places GetPlace(int id);
        void BookPlace(Bookings book);
        List<Bookings> GetBookings(string email);
    }
}
