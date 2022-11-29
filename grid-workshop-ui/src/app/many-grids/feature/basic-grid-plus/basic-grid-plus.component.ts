import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { delay, Observable } from 'rxjs';
import { DataService } from 'src/app/shared/data/data.service';
import { OlympicData, olymColumnDefs } from 'src/app/shared/data/model/data.models';

@Component({
  selector: 'app-basic-grid-plus',
  templateUrl: './basic-grid-plus.component.html',
  styleUrls: ['./basic-grid-plus.component.scss']
})
export class BasicGridPlusComponent implements OnInit {

  constructor(private dataService: DataService) { }
  @HostBinding('style.flex-grow')
  flexGrow = '1';


  private gridApi!: GridApi;
  public columnDefs: ColDef[] = olymColumnDefs;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public rowData$!: Observable<OlympicData[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  ngOnInit(): void {
    this.rowData$ = this.dataService.loadOlympicData().pipe(delay(2000));
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onCellClicked(e: CellClickedEvent) {
    console.log('Cell clicked: ', e);
  }

  clearSelection() {
    this.gridApi.deselectAll();
  }

}
