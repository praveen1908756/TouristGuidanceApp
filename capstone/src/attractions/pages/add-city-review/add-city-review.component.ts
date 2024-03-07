import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CityReview } from 'src/app/shared/models/CityReview';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-city-review',
  templateUrl: './add-city-review.component.html',
  styleUrls: ['./add-city-review.component.scss'],
})
export class AddCityReviewComponent implements OnInit {
  message: string;
  isMessageVisible: boolean;
  reviewForm: FormGroup;
  inputData: CityReview;
  cityID: number;
  userName: string;

  constructor(
    private ar: ActivatedRoute,
    private form: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName');

    this.ar.paramMap.subscribe((map) => {
      this.cityID = +map.get('cityID');
    });

    this.reviewForm = this.form.group({
      review: ['', Validators.required],
    });
  }

  addReview(event: FormGroup): void {
    this.inputData = {
      cityID: this.cityID,
      userName: this.userName,
      review: event.value.review,
    };

    this.api.addCityReview(this.inputData).subscribe({
      next: (res: { message: string }) => {
        this.isMessageVisible = true;
        this.message = res.message;
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
