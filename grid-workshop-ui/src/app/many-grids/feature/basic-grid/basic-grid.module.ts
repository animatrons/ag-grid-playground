import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicGridRoutingModule } from './basic-grid-routing.module';
import { BasicGridComponent } from './basic-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BasicGridComponent
  ],
  imports: [
    CommonModule,
    BasicGridRoutingModule,
    SharedModule
  ]
})
export class BasicGridModule { }
