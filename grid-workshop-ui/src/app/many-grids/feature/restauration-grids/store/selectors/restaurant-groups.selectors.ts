import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRestaurants from '../reducers/restaurants.reducer';

export const selectRestaurantsState = createFeatureSelector<fromRestaurants.State>(
  fromRestaurants.restaurantsFeatureKey
);

export const selectRestaurantGroupsState = createSelector(
    selectRestaurantsState,
    (state: fromRestaurants.State) => state.groups
);

export const selectRestaurantGroups = createSelector(
    selectRestaurantGroupsState,
    (state) => state.content
);

export const selectReastaurantGroupsLoacingStatusProperty = createSelector(
    selectRestaurantGroupsState,
    (state) => state.loadStatus
);
