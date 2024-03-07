import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/shared/models/City';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss'],
})
export class EditCityComponent implements OnInit {
  editCityForm: FormGroup;
  inputData: City;
  isMessageVisible: boolean;
  message: string;
  base64Image: string;
  cityID: number;
  city: City;

  constructor(
    private form: FormBuilder,
    private api: ApiService,
    private ar: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe((map) => {
      this.cityID = +map.get('cityID');
    });

    this.editCityForm = this.form.group({
      cityName: ['', Validators.required],
      cityRating: ['', Validators.required],
      startMonthToVisit: ['', Validators.required],
      endMonthToVisit: ['', Validators.required],
      cityDesc: ['', Validators.required],
      cityImg: ['', Validators.required],
      cityCoords: ['', Validators.required],
    });

    this.api.getCityByID(this.cityID).subscribe({
      next: (res: City) => {
        this.city = res;
        
        this.editCityForm = this.form.group({
          cityName: [{ value: this.city.cityName, disabled: false }, Validators.required],
          cityRating: [{ value: this.city.cityRating, disabled: false }, Validators.required],
          startMonthToVisit: [{ value: this.city.startMonthToVisit, disabled: false }, Validators.required],
          endMonthToVisit: [{ value: this.city.endMonthToVisit, disabled: false }, Validators.required],
          cityDesc: [{ value: this.city.cityDesc, disabled: false }, Validators.required],
          cityImg: ['', Validators.required],
          cityCoords: [{ value: this.city.cityCoords, disabled: false }, Validators.required],
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

  handleFileSelect(evt: { target }): void {
    const files = evt.target.files;

    const file = files[0];
    if (files && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
  }

  _handleReaderLoaded(readerEvt: { target }): void {
    this.base64Image = readerEvt.target.result;
  }

  editCity(event: FormGroup): void {
    this.inputData = {
      cityID: this.cityID,
      cityName: event.value.cityName,
      cityRating: event.value.cityRating,
      startMonthToVisit: event.value.startMonthToVisit,
      endMonthToVisit: event.value.endMonthToVisit,
      cityDesc: event.value.cityDesc,
      cityImg: this.base64Image,
      cityCoords: event.value.cityCoords,
    };

    this.api.editCity(this.inputData).subscribe({
      next: () => {
        this.isMessageVisible = true;
        this.message = 'City Edited!';
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
