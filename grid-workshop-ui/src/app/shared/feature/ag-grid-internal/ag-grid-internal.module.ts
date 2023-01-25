import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { LoadingSpinnerOverlayComponent } from './components/loading-spinner-overlay/loading-spinner-overlay.component';
import { SharedModule } from '../../shared.module';
import { SimpleTextColumnFilterComponent } from './components/simple-text-column-filter/simple-text-column-filter.component';
import { LinkCellComponent } from './components/link-cell/link-cell.component';
import { CheckboxHeaderComponent } from './components/checkbox-header/checkbox-header.component';
import { DynamicGridBasicComponent } from './girds/dynamic-grid-basic/dynamic-grid-basic.component';
import { DynamicGridInfiniteComponent } from './girds/dynamic-grid-infinite/dynamic-grid-infinite.component';
import { ButtonCellComponent } from './components/button-cell/button-cell.component';
import { CustomStatusBarPaginationComponent } from './components/custom-status-bar-pagination/custom-status-bar-pagination.component';



@NgModule({
  declarations: [
    LoadingSpinnerOverlayComponent,
    SimpleTextColumnFilterComponent,
    LinkCellComponent,
    CheckboxHeaderComponent,
    DynamicGridBasicComponent,
    DynamicGridInfiniteComponent,
    ButtonCellComponent,
    CustomStatusBarPaginationComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule,
    SharedModule
  ],
  exports: [
    LoadingSpinnerOverlayComponent,
    SimpleTextColumnFilterComponent,
    DynamicGridBasicComponent,
    DynamicGridInfiniteComponent,
  ]
})
export class AgGridInternalModule { }
