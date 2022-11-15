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
