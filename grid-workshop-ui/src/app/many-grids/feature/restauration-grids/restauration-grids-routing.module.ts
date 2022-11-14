import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsViewComponent } from './feature/restaurants-view/restaurants-view.component';
import { RestaurationGridsComponent } from './restauration-grids.component';

const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  {
    path: '',
    component: RestaurationGridsComponent,
    children: [
      {
        path: 'view',
        component: RestaurantsViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurationGridsRoutingModule { }
