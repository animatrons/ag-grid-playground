import { createAction, props } from '@ngrx/store';
import { FilterParams, Pagination, SortParams } from 'src/app/shared/data/model/dto.model';
import { Restaurant } from '../../data/models/restaurant.model';

export const getRestaurants = createAction(
  '[Restaurants] Begin Load Restaurants'
);

export const loadRestaurants = createAction(
  '[Restaurants] Load Restaurants'
);

export const loadRestaurantsSuccess = createAction(
  '[Restaurants] Load Restaurants Success',
  props<{ data: any }>()
);

export const loadRestaurantsFailure = createAction(
  '[Restaurants] Load Restaurants Failure',
  props<{ error: any }>()
);

// Pagination
export const getRestaurantsViewPage = createAction(
  '[Restaurants] Begin Load Restaurants View Grid Page',
  props<{page: number, size: number, sorts?: SortParams[], filter?: FilterParams[]}>()
);
export const loadRestaurantsViewPage = createAction(
  '[Restaurants] Load Restaurants View Grid Page',
  props<{page: number, size: number, sorts?: SortParams[], filter?: FilterParams[]}>()
);
export const loadRestaurantsViewPageSuccess = createAction(
  '[Restaurants] Load Restaurants View Grid Page Success',
  props<{pageData: Pagination<Restaurant>}>()
);
export const loadRestaurantsViewPageFailure = createAction(
  '[Restaurants] Load Restaurants View Grid Page Failure',
  props<{error: any}>()
);

// Save
export const saveRestaurant = createAction(
  '[Restaurants] Save Restaurants',
  props<{restaurant: Restaurant}>()
);
export const saveRestaurantSuccess = createAction(
  '[Restaurants] Save Restaurants Success'
);
export const saveRestaurantFailure = createAction(
  '[Restaurants] Save Restaurants Failure',
  props<{error: any}>()
);
// Save
export const deleteRestaurant = createAction(
  '[Restaurants] Delete Restaurants',
  props<{id: string}>()
);
export const deleteRestaurantSuccess = createAction(
  '[Restaurants] Delete Restaurants Success'
);
export const deleteRestaurantFailure = createAction(
  '[Restaurants] Delete Restaurants Failure',
  props<{error: any}>()
);
