using capstoneBackend.Models;
using capstoneBackend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace capstoneBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class touristsController : Controller
    {
        private readonly ITouristService _touristService;

        public touristsController(ITouristService touristService)
        {
            _touristService = touristService;
        }

        [AllowAnonymous] //to allow anyone to access endpoint
        [HttpGet("/getCities")]
        public IActionResult GetCities()
        {
            List<City> cities = _touristService.GetCities();
            List<City> res = new List<City>();

            foreach (City city in cities)
            {
                res.Add(city);
            }

            return Ok(res);
        }

        [AllowAnonymous]
        [HttpGet("/getCityByID")]
        public IActionResult GetCity(int id)
        {
            City res = _touristService.GetCity(id);
            return Ok(res);
        }
        
        [AllowAnonymous]
        [HttpGet("/getPlaceByID")]
        public IActionResult GetPlace(int id)
        {
            Places res = _touristService.GetPlace(id);
            return Ok(res);
        }

        [AllowAnonymous]
        [HttpGet("/getPlacesByID")]
        public IActionResult GetPlacesById(int id)
        {
            List<Places> places = _touristService.GetPlacesByID(id);
            List<Places> res = new List<Places>();

            foreach (Places place in places)
            {
                res.Add(place);
            }

            return Ok(res);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("/addCity")]
        public IActionResult AddCity(City city)
        {
            _touristService.AddCity(city);
            return Ok("City Added!");
        }

        [Authorize(Roles = "admin")]
        [HttpPost("/addPlace")]
        public IActionResult AddPlace(Places place)
        {
            _touristService.AddPlace(place);
            return Ok(new { message = "Place Added!" });
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("/deleteCity")]
        public IActionResult DeleteCity(int id)
        {
            var res = _touristService.DeleteCity(id);
            return Ok(res);
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("/deletePlace")]
        public IActionResult DeletePlace(int id)
        {
            var res = _touristService.DeletePlace(id);
            return Ok(new { message = res });
        }

        [HttpPost("/bookPlace")]
        public IActionResult BookPlace(Bookings book)
        {
            _touristService.BookPlace(book);
            return Ok("Place Booked!");
        }

        [HttpGet("/getBookings")]
        public IActionResult GetBookings(string email)
        {
            List<Bookings> res = _touristService.GetBookings(email);
            return Ok(res);
        }
    }
}
