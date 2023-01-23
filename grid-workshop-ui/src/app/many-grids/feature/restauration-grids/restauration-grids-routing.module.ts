import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsGroupsComponent } from './feature/restaurants-groups/restaurants-groups.component';
import { RestaurantsManageComponent } from './feature/restaurants-manage/restaurants-manage.component';
import { RestaurantsViewComponent } from './feature/restaurants-view/restaurants-view.component';
import { RestaurationGridsComponent } from './restauration-grids.component';

const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  {
    path: '',
    component: RestaurationGridsComponent,
    children: [
      {
        path: 'manage',
        component: RestaurantsManageComponent
      },
      {
        path: 'view',
        component: RestaurantsViewComponent
      },
      {
        path: 'groups',
        component: RestaurantsGroupsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurationGridsRoutingModule { }
