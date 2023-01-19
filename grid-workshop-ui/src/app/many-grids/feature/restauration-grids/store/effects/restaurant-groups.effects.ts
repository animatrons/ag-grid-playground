import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as RestaurantGroupsActions from '../actions/restaurant-groups.actions';
import { RestaurantsService } from '../../data/services/restaurants.service';


@Injectable()
export class RestaurantsEffects {
    // Loading all groups (names, ids)
    getRestaurantGroups$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.getAllRestaurantGroups),
        map(props => RestaurantGroupsActions.loadAllRestaurantGroups())
      );
    });

    loadRestaurantGroups$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.loadAllRestaurantGroups),
        concatMap(() =>
          this.service.getAllGroups().pipe(
            map(data => RestaurantGroupsActions.loadAllRestaurantGroupsSuccess({ groups: data })),
            catchError(error => of(RestaurantGroupsActions.loadAllRestaurantGroupsFailure({ error }))))
          ),
      );
    });

    loadRestaurantGroupSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.loadAllRestaurantGroupsSuccess),
        tap((data) => console.warn('Ok Loaded groups', data)));
    });

    loadRestaurantGroupFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.loadAllRestaurantGroupsFailure),
        tap((data) => console.error('ERROR lodaing groups', data)));
    });

    // Group pagination
    getRestaurantsGroupPage$ = createEffect(() => {
      return this.actions$.pipe(
          ofType(RestaurantGroupsActions.getRestaurantsGroupViewPage),
          map((params) => RestaurantGroupsActions.loadRestaurantsGroupViewPage({...params})));
    });

    loadRestaurantGroupPage$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.loadRestaurantsGroupViewPage),
        concatMap(({group_id, page, size, filters, sorts}) =>
          this.service.getGroupPage(group_id, page, size, sorts, filters).pipe(
            map(data => RestaurantGroupsActions.loadRestaurantsGroupViewPageSuccess({pageData: data})),
            catchError(error => of(RestaurantGroupsActions.loadRestaurantsGroupViewPageFailure({ error }))))
          ),
      );
    });

    loadRestaurantGroupPageFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.loadRestaurantsGroupViewPageFailure),
        tap(() => console.warn('[[RESTO GROUPS EFFECT]] Restaurant Group Loaded')));
    });

    loadRestaurantGroupPageSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.loadRestaurantsGroupViewPageSuccess),
        tap(() => console.warn('[[RESTO GROUPS EFFECT]] Error: Restaurant Group Page Not Loaded')));
    });

    saveGroup$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.saveRestaurantGroup),
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
        tap((msg) => console.warn('Ok Saved groups', msg)));
    });

    saveGroupFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.saveRestaurantGroupFailure),
        tap((msg) => console.error('ERROR Saveing groups', msg)));
    });

    deleteGroup$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.deleteRestaurantGroup),
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
        tap(() => console.log()));
    });

    deleteGroupFailure$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RestaurantGroupsActions.deleteRestaurantGroupFailure),
        tap(() => console.log()));
    });

    constructor(private actions$: Actions, private service: RestaurantsService) {}
}
