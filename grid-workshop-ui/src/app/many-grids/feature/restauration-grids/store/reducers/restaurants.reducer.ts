import { Action, createReducer, on } from '@ngrx/store';
import { IGridWithPaginationState } from 'src/app/store/reducers';
import { Restaurant } from '../../data/models/restaurant.model';
import * as RestaurantsActions from '../actions/restaurants.actions';

export const restaurantsFeatureKey = 'restaurants';


export interface State {
  viewGrid: IGridWithPaginationState<Restaurant>
}

export const initialState: State = {
  viewGrid: {
    page: 0,
    size: 0,
    total: 0,
    content: [],
    loadStatus: 'NOT_LOADED',
    updatedAt: Date.now(),
    error: null
  }
};

export const reducer = createReducer(
  initialState,
  on(RestaurantsActions.getRestaurants, state => initialState),
  on(RestaurantsActions.loadRestaurants, state => state),
  on(RestaurantsActions.loadRestaurantsSuccess, (state, action) => state),
  on(RestaurantsActions.loadRestaurantsFailure, (state, action) => state),

  on(RestaurantsActions.getRestaurantsViewPage, state => ({
    ...state,
    viewGrid: state.viewGrid
  })),
  on(RestaurantsActions.loadRestaurantsViewPage, state => ({
    ...state,
    viewGrid: {
      ...state.viewGrid,
      loadStatus: 'LOADING'
    }
  })),
  on(RestaurantsActions.loadRestaurantsViewPageSuccess, (state, action) => ({
    ...state,
    viewGrid: {
      ...state.viewGrid,
      loadStatus: 'LOADED',
      page: action.pageData.page,
      size: action.pageData.size,
      total: action.pageData.total,
      content: action.pageData.content
    }
  })),
  on(RestaurantsActions.loadRestaurantsViewPageFailure, (state, action) => ({
    ...state,
    viewGrid: {
      ...state.viewGrid,
      loadStatus: 'NOT_LOADED',
      error: action.error,
      content: [],
      total: 0
    }
  })),
);
