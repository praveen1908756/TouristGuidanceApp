import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Places } from 'src/app/shared/models/Places';
import { Reviews } from 'src/app/shared/models/Reviews';
import { User } from 'src/app/shared/models/User';
import { ApiService } from 'src/app/shared/services/api.service';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-book-place',
  templateUrl: './book-place.component.html',
  styleUrls: ['./book-place.component.scss'],
})
export class BookPlaceComponent implements OnInit {
  bookPlace: Places;
  placeID: number;
  amount = 1000;
  cityID: number;
  reviews: Reviews[];
  userEmail: string;

  @ViewChild('paymentRef', { static: true }) paymentRef: ElementRef;

  constructor(
    private api: ApiService,
    private ar: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private payment: PaymentService
  ) {}

  ngOnInit(): void {
    this.userEmail = sessionStorage.getItem('email');

    this.ar.paramMap.subscribe((map) => {
      this.placeID = +map?.get('placeID');
    });

    this.ar.paramMap.subscribe((map) => {
      this.cityID = +map?.get('cityID');
    });

    this.api.getReviewsByID(this.placeID).subscribe({
      next: (res: Reviews[]) => {
        this.reviews = res;
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });

    this.api.getPlaceByID(this.placeID).subscribe({
      next: (res: Places) => {
        this.bookPlace = res;
        this.bookPlace.placeName = this.bookPlace.placeName.slice(3);
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });

    window.paypal
      .Buttons({
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.amount.toString(),
                  currency_code: 'USD',
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log(details);
            if (details.status === 'COMPLETED') {
              this.payment.transactionID = details.id;
              this.router.navigateByUrl(
                `attractions/places/${this.cityID}/${this.placeID}/confirm`
              );
            }
          });
        },
        onError: (err: any) => {
          console.log(err);
        },
      })
      .render(this.paymentRef.nativeElement);
  }

  addReview(): void {
    this.api.getUserDetails(this.userEmail).subscribe({
      next: (res: User) => {
        sessionStorage.setItem('userName', res.userName);
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });

    this.router.navigate([`attractions/places/${this.cityID}/${this.placeID}/addReview`]);
  }

  sanitizeImageUrl(url: string): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
