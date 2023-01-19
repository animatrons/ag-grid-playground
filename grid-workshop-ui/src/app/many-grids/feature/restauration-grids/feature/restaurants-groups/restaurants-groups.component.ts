import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IGridWithPaginationState, State } from 'src/app/store/reducers';
import { CellClickedEvent, ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams, RowSelectedEvent, SelectionChangedEvent } from 'ag-grid-community';
import { iif, Observable, Subject, takeUntil } from 'rxjs';
import { SimpleTextColumnFilterComponent } from 'src/app/shared/feature/ag-grid-internal/components/simple-text-column-filter/simple-text-column-filter.component';
import { ResizeService } from 'src/app/shared/util/resize.service';
import { RestaurantViewColDefs, BasicDefaultColDef, RestaurantGroupsColDefs } from '../../data/models/restaurant.columns';
import { Restaurant, RestaurantGroup } from '../../data/models/restaurant.model';

import * as fromRestaurants from '../../store/selectors/restaurants.selectors';
import * as fromRestaurantGroups from '../../store/selectors/restaurant-groups.selectors';
import * as restaurantsActions from '../../store/actions/restaurants.actions';
import * as restaurantGroupsActions from '../../store/actions/restaurant-groups.actions';

@Component({
  selector: 'app-restaurants-groups',
  templateUrl: './restaurants-groups.component.html',
  styleUrls: ['./restaurants-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResizeService]
})
export class RestaurantsGroupsComponent implements OnInit {
  @Input() groupId: string | null = null;

  groups$: Observable<RestaurantGroup[]>;

  private selectAll = false;

  @HostBinding('style.flex-grow')
  flexGrow = '1';

  constructor(private store: Store<State>, private el: ElementRef, private resizeService: ResizeService) {
    this.groups$ = store.pipe(select(fromRestaurantGroups.selectRestaurantGroups));
    store.dispatch(restaurantGroupsActions.getAllRestaurantGroups());
  }

  ngOnInit(): void {
  }


  clearSelection() {

  }

  handleSelectAllEvents() {

  }

  applySelectAll() {
    if (this.selectAll) {
    }
  }

  onSelectionChanged($event: SelectionChangedEvent<Restaurant>) {

  }

  onRowSelected($event: RowSelectedEvent<Restaurant>) {
    console.log('Selected', $event.node.isSelected());
  }

  clickmenubutton(i: any) {
    console.log('III', i);
  }

}
