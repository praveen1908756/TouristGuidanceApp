using capstoneBackend.Models;
using capstoneBackend.Repository;
using capstoneBackend.Repository.Interfaces;
using capstoneBackend.Services.Interfaces;

namespace capstoneBackend.Services
{
    public class TouristServiceImpl : ITouristService
    {
        private readonly ITouristRepo _touristRepo;

        public TouristServiceImpl(ITouristRepo touristRepo)
        {
            _touristRepo = touristRepo;
        }

        public List<City> GetCities()
        {
            return _touristRepo.GetCities();
        }
        
        public List<Places> GetPlacesByID(int id)
        {
            return _touristRepo.GetPlacesByID(id);
        }
        public void AddCity(City city)
        {
            _touristRepo.AddCity(city);
        }

        public string DeleteCity(int id)
        {
            return _touristRepo.DeleteCity(id);
        }

        public string DeletePlace(int id)
        {
            return _touristRepo.DeletePlace(id);
        }


        public string AddPlace(Places place)
        {
            return _touristRepo.AddPlace(place);
        } 
        
        public void BookPlace(Bookings book)
        {
            _touristRepo.BookPlace(book);
        }

        public List<Bookings> GetBookings(string email)
        {
            return _touristRepo.GetBookings(email);
        }

        public City GetCity(int id)
        {
            return _touristRepo.GetCity(id);
        }
        public Places GetPlace(int id)
        {
            return _touristRepo.GetPlace(id);
        }
    }
}
