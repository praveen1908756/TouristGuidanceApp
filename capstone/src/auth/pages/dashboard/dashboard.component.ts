import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Accommodations } from 'src/app/shared/models/Accommodations';
import { Bookings } from 'src/app/shared/models/Bookings';
import { Restaurants } from 'src/app/shared/models/Restaurants';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  bookings: Bookings[];
  emailID: string;
  restaurants: Restaurants[];
  accommodations: Accommodations[];
  authToken: string;

  constructor(
    private api: ApiService,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurants = [];
    this.accommodations = [];
    this.bookings = [];
    this.emailID = sessionStorage.getItem('email');
    this.authToken = sessionStorage.getItem('authToken');

    this.api.getBookings(this.emailID).subscribe({
      next: (res: Bookings[]) => {
        this.bookings = res;
        this.bookings.forEach((element) => {
          element.placeName = element.placeName.slice(3);
        });
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  goToPlace(cityID: number, placeID: number): void {
    this.router.navigate([`attractions/places/${cityID}/${placeID}/bookPlace`]);
  }

  sanitizeImageUrl(url: string): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
