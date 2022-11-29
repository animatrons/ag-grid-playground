import { FilterParams } from "../data/model/dto.model"

export const formatColumnFilter = (agFilter: any) => {
  let filters: FilterParams[] = Object.keys(agFilter).map(field => ({
    filter_field: field,
    operator: agFilter[field].type,
    filter_value: agFilter[field].filter
  }))
  return filters
}
