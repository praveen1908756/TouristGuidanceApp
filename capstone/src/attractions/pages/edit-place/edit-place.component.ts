import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/shared/models/City';
import { Places } from 'src/app/shared/models/Places';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.scss'],
})
export class EditPlaceComponent implements OnInit {
  editPlaceForm: FormGroup;
  inputData: Places;
  isMessageVisible: boolean;
  message: string;
  base64Image: string;
  placeID: number;
  place: Places;

  constructor(
    private form: FormBuilder,
    private api: ApiService,
    private ar: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe((map) => {
      this.placeID = +map.get('placeID');
    });

    this.editPlaceForm = this.form.group({
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

    this.api.getPlaceByID(this.placeID).subscribe({
      next: (res: Places) => {
        this.place = res;

        this.editPlaceForm = this.form.group({
          cityID: [{ value: this.place.cityID, disabled: false }, Validators.required],
          placeID: [{ value: this.place.placeID, disabled: false }, Validators.required],
          placeName: [{ value: this.place.placeName.slice(4), disabled: false }, Validators.required],
          placeRating: [{ value: this.place.placeRating, disabled: false }, Validators.required],
          distFromCity: [{ value: this.place.distFromCity, disabled: false }, Validators.required],
          placeDesc: [{ value: this.place.placeDesc, disabled: false }, Validators.required],
          placeImg: ['', Validators.required],
          placeCoords: [{ value: this.place.placeCoords, disabled: false }, Validators.required],
          openingHour: [{ value: this.place.openingHour, disabled: false }, Validators.required],
          closingHour: [{ value: this.place.closingHour, disabled: false }, Validators.required],
          contact: [{ value: this.place.contact, disabled: false }, Validators.required],
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

  editPlace(event: FormGroup): void {
    this.inputData = {
      cityID: event.value.cityID,
      placeID: event.value.placeID,
      placeName: event.value.placeName,
      placeRating: event.value.placeRating,
      distFromCity: event.value.distFromCity,
      placeDesc: event.value.placeDesc,
      placeImg: event.value.placeImg,
      placeCoords: event.value.placeCoords,
      openingHour: event.value.openingHour,
      closingHour: event.value.closingHour,
      contact: event.value.contact,
    };

    this.api.editPlace(this.inputData).subscribe({
      next: () => {
        this.isMessageVisible = true;
        this.message = 'Place Edited!';
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
