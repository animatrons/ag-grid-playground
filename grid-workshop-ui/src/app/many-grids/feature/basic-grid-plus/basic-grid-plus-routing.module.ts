import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicGridPlusComponent } from './basic-grid-plus.component';

const routes: Routes = [{ path: '', component: BasicGridPlusComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicGridPlusRoutingModule { }
