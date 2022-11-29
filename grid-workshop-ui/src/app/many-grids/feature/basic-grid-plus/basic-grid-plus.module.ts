import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicGridPlusRoutingModule } from './basic-grid-plus-routing.module';
import { BasicGridPlusComponent } from './basic-grid-plus.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridInternalModule } from 'src/app/shared/feature/ag-grid-internal/ag-grid-internal.module';


@NgModule({
  declarations: [
    BasicGridPlusComponent
  ],
  imports: [
    CommonModule,
    BasicGridPlusRoutingModule,
    AgGridInternalModule,
    SharedModule,
  ]
})
export class BasicGridPlusModule { }
