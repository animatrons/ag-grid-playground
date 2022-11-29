import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IGridWithPaginationState, State } from 'src/app/store/reducers';
import { CellClickedEvent, ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams, RowSelectedEvent, SelectionChangedEvent } from 'ag-grid-community';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SimpleTextColumnFilterComponent } from 'src/app/shared/ui/ag-grid-internal/components/simple-text-column-filter/simple-text-column-filter.component';
import { ResizeService } from 'src/app/shared/util/resize.service';
import { RestaurantViewColDefs, BasicDefaultColDef, RestaurantGroupsColDefs } from '../../data/models/restaurant.columns';
import { Restaurant } from '../../data/models/restaurant.model';

import * as fromRestaurants from '../../store/selectors/restaurants.selectors';
import * as restaurantsActions from '../../store/actions/restaurants.actions';
import { SortParams } from 'src/app/shared/data/model/dto.model';
import { formatColumnFilter } from 'src/app/shared/util/grid.utils';
import { LoadingSpinnerOverlayComponent } from 'src/app/shared/ui/ag-grid-internal/components/loading-spinner-overlay/loading-spinner-overlay.component';

@Component({
  selector: 'app-restaurants-groups',
  templateUrl: './restaurants-groups.component.html',
  styleUrls: ['./restaurants-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResizeService]
})
export class RestaurantsGroupsComponent implements OnInit {

  private gridApi!: GridApi;
  private gridColumnApi?: ColumnApi;
  public gridOptions!: GridOptions;

  public columnDefs: ColDef<Restaurant>[] = RestaurantGroupsColDefs;
  public defaultColDef: ColDef = BasicDefaultColDef;

  public defaultPageSize = 18;
  public paginationPageSize = this.defaultPageSize;
  public rowSelection: 'multiple' | 'single' = 'multiple';

  public frameworkComponents = {
    simpleTextColumnFilterComponent: SimpleTextColumnFilterComponent
  }

  public page$: Observable<IGridWithPaginationState<Restaurant>> = new Observable();
  public status$

  private selectAll = false;

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

  onGridReady(params: GridReadyEvent<Restaurant>) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const dataSource =  this.createDataSource();
    this.gridApi.setDatasource(dataSource);
    this.handleSelectAllEvents();
  }

  createDataSource(): IDatasource {
    return {
      getRows: (params: IGetRowsParams) => {
        this.gridApi.showLoadingOverlay();
        // this.gridApi.resetRowHeights()

        const page = Math.floor((params.endRow) / this.defaultPageSize) - 1;
        const sort: SortParams[] = params.sortModel.map(m => ({
          sort_field: m.colId,
          sort_order: m.sort === 'asc' ? 1 : -1
        }));
        const filter = formatColumnFilter(params.filterModel);
        // console.log('Start: ' + params.startRow+ ' End: ' + params.endRow + ' (page):' + page);
        console.log('Filter and sort: ', params.filterModel, sort);

        const loadinSubj = new Subject();
        const loading$ = loadinSubj.asObservable();
        this.store.dispatch(restaurantsActions.getRestaurantsViewPage({page: page, size: this.defaultPageSize, sort: sort[0], filter}));
        this.page$.pipe(takeUntil(loading$)).subscribe(page => {

          if (page.loadStatus === 'LOADED') {
            // console.log('Page currently', page.content.map(item => item.name));
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

  sizeColsToFit() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
      // this.gridColumnApi?.autoSizeAllColumns();
    }
  }

  clearSelection() {
    this.gridApi.deselectAll();
  }

  handleSelectAllEvents() {
    this.gridApi.addEventListener('headerCheckboxSelected', (e: any) => {
      console.log('headerCheckboxSelected', e);
      this.selectAll = true;
      this.gridApi.forEachNode(node => {
        node.selectThisNode(true);
      })
    });
    this.gridApi.addEventListener('headerUnCheckboxSelected', (e: any) => {
      console.log('headerUnCheckboxSelected', e);
      this.selectAll = false;
      this.gridApi.forEachNode(node => {
        node.selectThisNode(false);
      })
    });
  }

  onSelectionChanged($event: SelectionChangedEvent<Restaurant>) {

  }

  onRowSelected($event: RowSelectedEvent<Restaurant>) {
    console.log('Selected', $event);

  }

}
