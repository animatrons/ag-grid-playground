import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRestaurants from '../reducers/restaurants.reducer';

export const selectRestaurantsState = createFeatureSelector<fromRestaurants.State>(
  fromRestaurants.restaurantsFeatureKey
);

export const selectRestaurantsView = createSelector(
  selectRestaurantsState,
  (state) => state.viewGrid
);

export const selectCurrentViewPage = createSelector(
  selectRestaurantsView,
  (state) => state.page
);

export const selectCurrentViewStatus = createSelector(
  selectRestaurantsView,
  (state) => state.loadStatus
);
