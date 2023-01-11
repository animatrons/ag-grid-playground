import { createAction, props } from '@ngrx/store';
import { FilterParams, Pagination, SortParams } from 'src/app/shared/data/model/dto.model';
import { Restaurant, RestaurantGroup, RestaurantGroupDto } from '../../data/models/restaurant.model';

// Restaurants Groups
export const getAllRestaurantGroups = createAction(
  '[Restaurants] Begin Load Restaurants Groups'
);
export const loadAllRestaurantGroups = createAction(
  '[Restaurants] Load Restaurants Groups'
);
export const loadAllRestaurantGroupsSuccess = createAction(
  '[Restaurants] Load Restaurants Groups Success',
  props<{groups: RestaurantGroup[]}>()
);
export const loadAllRestaurantGroupsFailure = createAction(
  '[Restaurants] Load Restaurants Groups Failure',
  props<{error: any}>()
);

// Pagination
export const getRestaurantsGroupViewPage = createAction(
  '[Restaurants] Begin Load Restaurants Group View Grid Page',
  props<{group_id: string, page: number, size: number, sorts?: SortParams[], filters?: FilterParams[]}>()
);
export const loadRestaurantsGroupViewPage = createAction(
  '[Restaurants] Load Restaurants Group View Grid Page',
  props<{group_id: string, page: number, size: number, sorts?: SortParams[], filters?: FilterParams[]}>()
);
export const loadRestaurantsGroupViewPageSuccess = createAction(
  '[Restaurants] Load Restaurants Group View Grid Page Success',
  props<{pageData: Pagination<Restaurant>}>()
);
export const loadRestaurantsGroupViewPageFailure = createAction(
  '[Restaurants] Load Restaurants Group View Grid Page Failure',
  props<{error: any}>()
);

// Manage Restaurants Groups
// Save
export const saveRestaurantGroup = createAction(
  '[Restaurants] Save Restaurants Group',
  props<{params: RestaurantGroupDto}>()
);
export const saveRestaurantGroupSuccess = createAction(
  '[Restaurants] Save Restaurants Group Success',
  props<any>()
);
export const saveRestaurantGroupFailure = createAction(
  '[Restaurants] Save Restaurants Group Failure',
  props<any>()
);

// Delete
export const deleteRestaurantGroup = createAction(
  '[Restaurants] delete Restaurants Group',
  props<{groupId: string}>()
);
export const deleteRestaurantGroupSuccess = createAction(
  '[Restaurants] delete Restaurants Group Success',
  props<any>()
);
export const deleteRestaurantGroupFailure = createAction(
  '[Restaurants] Save Restaurants Group Failure',
  props<any>()
);
