import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
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
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.sizeColsToFit();
  }

  public columnDefs: ColDef[] = olymColumnDefs;

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  public rowData$!: Observable<OlympicData[]>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.dataService.loadOlympicData();
  }

  onCellClicked(e: CellClickedEvent) {
    console.log('Cell clicked: ', e);
  }

  clearSelection() {
    this.agGrid.api.deselectAll();
  }

  sizeColsToFit() {
    this.agGrid.api.sizeColumnsToFit();
  }

}
