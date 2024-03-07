import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Places } from 'src/app/shared/models/Places';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
})
export class PlacesComponent implements OnInit {
  cityID: number;
  places: Places[];
  filteredPlaces: Places[];
  userRole: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private ar: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role');
    this.api.currCityID.subscribe((cityID) => (this.cityID = cityID));

    // subscribe to paramMap
    this.ar.paramMap.subscribe((map) => {
      this.cityID = +map?.get('cityID');
      sessionStorage.setItem('cityID', this.cityID.toString());
    });

    this.getPlacesByID(this.cityID);
  }

  getPlacesByID(cityID: number): void {
    this.api.getPlacesByID(cityID).subscribe({
      next: (res: Places[]) => {
        if (res.length == 0) {
          this.router.navigate(['attractions']);
        }
        for (let i = 0; i < res.length; i++) {
          res[i].placeName = res[i].placeName.slice(4);
        }
        this.places = res;
        this.filteredPlaces = [...res];
      },
      error: () => {
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  onSearchByPlaceName(value: string): void {
    this.filteredPlaces = this.places.filter((city) =>
      city.placeName.toLowerCase().includes(value.toLowerCase())
    );
  }

  onSearchByPlaceRating(value: string): void {
    const rating = parseFloat(value);
    if (!isNaN(rating)) {
      this.filteredPlaces = this.places.filter(
        (city) => city.placeRating > rating
      );
    }
  }

  deletePlace(cityID: number): void {
    this.api.deletePlaceByID(cityID).subscribe({
      next: (res: { message: string }) => {
        console.log(res.message);
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  sanitizeImageUrl(url: string): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  sendCityID(placeID: number): void {
    this.api.transferPlaceID(placeID);
    this.cityID = parseInt(sessionStorage.getItem('cityID'));
    console.log(this.cityID);

    console.log(placeID);

    this.router.navigateByUrl(
      `attractions/places/${this.cityID}/${placeID}/bookPlace`
    );
  }

  placeHandler(event: any, id: number): void {
    if (event?.target?.id && event?.target?.id?.includes('delete-place')) {
      this.deletePlace(id);
    } else {
      this.sendCityID(id);
    }
  }

  editPlace(placeID: number): void {
    this.router.navigate([
      `attractions/places/${this.cityID}/${placeID}/editPlace`,
    ]);
  }
}
