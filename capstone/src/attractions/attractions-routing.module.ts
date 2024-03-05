import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttractionsComponent } from './attractions.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { PlacesComponent } from './pages/places/places.component';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { BookPlaceComponent } from './pages/book-place/book-place.component';
import { AddPlaceComponent } from './pages/add-place/add-place.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { AuthGuard } from 'src/app/shared/models/AuthGuard';

const routes: Routes = [
  {
    path: '',
    component: AttractionsComponent,
    children: [
      { path: '', component: CitiesComponent },
      {
        path: 'places/:cityID',
        component: PlacesComponent,
      },
      {
        path: 'places/bookPlace',
        component: BookPlaceComponent,
      },
      {
        path: 'addCity',
        component: AddCityComponent,
      },
      {
        path: 'places/:cityID/addPlace',
        component: AddPlaceComponent,
      },
      {
        path: 'places/:cityID/:placeID',
        component: BookPlaceComponent,
      },
      {
        path: 'places/:cityID/:placeID/confirm',
        component: ConfirmComponent,
        canActivate: [AuthGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttractionsRoutingModule {}
