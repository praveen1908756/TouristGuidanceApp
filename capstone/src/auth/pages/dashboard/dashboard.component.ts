import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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

  constructor(private api: ApiService, private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.restaurants = [];
    this.accommodations = [];
    this.emailID = sessionStorage.getItem('email');

    this.api.getBookings(this.emailID).subscribe({
      next: (res: Bookings[]) => {
        console.log(res);
        
        this.bookings = res;
        this.bookings.forEach(element => {
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

  sanitizeImageUrl(url: string): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
