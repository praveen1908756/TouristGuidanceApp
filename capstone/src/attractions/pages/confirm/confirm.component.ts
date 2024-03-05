import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Bookings } from 'src/app/shared/models/Bookings';
import { City } from 'src/app/shared/models/City';
import { Places } from 'src/app/shared/models/Places';
import { ApiService } from 'src/app/shared/services/api.service';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  transactionID: string;
  placeID: number;
  place: Places;
  city: City;
  cityID: number;
  emailID: string;
  bookingData: Bookings;

  constructor(
    private payment: PaymentService,
    private ar: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.transactionID = this.payment.transactionID;
    this.emailID = sessionStorage.getItem('email');

    if(!this.transactionID){
      this.router.navigate(['/attractions']);
      return;
    }

    this.ar.paramMap.subscribe((map) => {
      this.placeID = +map?.get('placeID');
      this.cityID = +map?.get('cityID');
    });

    forkJoin({
      place: this.api.getPlaceByID(this.placeID),
      city: this.api.getCityByID(this.cityID),
    }).subscribe({
      next: ({ place, city }) => {
        this.place = place;
        this.city = city;

        this.bookingData = {
          userEmail: this.emailID,
          cityName: this.city.cityName,
          placeName: this.place.placeName,
          placeRating: this.place.placeRating,
          placeImg: this.place.placeImg,
          contact: this.place.contact,
          openingHour: this.place.openingHour,
          closingHour: this.place.closingHour,
          startMonthToVisit: this.city.startMonthToVisit,
          endMonthToVisit: this.city.endMonthToVisit,
        };

        this.api.bookPlace(this.bookingData).subscribe({
          next: (res: string) => {
            console.log(res);
          },
          error: (err: Error) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete');
          },
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
}
