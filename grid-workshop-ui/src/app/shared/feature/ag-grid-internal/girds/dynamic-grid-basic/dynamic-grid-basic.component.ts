import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ColDef, ColGroupDef, GridReadyEvent, RowEvent } from 'ag-grid-community';
import { DynamicGrid } from '../../types/dynamic-grid-base.class';

@Component({
  selector: 'app-dynamic-grid-basic',
  templateUrl: './dynamic-grid-basic.component.html',
  styleUrls: ['./dynamic-grid-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicGridBasicComponent extends DynamicGrid implements OnInit, OnChanges {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.gridOptions = {
      ...this.gridOptions,
      rowModelType: 'clientSide'
    }

    if (!this.defaultColDef) {
      this.defaultColDef = {
        resizable: true,
        sortable: true,
        editable: false,
        suppressCellFlash: true,
        suppressMenu: true,
        filter: 'agTextColumnFilter',
        headerComponentParams: {
          menuIcon: 'fa-bars'
        },
      };
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rowData']) {
      // console.log(this.rowData)
      if (this.gridApi) {
        // this.gridApi.showLoadingOverlay();
        this.gridApi.setRowData(this.rowData ?? []);
      }
    }
  }

  onGridReady (params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();

    this.gridReady.emit(params);
  }

  public override adjustGrid(): void {
    this.gridApi.sizeColumnsToFit();
  }

}
