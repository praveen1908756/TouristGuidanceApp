import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttractionsRoutingModule } from './attractions-routing.module';
import { CitiesComponent } from './pages/cities/cities.component';
import { AttractionsComponent } from './attractions.component';
import { PlacesComponent } from './pages/places/places.component';
import { RouterModule } from '@angular/router';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from 'safe-pipe';
import { BookPlaceComponent } from './pages/book-place/book-place.component';
import { AddPlaceComponent } from './pages/add-place/add-place.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { CityDetailedComponent } from './pages/city-detailed/city-detailed.component';
import { EditCityComponent } from './pages/edit-city/edit-city.component';
import { EditPlaceComponent } from './pages/edit-place/edit-place.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddReviewComponent } from './pages/add-review/add-review.component';
import { AddCityReviewComponent } from './pages/add-city-review/add-city-review.component';

@NgModule({
  declarations: [
    CitiesComponent,
    AttractionsComponent,
    PlacesComponent,
    AddCityComponent,
    BookPlaceComponent,
    AddPlaceComponent,
    ConfirmComponent,
    CityDetailedComponent,
    EditCityComponent,
    EditPlaceComponent,
    AddReviewComponent,
    AddCityReviewComponent
  ],
  imports: [
    CommonModule,
    AttractionsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SafePipe,
    GoogleMapsModule
  ]
})
export class AttractionsModule { }
