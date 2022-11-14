import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicGridComponent } from './basic-grid.component';

const routes: Routes = [{ path: '', component: BasicGridComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicGridRoutingModule { }
