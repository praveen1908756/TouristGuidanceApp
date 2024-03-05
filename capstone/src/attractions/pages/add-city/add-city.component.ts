import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from 'src/app/shared/models/City';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss'],
})
export class AddCityComponent {
  addCityForm: FormGroup;
  inputData: City;
  isMessageVisible: boolean;
  message: string;
  base64Image: string;

  constructor(private form: FormBuilder, private api: ApiService) {
    this.addCityForm = this.form.group({
      cityName: ['', Validators.required],
      cityRating: ['', Validators.required],
      startMonthToVisit: ['', Validators.required],
      endMonthToVisit: ['', Validators.required],
      cityDesc: ['', Validators.required],
      cityImg: ['', Validators.required],
      cityCoords: ['', Validators.required],
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

  addCity(event: FormGroup): void {
    this.inputData = {
      cityID: 0,
      cityName: event.value.cityName,
      cityRating: event.value.cityRating,
      startMonthToVisit: event.value.startMonthToVisit,
      endMonthToVisit: event.value.endMonthToVisit,
      cityDesc: event.value.cityDesc,
      cityImg: this.base64Image,
      cityCoords: event.value.cityCoords,
    };

    this.api.addCity(this.inputData).subscribe({
      next: (res: string) => {
        this.isMessageVisible = true;
        this.message = res;
        console.log(res);
      },
      error: (err: Error) => {
        this.isMessageVisible = true;
        this.message = 'City Added!';
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
