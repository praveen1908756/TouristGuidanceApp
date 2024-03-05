import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Places } from 'src/app/shared/models/Places';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss'],
})
export class AddPlaceComponent {
  isMessageVisible: boolean;
  message: string;
  addPlaceFrom: FormGroup;
  inputData: Places;
  base64Image: string;
  cityID: number;

  constructor(
    private form: FormBuilder,
    private ar: ActivatedRoute,
    private api: ApiService
  ) {
    this.addPlaceFrom = this.form.group({
      cityID: ['', Validators.required],
      placeID: ['', Validators.required],
      placeName: ['', Validators.required],
      placeRating: ['', Validators.required],
      distFromCity: ['', Validators.required],
      placeDesc: ['', Validators.required],
      placeImg: ['', Validators.required],
      placeCoords: ['', Validators.required],
      openingHour: ['', Validators.required],
      closingHour: ['', Validators.required],
      contact: ['', Validators.required],
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

  addPlace(event: FormGroup): void {
    // to get current city ID
    this.ar.paramMap.subscribe((map) => {
      this.cityID = +map?.get('cityID');
    });

    this.inputData = {
      cityID: 0,
      placeID: 0,
      placeName: event.value.placeName,
      placeRating: event.value.placeRating,
      distFromCity: event.value.distFromCity,
      placeDesc: event.value.placeDesc,
      placeImg: this.base64Image,
      placeCoords: event.value.placeCoords,
      openingHour: event.value.openingHour,
      closingHour: event.value.closingHour,
      contact: event.value.contact,
    };

    this.api.addPlace(this.inputData).subscribe({
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
