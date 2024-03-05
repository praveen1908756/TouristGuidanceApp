namespace capstoneBackend.Models
{
    public class Bookings
    {
        public string UserEmail { get; set; }
        public string CityName { get; set; }
        public string PlaceName { get; set; }
        public float PlaceRating { get; set; }
        public string PlaceImg { get; set; }
        public int Contact { get; set; }
        public string OpeningHour { get; set; }
        public string ClosingHour { get; set; }
        public string StartMonthToVisit { get; set; }
        public string EndMonthToVisit { get; set; }
    }
}
