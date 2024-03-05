namespace capstoneBackend.Models
{
    public class Places
    {
        public int CityID { get; set; }
        public int PlaceID { get; set; }
        public string PlaceName { get; set; }
        public float PlaceRating { get; set; }
        public int DistFromCity { get; set; }
        public string PlaceDesc { get; set; }
        public string PlaceImg { get; set; }
        public string PlaceCoords { get; set; }
        public string OpeningHour { get; set; }
        public string ClosingHour { get; set; }
        public string Contact { get; set; } 
    }
}
