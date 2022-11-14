import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicGridPlusRoutingModule } from './basic-grid-plus-routing.module';
import { BasicGridPlusComponent } from './basic-grid-plus.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BasicGridPlusComponent
  ],
  imports: [
    CommonModule,
    BasicGridPlusRoutingModule,
    SharedModule
  ]
})
export class BasicGridPlusModule { }
