import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as RestaurantGroupsActions from '../actions/restaurant-groups.actions';
import { RestaurantsService } from '../../data/services/restaurants.service';


@Injectable()
export class RestaurantsEffects {

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
