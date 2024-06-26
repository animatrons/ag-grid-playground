import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CellClickedEvent, ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { Restaurant } from '../../data/models/restaurant.model';

import * as fromRestaurants from '../../store/selectors/restaurants.selectors';
import * as restaurantsActions from '../../store/actions/restaurants.actions';
import { IGridWithPaginationState, State } from 'src/app/store/reducers';
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs';
import { FilterParams, Pagination, SortParams } from 'src/app/shared/data/model/dto.model';
import { BasicDefaultColDef, RestaurantViewColDefs } from '../../data/models/restaurant.columns';
import { LoadingSpinnerOverlayComponent } from 'src/app/shared/feature/ag-grid-internal/components/loading-spinner-overlay/loading-spinner-overlay.component';
import { SimpleTextColumnFilterComponent } from 'src/app/shared/feature/ag-grid-internal/components/simple-text-column-filter/simple-text-column-filter.component';
import { ResizeService } from 'src/app/shared/util/resize.service';
import { formatColumnFilter } from 'src/app/shared/util/grid.utils';

@Component({
  selector: 'app-restaurants-view',
  templateUrl: './restaurants-view.component.html',
  styleUrls: ['./restaurants-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResizeService]
})
export class RestaurantsViewComponent implements OnInit, OnDestroy {

  private gridApi!: GridApi;
  private gridColumnApi?: ColumnApi;
  public gridOptions!: GridOptions;

  public columnDefs: ColDef<Restaurant>[] = RestaurantViewColDefs;
  // public autoGroupColumnDef;
  public defaultColDef: ColDef = BasicDefaultColDef;

  public defaultPageSize = 18;
  public paginationPageSize = this.defaultPageSize;
  public rowSelection: 'multiple' | 'single' = 'multiple';

  public frameworkComponents = {
    simpleTextColumnFilterComponent: SimpleTextColumnFilterComponent
  }

  public page$: Observable<IGridWithPaginationState<Restaurant>> = new Observable();
  public status$

  @HostBinding('style.flex-grow')
  flexGrow = '1';

  constructor(private store: Store<State>, private el: ElementRef, private resizeService: ResizeService) {
    this.page$ = this.store.pipe(select(fromRestaurants.selectRestaurantsView));
    this.status$ = this.store.pipe(select(fromRestaurants.selectCurrentViewStatus))
  }

  ngOnInit(): void {
    this.gridOptions = {
      rowModelType: 'infinite',
      loadingOverlayComponent: LoadingSpinnerOverlayComponent,
      loadingOverlayComponentParams: {
        loadingMessage: 'Loading...'
      }
    }
    this.resizeService.addResizeEventListener(this.el.nativeElement, (elem: any) => {
      this.sizeColsToFit();
    });
  }

  ngOnDestroy() {
    this.resizeService.removeResizeEventListener(this.el.nativeElement);
  }

  onGridReady(params: GridReadyEvent<Restaurant>) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const dataSource =  this.createDataSource();
    this.gridApi.setDatasource(dataSource);
  }

  createDataSource(): IDatasource {
    return {
      getRows: (params: IGetRowsParams) => {
        this.gridApi.showLoadingOverlay();

        const page = Math.floor((params.endRow) / this.defaultPageSize) - 1;
        const sorts: SortParams[] = params.sortModel.map(m => ({
          sort_field: m.colId,
          sort_order: m.sort === 'asc' ? 1 : -1
        }));
        const filter = formatColumnFilter(params.filterModel);
        const loadinSubj = new Subject();
        const loading$ = loadinSubj.asObservable();
        this.gridApi.hideOverlay();
        this.gridApi.sizeColumnsToFit();
        params.successCallback([], undefined)
        this.gridApi.showNoRowsOverlay()
        // this.store.dispatch(restaurantsActions.getRestaurantsViewPage({page: page, size: this.defaultPageSize, sorts, filter}));
        // this.page$.pipe(takeUntil(loading$)).subscribe(page => {

        //   if (page.loadStatus === 'LOADED') {
        //     params.successCallback(page.content, page.total)
        //     this.gridApi.hideOverlay();
        //     this.gridApi.sizeColumnsToFit();
        //     loadinSubj.next('')
        //   }
        //   if (page.loadStatus === 'NOT_LOADED') {
        //     params.failCallback();
        //     this.gridApi.hideOverlay();
        //     loadinSubj.next('')
        //   }
        // })
      }
    }
  }

  sizeColsToFit() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
      // this.gridColumnApi?.autoSizeAllColumns();
    }
  }

  onCellClicked(e: CellClickedEvent) {

  }

  clearSelection() {
    this.gridApi.deselectAll();
  }

  changePageSize($size: number) {
    this.gridApi.paginationSetPageSize($size)
  }

}
