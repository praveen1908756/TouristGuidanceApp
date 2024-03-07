import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { City } from 'src/app/shared/models/City';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent implements OnInit {
  cities: City[];
  filteredCities: City[];
  userRole: string;

  constructor(
    private api: ApiService,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCities();
    this.userRole = sessionStorage.getItem('role');
  }

  getAllCities(): void {
    this.api.getCities().subscribe({
      next: (res: City[]) => {
        for (let i = 0; i < res.length; i++) {
          res[i].cityDesc = res[i].cityDesc.slice(2, -2);
        }
        this.cities = res;
        this.filteredCities = [...res];
      },
      error: () => {
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  onSearchByCityName(value: string): void {
    this.filteredCities = this.cities.filter((city) =>
      city.cityName.toLowerCase().includes(value.toLowerCase())
    );
  }

  onSearchByCityRating(value: string): void {
    const rating = parseFloat(value);
    if (!isNaN(rating)) {
      this.filteredCities = this.cities.filter(
        (city) => city.cityRating > rating
      );
    }
  }

  deleteCity(cityID: number): void {
    this.api.deleteCityByID(cityID).subscribe({
      next: (res: string) => {
        console.log(res);
      },
      error: (err: Error) => {
        console.log(err);
        window.location.reload();
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  sanitizeImageUrl(url: string): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  sendCityID(cityID: number): void {
    this.api.transferCityID(cityID);
    this.router.navigateByUrl(`attractions/places/${cityID}`);
  }

  cityHandler(event: any, id: number): void {
    if (event?.target?.id && event?.target?.id?.includes('delete-city')) {
      this.deleteCity(id);
    } else {
      this.sendCityID(id);
    }
  }

  editCity(cityID: number): void{
    this.router.navigateByUrl(`attractions/editCity/${cityID}`);
  }
}
