import { FilterParams } from "src/app/shared/data/model/dto.model";

export interface Restaurant {
  _id: string,
  URL: string,
  address: string,
  address_line_2: string,
  name: string,
  outcode: string,
  postcode: string,
  rating?: number,
  type_of_food: string,
}

export interface RestaurantGroup {
  _id: string,
  name: string,
  // restaurants: Restaurant[]
}

export interface RestaurantGroupDto {
  group_id?: string,
  name: string,
  ids: string[],
  is_all: boolean,
  all_except: string[],
  filters: FilterParams[]
}
