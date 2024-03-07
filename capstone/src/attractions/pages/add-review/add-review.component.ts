import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Reviews } from 'src/app/shared/models/Reviews';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent implements OnInit {
  placeID: number;
  userName: string;
  reviewForm: FormGroup;
  isMessageVisible: boolean;
  message: string;
  review: Reviews;
  inputData: Reviews;

  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private form: FormBuilder,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName');

    this.ar.paramMap.subscribe((map) => {
      this.placeID = +map.get('placeID');
    });

    this.reviewForm = this.form.group({
      review: ['', Validators.required],
    });
  }

  addReview(event: FormGroup): void {
    this.inputData = {
      placeID: this.placeID,
      userName: this.userName,
      review: event.value.review,
    };

    this.api.addReview(this.inputData).subscribe({
      next: (res: string) => {
        this.isMessageVisible = true;
        this.message = res;
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
