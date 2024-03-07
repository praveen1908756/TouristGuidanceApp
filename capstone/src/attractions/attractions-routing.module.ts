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
import { CityDetailedComponent } from './pages/city-detailed/city-detailed.component';
import { EditCityComponent } from './pages/edit-city/edit-city.component';
import { AdminGuard } from 'src/app/shared/models/AdminGuard';
import { EditPlaceComponent } from './pages/edit-place/edit-place.component';
import { AddReviewComponent } from './pages/add-review/add-review.component';
import { AddCityReviewComponent } from './pages/add-city-review/add-city-review.component';

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
        path: 'addCity',
        component: AddCityComponent,
      },
      {
        path: 'places/:cityID/addPlace',
        component: AddPlaceComponent,
      },
      {
        path: 'places/:cityID/:placeID/bookPlace',
        component: BookPlaceComponent
      },
      {
        path: 'places/:cityID/:placeID/confirm',
        component: ConfirmComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'city/:cityID',
        component: CityDetailedComponent
      },
      {
        path: 'editCity/:cityID',
        component: EditCityComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'places/:cityID/:placeID/editPlace',
        component: EditPlaceComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'places/:cityID/:placeID/addReview',
        component: AddReviewComponent
      },
      {
        path: 'city/:cityID/addReview',
        component: AddCityReviewComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttractionsRoutingModule {}
