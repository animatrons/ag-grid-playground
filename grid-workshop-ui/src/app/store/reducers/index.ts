import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromRestaurants from '../../many-grids/feature/restauration-grids/store/reducers/restaurants.reducer';

export interface ILoadState<T=any> {
  loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  error?: any | null;
  updatedAt?: number
  content: T[]
}

export interface IGridWithPaginationState<T=any> extends ILoadState<T> {
  page: number,
  size: number,
  total: number,
}

export interface State {

  [fromRestaurants.restaurantsFeatureKey]: fromRestaurants.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromRestaurants.restaurantsFeatureKey]: fromRestaurants.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
