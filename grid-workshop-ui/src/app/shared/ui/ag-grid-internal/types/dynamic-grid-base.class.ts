import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { CellClickedEvent, ColDef, ColGroupDef, ColumnApi, GridApi, GridColumnsChangedEvent, GridOptions, GridReadyEvent, RowNode } from "ag-grid-community";
import { Observable } from "rxjs";

@Component({template: ''})
export class DynamicGrid<T = any> {

  @Input() colDefs: (ColDef | ColGroupDef)[] = [];
  @Input() defaultColDef: ColDef = {};
  @Input() rowData: T[] | null = null;

  @Input() rowData$: T[] | null = null;
  @Input() gridOptions: GridOptions = {};
  @Input() frameworkComponents: any;
  @Input() rowSelection: 'multiple' | 'single' = 'multiple';
  @Input() pivotPanelShow: 'always' | 'onlyWhenPivoting' | 'never' | undefined = 'always';
  @Input() animateRows = true;

  @Output() gridReady = new EventEmitter<GridReadyEvent>();
  @Output() selectionChanged = new EventEmitter<RowNode[]>();
  @Output() cellClicked: EventEmitter<CellClickedEvent<any, any>> = new EventEmitter();
  @Output() gridColumnsChanged: EventEmitter<GridColumnsChangedEvent<any>> = new EventEmitter();

  public gridApi!: GridApi;
  public gridColumnApi!: ColumnApi;
  public selectedRows: RowNode[] = [];

  @HostListener('window:resize', ['$event'])
  public onWindowResize() {
    if (this.gridApi) {
      this.adjustGrid();
    }
  }

  onCellClicked($event: CellClickedEvent<any, any>) {
    this.cellClicked.emit($event);
  }

  onGridColumnsChanged($event: GridColumnsChangedEvent<any>) {
    this.gridColumnsChanged.emit($event);
  }

  public adjustGrid() {
    // Implement in exstended
  }
}
