namespace capstoneBackend.Models
{
    public class City
    {
        public int CityID { get; set; }
        public string CityName { get; set; }
        public float CityRating { get; set; }
        public string StartMonthToVisit { get; set; }
        public string EndMonthToVisit { get; set; }
        public string CityDesc { get; set; }
        public string CityImg { get; set; }
        public string CityCoords { get; set; }
    }
}
