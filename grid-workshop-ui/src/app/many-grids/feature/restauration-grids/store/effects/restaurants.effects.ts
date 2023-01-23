import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as RestaurantsActions from '../actions/restaurants.actions';
import { RestaurantsService } from '../../data/services/restaurants.service';
import { ToastService } from 'src/app/shared/util/toast.service';


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

  saveRestaurant$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(RestaurantsActions.saveRestaurant),
        tap(() => this.toast.loading('Saving...')),
        concatMap((action) =>
          this.service.saveResto(action.restaurant).pipe(
            map(data => RestaurantsActions.saveRestaurantSuccess()),
            catchError(error => of(RestaurantsActions.saveRestaurantFailure({ error }))))
          ),
    );
  });

  saveRestaurantSuccess$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(RestaurantsActions.saveRestaurantSuccess),
        map(() => {
          console.warn('Resto saved');
          this.toast.loadingComplete();
          this.toast.success('Resto saved');
          return RestaurantsActions.loadRestaurantsViewPage({page: 1, size: 20});
        }));
  });

  saveRestaurantFailure$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(RestaurantsActions.saveRestaurantFailure),
        tap((action) => {
          console.error('Resto Not saved', action.error);
          this.toast.loadingComplete();
          this.toast.error('Resto saved')
        }));
  },
  { dispatch: false });

  deleteRestaurant$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(RestaurantsActions.deleteRestaurant),
        tap(() => this.toast.loading('Saving...')),
        concatMap((action) =>
          this.service.deleteResto(action.id).pipe(
            map(data => RestaurantsActions.deleteRestaurantSuccess()),
            catchError(error => of(RestaurantsActions.deleteRestaurantFailure({ error }))))
          ),
    );
  });

  deleteRestaurantSuccess$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(RestaurantsActions.deleteRestaurantSuccess),
        map(() => {
          console.warn('Resto deleted');
          this.toast.loadingComplete();
          this.toast.success('Resto deleted')
          return RestaurantsActions.loadRestaurantsViewPage({page: 1, size: 20});
        }));
  });

  deleteRestaurantFailure$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(RestaurantsActions.deleteRestaurantFailure),
        tap((action) => {
          console.error('Resto Not deleted', action.error);
          this.toast.loadingComplete();
          this.toast.error('Resto deleted')
        }));
  },
  { dispatch: false });

  constructor(private actions$: Actions, private service: RestaurantsService, private toast: ToastService) {}
}
