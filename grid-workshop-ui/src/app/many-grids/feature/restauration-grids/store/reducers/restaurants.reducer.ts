import { Action, createReducer, on } from '@ngrx/store';
import { IGridWithPaginationState, ILoadState } from 'src/app/store/reducers';
import { Restaurant, RestaurantGroup } from '../../data/models/restaurant.model';
import * as RestaurantsActions from '../actions/restaurants.actions';
import * as RestaurantGroupsActions from '../actions/restaurant-groups.actions';

export const restaurantsFeatureKey = 'restaurants';

interface GroupViews {
  [groupId: string]: {
    groupName: string,
    groupViewGrid: IGridWithPaginationState<Restaurant>,
  }
}

export interface State {
  viewGrid: IGridWithPaginationState<Restaurant>,
  groups: ILoadState<RestaurantGroup>,
  groupsViews: GroupViews,
}

export const initialState: State = {
  viewGrid: {
    page: 0,
    size: 0,
    total: 0,
    content: [],
    loadStatus: 'NOT_LOADED',
    error: null
  },
  groups: {
    content: [],
    loadStatus: 'NOT_LOADED',
    error: null
  },
  groupsViews: {}
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

  on(RestaurantGroupsActions.loadAllRestaurantGroups, (state) => ({
    ...state,
    groups: {
      ...state.groups,
      loadStatus: 'LOADING',
    }
  })),
  on(RestaurantGroupsActions.loadAllRestaurantGroupsSuccess, (state, action) => ({
    ...state,
    groups: {
      ...state.groups,
      loadStatus: 'LOADED',
      content: action.groups
    }
  })),
  on(RestaurantGroupsActions.loadAllRestaurantGroupsFailure, (state, action) => ({
    ...state,
    groups: {
      ...state.groups,
      loadStatus: 'NOT_LOADED',
      content: [],
      error: action.error
    }
  })),

  on(RestaurantGroupsActions.getRestaurantsGroupViewPage, (state) => ({
    ...state
  })),
  on(RestaurantGroupsActions.loadRestaurantsGroupViewPage, (state, action) => ({
    ...state,
    groupsViews: {
      ...state.groupsViews,
      [action.group_id]: {
        groupName: action.group_name,
        groupViewGrid: {
          ...state.groupsViews[action.group_id]?.groupViewGrid,
          loadStatus: 'LOADING'
        }
      }
    }
  })),
  on(RestaurantGroupsActions.loadRestaurantsGroupViewPageSuccess, (state, action) => ({
    ...state,
    groupsViews: {
      ...state.groupsViews,
      [action.group_id]: {
        groupName: action.group_name,
        groupViewGrid: {
          ...state.groupsViews[action.group_id]?.groupViewGrid,
          loadStatus: 'LOADED',
          page: action.pageData.page,
          size: action.pageData.size,
          total: action.pageData.total,
          content: action.pageData.content
        }
      }
    },
  })),
  on(RestaurantGroupsActions.loadRestaurantsGroupViewPageFailure, (state, action) => ({
    ...state,
    groupsViews: {
      ...state.groupsViews,
      [action.group_id]: {
        groupName: action.group_name,
        groupViewGrid: {
          ...state.groupsViews[action.group_id]?.groupViewGrid,
          loadStatus: 'NOT_LOADED',
          error: action.error,
          content: [],
          total: 0
        }
      }
    },
  })),

);
