import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CellDoubleClickedEvent, ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams } from 'ag-grid-community';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LoadingSpinnerOverlayComponent } from 'src/app/shared/feature/ag-grid-internal/components/loading-spinner-overlay/loading-spinner-overlay.component';
import { SimpleTextColumnFilterComponent } from 'src/app/shared/feature/ag-grid-internal/components/simple-text-column-filter/simple-text-column-filter.component';
import { ResizeService } from 'src/app/shared/util/resize.service';
import * as fromRestaurants from '../../store/selectors/restaurants.selectors';
import * as restaurantsActions from '../../store/actions/restaurants.actions';
import { IGridWithPaginationState, State } from 'src/app/store/reducers';
import { BasicDefaultColDef, RestaurantViewColDefs } from '../../data/models/restaurant.columns';
import { Restaurant } from '../../data/models/restaurant.model';
import { formatColumnFilter } from 'src/app/shared/util/grid.utils';
import { SortParams } from 'src/app/shared/data/model/dto.model';

@Component({
  selector: 'app-restaurants-manage',
  templateUrl: './restaurants-manage.component.html',
  styleUrls: ['./restaurants-manage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResizeService]
})
export class RestaurantsManageComponent implements OnInit, OnDestroy {
  private gridApi!: GridApi;
  private gridColumnApi?: ColumnApi;
  public gridOptions!: GridOptions;

  public columnDefs: ColDef<Restaurant>[] = RestaurantViewColDefs;
  // public autoGroupColumnDef;
  public defaultColDef: ColDef = BasicDefaultColDef;

  public defaultPageSize = 20;
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
  }

  sizeColsToFit() {
    this.gridOptions = {
      rowModelType: 'infinite',
      loadingOverlayComponent: LoadingSpinnerOverlayComponent,
      loadingOverlayComponentParams: {
        loadingMessage: 'Loading...'
      }
    }
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
      // this.gridColumnApi?.autoSizeAllColumns();
    }
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
        this.store.dispatch(restaurantsActions.getRestaurantsViewPage({page: page, size: this.defaultPageSize, sorts, filter}));
        this.page$.pipe(takeUntil(loading$)).subscribe(page => {

          if (page.loadStatus === 'LOADED') {
            params.successCallback(page.content, page.total)
            this.gridApi.hideOverlay();
            this.gridApi.sizeColumnsToFit();
            loadinSubj.next('')
          }
          if (page.loadStatus === 'NOT_LOADED') {
            params.failCallback();
            this.gridApi.hideOverlay();
            loadinSubj.next('')
          }
        })
      }
    }
  }

  onCellDoubleClicked($event: CellDoubleClickedEvent<Restaurant,any>) {
    throw new Error('Method onCellDoubleClicked not implemented.');
  }

}
