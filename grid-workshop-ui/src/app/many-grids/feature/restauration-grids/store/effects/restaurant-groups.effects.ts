import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as RestaurantGroupsActions from '../actions/restaurant-groups.actions';
import { RestaurantsService } from '../../data/services/restaurants.service';
import { ToastService } from 'src/app/shared/util/toast.service';


@Injectable()
export class RestaurantGroupsEffects {
    // Loading all groups (names, ids)
    getRestaurantGroups$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.getAllRestaurantGroups),
        tap(() => this.toast.loading('Loading groups...')),
        map(props => RestaurantGroupsActions.loadAllRestaurantGroups())
      );
    });

    loadRestaurantGroups$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.loadAllRestaurantGroups),
        concatMap(() =>
          this.service.getAllGroups().pipe(
            tap(() => console.log('[[RESTO GROUPS EFFECT]] LOADINg groups')),
            map(data => RestaurantGroupsActions.loadAllRestaurantGroupsSuccess({ groups: data })),
            catchError(error => of(RestaurantGroupsActions.loadAllRestaurantGroupsFailure({ error }))))
          ),
      );
    });

    loadRestaurantGroupSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.loadAllRestaurantGroupsSuccess),
        tap((data) => {
          this.toast.loadingComplete();
          this.toast.success('Groups Loaded')
          console.warn('[[RESTO GROUPS EFFECT]] Ok Loaded groups', data)
        }));
    },
    { dispatch: false });

    loadRestaurantGroupFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.loadAllRestaurantGroupsFailure),
        tap((data) => {
          this.toast.loadingComplete();
          this.toast.error('Groups Not Loaded Loaded, See Logs')
          console.error('[[RESTO GROUPS EFFECT]] ERROR lodaing groups', data)
        }));
    },
    { dispatch: false });

    // Group pagination
    getRestaurantsGroupPage$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(RestaurantGroupsActions.getRestaurantsGroupViewPage),
          map((params) => RestaurantGroupsActions.loadRestaurantsGroupViewPage({...params})));
    });

    loadRestaurantGroupPage$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.loadRestaurantsGroupViewPage),
        concatMap(({group_id, page, size, filters, sorts, group_name}) =>
          this.service.getGroupPage(group_id, page, size, sorts, filters).pipe(
            map(data => RestaurantGroupsActions.loadRestaurantsGroupViewPageSuccess({pageData: data, group_id, group_name})),
            catchError(error => of(RestaurantGroupsActions.loadRestaurantsGroupViewPageFailure({ error, group_id, group_name }))))
          ),
      );
    });

    loadRestaurantGroupPageFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.loadRestaurantsGroupViewPageFailure),
        tap(() => {
          console.warn('[[RESTO GROUPS EFFECT]] Error: Restaurant Group Page Not Loaded');
          this.toast.error('Error: Restaurant Group Page Not Loaded');
        }));
    },
    { dispatch: false });

    loadRestaurantGroupPageSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.loadRestaurantsGroupViewPageSuccess),
        tap(() => console.warn('[[RESTO GROUPS EFFECT]] Restaurant Group Page Loaded')));
    },
    { dispatch: false });

    saveGroup$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.saveRestaurantGroup),
        tap(() => this.toast.loading('Saving...')),
        concatMap((data) =>
          this.service.saveGroup(data.params).pipe(
              map(data => RestaurantGroupsActions.saveRestaurantGroupSuccess({ data })),
              catchError(error => of(RestaurantGroupsActions.saveRestaurantGroupFailure({ error }))))
          ),
      );
    });

    saveGroupSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.saveRestaurantGroupSuccess),
        map((msg) => {
          this.toast.loadingComplete();
          console.log('[[RESTO GROUPS EFFECT]] Ok Saved groups', msg);
          this.toast.success('Group Saved')
          return RestaurantGroupsActions.getAllRestaurantGroups();
        }));
    });

    saveGroupFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.saveRestaurantGroupFailure),
        tap((msg) => {
          this.toast.loadingComplete();
          this.toast.error('Error: Group Page Not Saved, See Logs');
          console.error('[[RESTO GROUPS EFFECT]] ERROR Saveing groups', msg)
        }));
    },
    { dispatch: false });

    deleteGroup$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.deleteRestaurantGroup),
        tap(() => this.toast.loading('Deleting...')),
        concatMap((data) =>
          this.service.delete(data.groupId).pipe(
              map(data => RestaurantGroupsActions.deleteRestaurantGroupSuccess({ data })),
              catchError(error => of(RestaurantGroupsActions.deleteRestaurantGroupFailure({ error }))))
          ),
      );
    });

    deleteGroupSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.deleteRestaurantGroupSuccess),
        tap(() => {
          this.toast.loadingComplete();
          console.log('[[RESTO GROUPS EFFECT]] Ok Deleted group');
          this.toast.success('Group Deleted')
          return RestaurantGroupsActions.getAllRestaurantGroups();
        }));
    });

    deleteGroupFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.deleteRestaurantGroupFailure),
        tap(() => {
          this.toast.loadingComplete();
          this.toast.error('Error: Group Not Deleted, See Logs');
          console.error('[[RESTO GROUPS EFFECT]] ERROR Deleting groups')
        }));
    },
    { dispatch: false });

    constructor(private actions$: Actions, private service: RestaurantsService, private toast: ToastService) {}
}
