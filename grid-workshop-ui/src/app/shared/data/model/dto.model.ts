export interface Pagination<T> {
  page: number,
  size: number,
  total: number,
  content: T[]
}

export interface FilterParams {
  filter_field: string,
  operator?: string,
  filter_value: string
}

export interface SortParams {
  sort_field: string,
  sort_order: 1 | -1
}

export interface GridGroupSelection {
  groupId: string | null;
  selectedIds: string[];
  selectAll: boolean;
  selectAllExceptIds: string[];
  filters: FilterParams[];
}

export const EMPTY_GROUP_SELECTION: GridGroupSelection = {
  "groupId": null,
  "selectedIds": [],
  "selectAll": false,
  "selectAllExceptIds": [],
  "filters": []
}
