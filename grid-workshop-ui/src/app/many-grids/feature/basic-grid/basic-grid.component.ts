import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable, tap } from 'rxjs';
import { DataService } from 'src/app/shared/data/data.service';

@Component({
  selector: 'app-basic-grid',
  templateUrl: './basic-grid.component.html',
  styleUrls: ['./basic-grid.component.scss']
})
export class BasicGridComponent implements OnInit {

  constructor(private dataService: DataService) { }
  @HostBinding('style.flex-grow')
  flexGrow = '1';

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'make', suppressSizeToFit: true },
    { field: 'model' },
    { field: 'price' },
  ]
  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;
  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  ngOnInit(): void {
  }

  // load data from server example
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.dataService.loadCarsData()
      .pipe(
        tap((data => console.log(data)))
      );
  }
  // consuming grid event
  onCellClicked(e: CellClickedEvent) {
    const clickEvent: CellClickedEvent = {
      api: e.api,
      colDef: e.colDef,
      column: e.column,
      columnApi: e.columnApi,
      context: undefined,
      data: e.data,
      event: e.event,
      node: e.node,
      rowIndex: e.rowIndex,
      rowPinned: e.rowPinned,
      type: e.type,
      value: e.value
    }
    console.log('Cell clicked ', clickEvent);
  }
  // using grid api
  clearSelection() {
    this.agGrid.api.deselectAll();
  }
  sizeColsToFit() {
    this.agGrid.api.sizeColumnsToFit();
  }

}
