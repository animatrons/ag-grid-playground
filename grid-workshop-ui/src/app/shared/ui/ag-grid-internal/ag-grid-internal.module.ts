import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { LoadingSpinnerOverlayComponent } from './components/loading-spinner-overlay/loading-spinner-overlay.component';
import { SharedModule } from '../../shared.module';


@NgModule({
  declarations: [
    LoadingSpinnerOverlayComponent
  ],
  imports: [
    CommonModule,
    AgGridModule,
    SharedModule
  ],
  exports: [
    LoadingSpinnerOverlayComponent
  ]
})
export class AgGridInternalModule { }
