import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManyGridsComponent } from './many-grids.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'basic-grid',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ManyGridsComponent,
    children: [
      { path: 'basic-grid', loadChildren: () => import('./feature/basic-grid/basic-grid.module').then(m => m.BasicGridModule) },
      { path: 'basic-grid-plus', loadChildren: () => import('./feature/basic-grid-plus/basic-grid-plus.module').then(m => m.BasicGridPlusModule) },
      { path: 'restaurants', loadChildren: () => import('./feature/restauration-grids/restauration-grids.module').then(m => m.RestaurationGridsModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManyGridsRoutingModule { }
