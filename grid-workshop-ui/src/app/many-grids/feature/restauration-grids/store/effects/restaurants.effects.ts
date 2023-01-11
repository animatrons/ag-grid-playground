import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as RestaurantsActions from '../actions/restaurants.actions';
import { RestaurantsService } from '../../data/services/restaurants.service';


@Injectable()
export class RestaurantsEffects {

  getRestaurantsViewPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RestaurantsActions.getRestaurantsViewPage),
      map(props => RestaurantsActions.loadRestaurantsViewPage({...props}))
    );
  });

  loadRestaurantsViewPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RestaurantsActions.loadRestaurantsViewPage),
      concatMap(props => {
        const load$ = this.service.getPage(props.page, props.size, props.sorts, props.filter);
        return load$.pipe(
          map(res => RestaurantsActions.loadRestaurantsViewPageSuccess({pageData: res})),
          catchError(err => of(RestaurantsActions.loadRestaurantsViewPageFailure({error: err})))
        )
      })
    );
  });

  loadRestaurantsViewPageSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RestaurantsActions.loadRestaurantsViewPageSuccess),
      tap(res => console.warn('Restraurats lodaoda', res))
    );
  },
  { dispatch: false });

  loadRestaurantsViewPageFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RestaurantsActions.loadRestaurantsViewPageFailure),
      tap(err => console.error('ERROR lodading restaurants', err))
    );
  },
  { dispatch: false });

  constructor(private actions$: Actions, private service: RestaurantsService) {}
}
