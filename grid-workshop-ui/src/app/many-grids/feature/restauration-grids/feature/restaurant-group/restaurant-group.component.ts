import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IGridWithPaginationState, State } from 'src/app/store/reducers';
import { CellClickedEvent, ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams, RowSelectedEvent, SelectionChangedEvent } from 'ag-grid-community';
import { iif, Observable, Subject, takeUntil } from 'rxjs';
import { SimpleTextColumnFilterComponent } from 'src/app/shared/feature/ag-grid-internal/components/simple-text-column-filter/simple-text-column-filter.component';
import { ResizeService } from 'src/app/shared/util/resize.service';
import { RestaurantViewColDefs, BasicDefaultColDef, RestaurantGroupsColDefs } from '../../data/models/restaurant.columns';
import { Restaurant } from '../../data/models/restaurant.model';

import * as fromRestaurants from '../../store/selectors/restaurants.selectors';
import * as restaurantsActions from '../../store/actions/restaurants.actions';
import * as restaurantGroupsActions from '../../store/actions/restaurant-groups.actions';
import { FilterParams, GridGroupSelection, SortParams } from 'src/app/shared/data/model/dto.model';
import { formatColumnFilter } from 'src/app/shared/util/grid.utils';
import { LoadingSpinnerOverlayComponent } from 'src/app/shared/feature/ag-grid-internal/components/loading-spinner-overlay/loading-spinner-overlay.component';
import { CheckboxHeaderComponent } from 'src/app/shared/feature/ag-grid-internal/components/checkbox-header/checkbox-header.component';

@Component({
  selector: 'app-restaurant-group',
  templateUrl: './restaurant-group.component.html',
  styleUrls: ['./restaurant-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResizeService]
})
export class RestaurantGroupComponent implements OnInit {

  @Input() groupId: string | null = null;
  @Input() groupName!: string;
  @Output() selectionApplied = new EventEmitter<GridGroupSelection>();

  private gridApi!: GridApi;
  public gridOptions!: GridOptions;

  public columnDefs: ColDef<Restaurant>[] = RestaurantGroupsColDefs;
  public defaultColDef: ColDef = BasicDefaultColDef;

  public defaultPageSize = 18;
  public paginationPageSize = this.defaultPageSize;
  public rowSelection: 'multiple' | 'single' = 'multiple';
  selectAllToggled = false;

  public frameworkComponents = {
    simpleTextColumnFilterComponent: SimpleTextColumnFilterComponent,
    checkboxHeaderComponent: CheckboxHeaderComponent
  }

  public page$: Observable<IGridWithPaginationState<Restaurant>> = new Observable();
  public groupPage$: Observable<IGridWithPaginationState<Restaurant>> = new Observable();

  private selectAll = false;
  private selectedIds: string[] = [];
  private selectAllExceptIds: string[] = [];
  private appliedFilters: FilterParams[] = [];

  @HostBinding('style.flex-grow')
  flexGrow = '1';

  constructor(private store: Store<State>, private el: ElementRef, private resizeService: ResizeService) {

  }

  ngOnInit(): void {
    this.page$ = this.store.pipe(select(fromRestaurants.selectRestaurantsView));
    this.groupPage$ = this.store.pipe(select(fromRestaurants.selectRestaurantGroupPageView(this.groupId ?? '')));
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

    const dataSource =  this.createDataSource();
    this.gridApi.setDatasource(dataSource);
    this.handleSelectAllEvents();
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
        this.appliedFilters = filter;

        if (this.groupId && this.groupName) {
          this.store.dispatch(restaurantGroupsActions.getRestaurantsGroupViewPage({group_id: this.groupId, group_name: this.groupName, page: page, size: this.defaultPageSize, sorts, filters: filter}));
        } else {
          this.store.dispatch(restaurantsActions.getRestaurantsViewPage({page: page, size: this.defaultPageSize, sorts, filter}));
        }
        iif(() => this.groupId == null,
          this.page$,
          this.groupPage$
        ).pipe(takeUntil(loading$)).subscribe(page => {
          // if (this.groupId != null) {
          //   console.log("page of group", page);
          // }
          if (page.loadStatus === 'LOADED') {
            params.successCallback(page.content, page.total)
            this.gridApi.hideOverlay();
            this.gridApi.sizeColumnsToFit();
            this.applySelectAll();
            loadinSubj.next(0)
          }
          if (page.loadStatus === 'NOT_LOADED') {
            params.failCallback();
            this.gridApi.hideOverlay();
            loadinSubj.next(0)
          }
        })
      }
    }
  }

  sizeColsToFit() {
    if (this.gridApi) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  clearSelection() {
    this.gridApi.deselectAll();
  }

  handleSelectAllEvents() {
    this.gridApi.addEventListener('headerCheckboxSelected', (e: any) => {
      this.selectAll = true;
      this.selectedIds = [];
      this.gridApi.forEachNode(node => {
        this.selectAllToggled = true;
        node.selectThisNode(true);
      });
      this.selectionApplied.emit({groupId: this.groupId, selectedIds: [], selectAll: true, selectAllExceptIds: this.selectAllExceptIds, filters: this.appliedFilters});
    });
    this.gridApi.addEventListener('headerUnCheckboxSelected', (e: any) => {
      this.selectAll = false;
      this.selectAllExceptIds = [];
      this.gridApi.forEachNode(node => {
        this.selectAllToggled = true;
        node.selectThisNode(false);
      });
      this.selectionApplied.emit({groupId: this.groupId, selectedIds: [], selectAll: false, selectAllExceptIds: [], filters: []});
    });
  }

  applySelectAll() {
    if (this.selectAll) {
      this.gridApi.forEachNode(node => {
        this.selectAllToggled = true;
        node.setSelected(true);
      })
    }
  }

  onRowSelected($event: RowSelectedEvent<Restaurant>, fromUi = true) {
    if (this.selectAllToggled) {
      this.selectAllToggled = false;
      return;
    }
    if ($event.node.isSelected() && $event.data) {
      if (!this.selectAll) this.selectedIds.push($event.data?.id);
      this.selectAllExceptIds = this.selectAllExceptIds.filter(id => id !== $event.data?.id);
    } else if (!$event.node.isSelected() && $event.data) {
      this.selectedIds = this.selectedIds.filter(id => id !== $event.data?.id);
      if (this.selectAll) this.selectAllExceptIds.push($event.data?.id);
    }
    this.selectionApplied.emit({groupId: this.groupId, selectedIds: this.selectedIds, selectAll: this.selectAll, selectAllExceptIds: this.selectAllExceptIds, filters: this.appliedFilters})
  }

}
