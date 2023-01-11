import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { GenericRowsProviderService } from '../../data/generic-rows-provider.service';
import { DynamicGrid } from '../../types/dynamic-grid-base.class';

@Component({
  selector: 'app-dynamic-grid-infinite',
  templateUrl: './dynamic-grid-infinite.component.html',
  styleUrls: ['./dynamic-grid-infinite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicGridInfiniteComponent extends DynamicGrid implements OnInit, OnChanges {

  constructor(private service: GenericRowsProviderService) {
    super();
  }

  ngOnInit(): void {
    this.gridOptions = {
      ...this.gridOptions,
      rowModelType: 'infinite'
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
    if (changes['columnDefs']) {
      if (this.gridApi) {
        console.log('Column defs changed', this.colDefs);
        this.gridApi.setColumnDefs(this.colDefs)
        this.gridApi.refreshInfiniteCache();
        this.gridApi.sizeColumnsToFit();
      }
    }
    if (changes['triggerChange']) {
      if (this.gridApi) {
        console.log('Change triggerrrd');
        this.gridApi.purgeInfiniteCache();
        // this.gridApi.purgeInfinitePageCache();
        this.gridApi.refreshInfiniteCache();
        // this.gridApi.setSortModel([{colId: '', sort: ''}])
        this.gridApi.refreshInfiniteCache();
      }
    }
  }

  onGridReady (params: GridReadyEvent) {
    console.log('Grid ready');

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();

    const dataSource: IDatasource = {
      getRows: (params: IGetRowsParams) => {
        let page = Math.floor(params.endRow / this.MAX_PAGE_SIZE);
        console.log('asking for ' + params.startRow + ' to ' + params.endRow + ', page: ' + page);
        const sortModel = params.sortModel[0] ? params.sortModel[0] : {colId: '', sort: ''};
        const filterModel = params.filterModel;
        let filterField = null;
        let filterText = null;
        if (filterModel) {
          filterField = Object.keys(filterModel)[0];
          if (filterField) filterText = filterModel[filterField].filter
        }
        this.service.getRows(page, filterText, filterField, sortModel.sort, sortModel.colId)
          .subscribe(results => {
            console.log('Results', results);
            const gridData = results.data;
            const total = results.total;
            // if on or after the last page, work out the last row.  || gridData.length < params.endRow
            let lastRow = -1;
            if (total <= params.endRow) {
              lastRow = total;
            }
            console.log("REsponse data?", lastRow, gridData);
            params.successCallback(gridData, lastRow);
          })
      }
    }
    this.gridApi.setDatasource(dataSource);
  }

}
