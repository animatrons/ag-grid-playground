import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromRestaurants from '../../many-grids/feature/restauration-grids/store/reducers/restaurants.reducer';

export interface ILoadState {
  loadStatus: 'NOT_LOADED' | 'LOADING' | 'LOADED';
  error?: any | null;
  updatedAt: number
}

export interface IGridWithPaginationState<T> extends ILoadState {
  page: number,
  size: number,
  total: number,
  content: T[]
}

export interface State {

  [fromRestaurants.restaurantsFeatureKey]: fromRestaurants.State;
}

export const reducers: ActionReducerMap<State> = {

  [fromRestaurants.restaurantsFeatureKey]: fromRestaurants.reducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
