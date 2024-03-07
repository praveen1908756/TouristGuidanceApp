import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'attractions',
    loadChildren: () =>
      import('../attractions/attractions.module').then(
        (m) => m.AttractionsModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'maps/:cityID',
    loadChildren: () => import('../maps/maps.module').then((m) => m.MapsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
