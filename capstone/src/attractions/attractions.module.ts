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

@NgModule({
  declarations: [
    CitiesComponent,
    AttractionsComponent,
    PlacesComponent,
    AddCityComponent,
    BookPlaceComponent,
    AddPlaceComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    AttractionsRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SafePipe
  ]
})
export class AttractionsModule { }
