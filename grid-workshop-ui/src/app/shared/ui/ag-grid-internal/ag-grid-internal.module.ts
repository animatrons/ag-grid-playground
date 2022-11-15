import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { LoadingSpinnerOverlayComponent } from './components/loading-spinner-overlay/loading-spinner-overlay.component';
import { SharedModule } from '../../shared.module';
import { SimpleTextColumnFilterComponent } from './components/simple-text-column-filter/simple-text-column-filter.component';
import { LinkCellComponent } from './components/link-cell/link-cell.component';


@NgModule({
  declarations: [
    LoadingSpinnerOverlayComponent,
    SimpleTextColumnFilterComponent,
    LinkCellComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule,
    SharedModule
  ],
  exports: [
    LoadingSpinnerOverlayComponent,
    SimpleTextColumnFilterComponent
  ]
})
export class AgGridInternalModule { }
