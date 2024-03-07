import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/shared/models/City';
import { CityReview } from 'src/app/shared/models/CityReview';
import { User } from 'src/app/shared/models/User';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-city-detailed',
  templateUrl: './city-detailed.component.html',
  styleUrls: ['./city-detailed.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CityDetailedComponent implements OnInit {
  city: City;
  cityID: number;
  reviews = [];
  user: User;
  emailID: string;
  userName: string;

  constructor(
    private domSanitizer: DomSanitizer,
    private ar: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.emailID = sessionStorage.getItem('email');

    this.ar.paramMap.subscribe((map) => {
      this.cityID = +map.get('cityID');
    });

    this.api.getCityByID(this.cityID).subscribe({
      next: (res: City) => {
        this.city = res;
        this.city.cityDesc = this.city.cityDesc.slice(3, -3);
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed');
      },
    });

    this.api.getCityReviewsByID(this.cityID).subscribe({
      next: (res: CityReview[]) => {
        this.reviews = res;
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });

    this.api.getUserDetails(this.emailID).subscribe({
      next: (res: User) => {
        this.userName = res.userName;
        sessionStorage.setItem('userName', this.userName);
      },
      error: (err: Error) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  navigate(): void {
    this.router.navigate([`maps/${this.cityID}`]);
  }

  addReview(): void {
    this.router.navigate([`/attractions/city/${this.cityID}/addReview`]);
  }

  sanitizeImageUrl(url: string): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
