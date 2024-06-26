import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IGridWithPaginationState, State } from 'src/app/store/reducers';
import { CellClickedEvent, ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent, IDatasource, IGetRowsParams, RowSelectedEvent, SelectionChangedEvent } from 'ag-grid-community';
import { delay, iif, Observable, of, Subject, takeUntil } from 'rxjs';
import { SimpleTextColumnFilterComponent } from 'src/app/shared/feature/ag-grid-internal/components/simple-text-column-filter/simple-text-column-filter.component';
import { ResizeService } from 'src/app/shared/util/resize.service';
import { RestaurantViewColDefs, BasicDefaultColDef, RestaurantGroupsColDefs } from '../../data/models/restaurant.columns';
import { Restaurant, RestaurantGroup } from '../../data/models/restaurant.model';

import * as fromRestaurants from '../../store/selectors/restaurants.selectors';
import * as fromRestaurantGroups from '../../store/selectors/restaurant-groups.selectors';
import * as restaurantsActions from '../../store/actions/restaurants.actions';
import * as restaurantGroupsActions from '../../store/actions/restaurant-groups.actions';
import { EMPTY_GROUP_SELECTION, GridGroupSelection } from 'src/app/shared/data/model/dto.model';
import { MatDialog } from '@angular/material/dialog';
import { GroupPopupComponent } from '../../ui/group-popup/group-popup.component';
import { ToastService } from 'src/app/shared/util/toast.service';
import { ConformationDialogComponent } from 'src/app/shared/ui/conformation-dialog/conformation-dialog.component';

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

  private groupSelection: GridGroupSelection = EMPTY_GROUP_SELECTION;

  @HostBinding('style.flex-grow')
  flexGrow = '1';

  constructor(private store: Store<State>, private el: ElementRef, public dialog: MatDialog, private toast: ToastService) {
    this.groups$ = store.pipe(select(fromRestaurantGroups.selectRestaurantGroups));
    store.dispatch(restaurantGroupsActions.getAllRestaurantGroups());
  }

  ngOnInit(): void {
    // this.groups$.subscribe(grps => console.log('Groups: ', grps))
  }

  saveGroup() {
    if (this.groupSelection.selectedIds.length === 0 && !this.groupSelection.selectAll) {
      this.toast.warning('No Items selected!')
      return;
    }
    const dialogRef = this.dialog.open(GroupPopupComponent, {
      width: '400px'
    })

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.store.dispatch(restaurantGroupsActions.saveRestaurantGroup({
          params: {
            group_id: this.groupSelection.groupId ?? undefined,
            ids: this.groupSelection.selectedIds,
            is_all: this.groupSelection.selectAll,
            all_except: this.groupSelection.selectAllExceptIds,
            filters: this.groupSelection.filters,
            name: res.groupName
          }
        }))
      }
    })
  }

  onSelectionApplied($event: GridGroupSelection) {
    this.groupSelection = $event;
  }

  resetSelection() {
    this.groupSelection = EMPTY_GROUP_SELECTION;
  }

  editGroup(groupId: string) {

  }

  deleteGroup(groupId: string) {
    const diaogRef = this.dialog.open(ConformationDialogComponent, {
      data: {
        title: 'Delete This Group',
        message: 'Are you sure you want to delete this group?'
      }
    });

    diaogRef.afterClosed().subscribe(response => {
      if (response) {
        this.store.dispatch(restaurantGroupsActions.deleteRestaurantGroup({groupId: groupId}));
      }
    });
  }

}
