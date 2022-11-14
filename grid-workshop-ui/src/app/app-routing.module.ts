import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'grids',
    pathMatch: 'full'
  },
  { path: 'grids', loadChildren: () => import('./many-grids/many-grids.module').then(m => m.ManyGridsModule) },
  { path: 'restaurants', loadChildren: () => import('./many-grids/feature/restauration-grids/restauration-grids.module').then(m => m.RestaurationGridsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
